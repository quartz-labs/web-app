export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { AddressLookupTableAccount, Connection, PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction} from '@solana/web3.js';
import { MarketIndex, QUARTZ_ADDRESS_TABLE, QuartzClient, QuartzUser, TOKENS, baseUnitToDecimal, getTokenProgram, makeCreateAtaIxIfNeeded } from '@quartz-labs/sdk';
import { AllbridgeCoreSdk, ChainSymbol, Messenger, nodeRpcUrlsDefault, SolanaAutoTxFee, type RawBridgeSolanaTransaction } from "@allbridge/bridge-core-sdk";
import { createCloseAccountInstruction } from '@solana/spl-token';
import { getWsolMint } from '@/src/utils/helpers';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { buildTransaction } from '@/src/utils/helpers';


const envSchema = z.object({
    RPC_URL: z.string().url(),
    BASE_RPC_URL: z.string().url(),
    CARD_CONTRACT_ADDRESS: z.string().regex(
        /^0x[a-fA-F0-9]{40}$/,
        { message: "Invalid Ethereum address format" }
    )
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

    const { searchParams } = new URL(request.url);
    const params = {
        address: searchParams.get('address'),
        amountBaseUnits: Number(searchParams.get('amountBaseUnits')),
    };

    let body: z.infer<typeof paramsSchema>;
    try {
        body = paramsSchema.parse(params);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const address = new PublicKey(body.address);
    const amountBaseUnits = body.amountBaseUnits;
    const marketIndex = 0 as MarketIndex; // USDC only

    const connection = new Connection(env.RPC_URL);
    const quartzClient = await QuartzClient.fetchClient(connection);
    const user = await quartzClient.getQuartzAccount(address);

    const sdk = new AllbridgeCoreSdk({
        ...nodeRpcUrlsDefault,
        SOL: env.RPC_URL,
        ETH: env.BASE_RPC_URL
    });

    const {
        withdrawIxs,
        lookupTable: quartzLookupTable
    } = await makeWithdrawIxs(connection, address, amountBaseUnits, marketIndex, user, true);

    const {
        bridgeIxs,
        lookupTable: bridgeLookupTable
    } = await makeBridgeIxs(connection, address, amountBaseUnits, marketIndex, env.CARD_CONTRACT_ADDRESS, sdk);

    const transaction = await buildTransaction(
        connection, 
        [...withdrawIxs, ...bridgeIxs], 
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
): Promise<{
    withdrawIxs: TransactionInstruction[],
    lookupTable: AddressLookupTableAccount
}> {
    const quartzLookupTable = await connection.getAddressLookupTable(QUARTZ_ADDRESS_TABLE).then(res => res.value);
    if (!quartzLookupTable) {
        throw new Error("Unable to get quartz lookup table");
    }

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
    const instructions = [...oix_createAta, ix_withdraw, ...oix_closeWsol];

    return {
        withdrawIxs: instructions,
        lookupTable: quartzLookupTable
    };
}

async function makeBridgeIxs(
    connection: Connection,
    address: PublicKey,
    amountBaseUnits: number,
    marketIndex: MarketIndex,
    cardContractAddress: string,
    sdk: AllbridgeCoreSdk
): Promise<{
    bridgeIxs: TransactionInstruction[],
    lookupTable: AddressLookupTableAccount
}> {
    const ALLBRIDGE_ADDRESS_TABLE = new PublicKey("2JcBAEVnAwVo4u8d61iqgHPrzZuugur7cVTjWubsVLHj");
    const bridgeLookupTable = await connection.getAddressLookupTable(ALLBRIDGE_ADDRESS_TABLE).then(res => res.value);
    if (!bridgeLookupTable) {
        throw new Error("Unable to get bridge lookup table");
    }

    const chains = await sdk.chainDetailsMap();

    const sourceChain = chains[ChainSymbol.SOL];
    const sourceToken = sourceChain?.tokens.find((tokenInfo) => tokenInfo.symbol === "USDC");
    if (!sourceToken) {
        throw new Error("Unable to get source token from Allbridge SDK");
    }

    const destinationChain = chains[ChainSymbol.BAS];
    const destinationToken = destinationChain?.tokens.find((tokenInfo) => tokenInfo.symbol === "USDC");
    if (!destinationToken) {
        throw new Error("Unable to get destination token from Allbridge SDK");
    }

    
    const bridgeAmount = baseUnitToDecimal(amountBaseUnits, marketIndex).toFixed(2);
    console.log(bridgeAmount)

    let bridgeTx: VersionedTransaction;
    try {
        bridgeTx = (await sdk.bridge.rawTxBuilder.send({
            amount: bridgeAmount,
            fromAccountAddress: address.toBase58(),
            toAccountAddress: cardContractAddress,
            sourceToken: sourceToken,
            destinationToken: destinationToken,
            messenger: Messenger.ALLBRIDGE,
            txFeeParams: {
                solana: SolanaAutoTxFee,
            },
        })) as RawBridgeSolanaTransaction;
    } catch {
        throw new Error("Unable to build bridge transaction");
    }

    const ALLBRIDGE_PROGRAM_ID = "BrdgN2RPzEMWF96ZbnnJaUtQDQx7VRXYaHHbYCBvceWB";
    // const CCTP_PROGRAM_ID = "CctpV8uRiXws7KZxpUXfPWy9BhCiWaeBRzsJgELvQKvu";
    
    const decompiledIxs = TransactionMessage.decompile(bridgeTx.message, {
        addressLookupTableAccounts: [bridgeLookupTable]
    }).instructions;
    const bridgeIx = decompiledIxs[1];
    if (!bridgeIx || bridgeIx.programId.toBase58() !== ALLBRIDGE_PROGRAM_ID) {
        throw new Error("Unable to build bridge transaction");
    }

    return {
        bridgeIxs: [bridgeIx],
        lookupTable: bridgeLookupTable
    };
}