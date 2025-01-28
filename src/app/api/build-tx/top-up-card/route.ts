export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection, PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction} from '@solana/web3.js';
import { MarketIndex, QUARTZ_ADDRESS_TABLE, QuartzClient, QuartzUser, TOKENS, baseUnitToDecimal, getTokenProgram, makeCreateAtaIxIfNeeded } from '@quartz-labs/sdk';
import { AllbridgeCoreSdk, ChainSymbol, Messenger, nodeRpcUrlsDefault, type RawBridgeSolanaTransaction } from "@allbridge/bridge-core-sdk";
import { createCloseAccountInstruction } from '@solana/spl-token';
import { getWsolMint } from '@/src/utils/helpers';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { buildTransaction } from '@/src/utils/helpers';


const envSchema = z.object({
    RPC_URL: z.string().url(),
    BASE_RPC_URL: z.string().url(),
    CARD_CONTRACT_ADDRESS: z.string()
});

const paramsSchema = z.object({
    address: z.string().refine(
        (value) => {
            try {
                new PublicKey(value);
                return true;
            } catch {
                return false;
            }
        },
        { message: "Address is not a valid public key" }
    ),
    amountBaseUnits: z.number().refine(
        Number.isInteger,
        { message: "amountBaseUnits must be an integer" }
    ),
    marketIndex: z.number().refine(
        (value) => MarketIndex.includes(value as any),
        { message: "marketIndex must be a valid market index" }
    ),
});

export async function GET(request: Request) {
    let env;
    try {
        env = envSchema.parse({
            RPC_URL: process.env.RPC_URL,
            BASE_RPC_URL: process.env.BASE_RPC_URL,
            CARD_CONTRACT_ADDRESS: process.env.CARD_CONTRACT_ADDRESS
        });
    } catch (error) {
        console.error("Error validating environment variables: ", error);
        return new Response("Internal server configuration error", { status: 500 });
    }

    // Connections to blockchains will be made through your rpc-urls passed during initialization
    const sdk = new AllbridgeCoreSdk({
        ...nodeRpcUrlsDefault,
        SOL: env.RPC_URL,
        ETH: env.BASE_RPC_URL
    });
    //const sdk = new AllbridgeCoreSdk(nodeRpcUrlsDefault);


    const { searchParams } = new URL(request.url);
    const params = {
        address: searchParams.get('address'),
        amountBaseUnits: Number(searchParams.get('amountBaseUnits')),
        marketIndex: Number(searchParams.get('marketIndex')),
    };

    let body: z.infer<typeof paramsSchema>;
    try {
        body = paramsSchema.parse(params);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const address = new PublicKey(body.address);
    const amountBaseUnits = body.amountBaseUnits;
    const marketIndex = body.marketIndex as MarketIndex;

    const chains = await sdk.chainDetailsMap();

    const sourceChain = chains[ChainSymbol.SOL];
    const sourceToken = sourceChain?.tokens.find((tokenInfo) => tokenInfo.symbol === "USDC");
    if (!sourceToken) {
        return NextResponse.json({ error: "Unable to get source token from Allbridge SDK" }, { status: 500 });
    }

    const destinationChain = chains[ChainSymbol.BAS];
    const destinationToken = destinationChain?.tokens.find((tokenInfo) => tokenInfo.symbol === "USDC");
    if (!destinationToken) {
        return NextResponse.json({ error: "Unable to get destination token from Allbridge SDK" }, { status: 500 });
    }

    let bridgeTx: VersionedTransaction;
    try {
        bridgeTx = (await sdk.bridge.rawTxBuilder.send({
            amount: `${baseUnitToDecimal(amountBaseUnits, marketIndex).toFixed(2)}`,
            fromAccountAddress: address.toBase58(),
            toAccountAddress: env.CARD_CONTRACT_ADDRESS,
            sourceToken: sourceToken,
            destinationToken: destinationToken,
            messenger: Messenger.ALLBRIDGE,
            txFeeParams: {
                solana: {
                    pricePerUnitInMicroLamports: "1000000"
                },
            },
        })) as RawBridgeSolanaTransaction;
    } catch {
        return NextResponse.json({ error: "Unable to build bridge transaction" }, { status: 500 });
    }

    const connection = new Connection(env.RPC_URL);
    const bridgeLookupTable = await connection.getAddressLookupTable(new PublicKey("2JcBAEVnAwVo4u8d61iqgHPrzZuugur7cVTjWubsVLHj")).then(res => res.value);
    if (!bridgeLookupTable) {
        return NextResponse.json({ error: "Unable to get bridge lookup table" }, { status: 500 });
    }
    const decompiledIxs = TransactionMessage.decompile(bridgeTx.message, {
        addressLookupTableAccounts: [bridgeLookupTable]
    }).instructions;
    const bridgeIx = decompiledIxs[1];
    if (!bridgeIx || bridgeIx.programId.toBase58() !== "BrdgN2RPzEMWF96ZbnnJaUtQDQx7VRXYaHHbYCBvceWB") {
        return NextResponse.json({ error: "Unable to buils bridge transaction" }, { status: 500 });
    }

    const quartzLookupTable = await connection.getAddressLookupTable(QUARTZ_ADDRESS_TABLE).then(res => res.value);
    if (!quartzLookupTable) {
        return NextResponse.json({ error: "Unable to get quartz lookup table" }, { status: 500 });
    }
    const quartzClient = await QuartzClient.fetchClient(connection);
    const user = await quartzClient.getQuartzAccount(address);
    const withdrawIxs = await makeWithdrawIxs(connection, address, amountBaseUnits, marketIndex, user, true);
    const transaction = await buildTransaction(
        connection, 
        [...withdrawIxs, bridgeIx], 
        address,
        [bridgeLookupTable, quartzLookupTable]
    );

    try {
        const serializedTx = Buffer.from(transaction.serialize()).toString("base64");

        return NextResponse.json({ transaction: serializedTx });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error: ${error}` },
            { status: 500 }
        );
    }
}

async function makeWithdrawIxs(
    connection: Connection,
    address: PublicKey,
    amountBaseUnits: number,
    marketIndex: MarketIndex,
    user: QuartzUser,
    allowLoan: boolean
): Promise<TransactionInstruction[]> {
    const mint = TOKENS[marketIndex].mint;
    const mintTokenProgram = await getTokenProgram(connection, mint);
    const walletAta = await getAssociatedTokenAddress(mint, address, false, mintTokenProgram);
    const oix_createAta = await makeCreateAtaIxIfNeeded(connection, walletAta, address, mint, mintTokenProgram);

    const oix_closeWsol: TransactionInstruction[] = [];
    if (mint === getWsolMint()) {
        oix_closeWsol.push(createCloseAccountInstruction(walletAta, address, address));
    }

    const reduceOnly = !allowLoan;
    const ix_withdraw = await user.makeWithdrawIx(amountBaseUnits, marketIndex, reduceOnly);
    return [...oix_createAta, ix_withdraw, ...oix_closeWsol];
}