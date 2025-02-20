export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection, PublicKey, SendTransactionError } from '@solana/web3.js';
import { bs58, makeCreateAtaIxIfNeeded, MARKET_INDEX_USDC, QuartzClient, QuartzUser, TOKENS } from '@quartz-labs/sdk';
import { buildTransaction } from '@/src/utils/helpers';
import type { TransactionInstruction } from '@solana/web3.js';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Keypair } from '@solana/web3.js';


const envSchema = z.object({
    RPC_URL: z.string().url(),
    SPEND_CALLER: z.string()
        .transform((value: string) => {
            try {
                return Keypair.fromSecretKey(bs58.decode(value));
            } catch {
                throw new Error("Spend caller is not a valid public key");
            }
        }
    ),
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
            SPEND_CALLER: process.env.SPEND_CALLER
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

    const connection = new Connection(env.RPC_URL);
    const quartzClient = await QuartzClient.fetchClient(connection);
    const user = await quartzClient.getQuartzAccount(address);

    // const ixs_withdraw = await makeWithdrawIxs(connection, user, amountBaseUnits);

    // const {
    //     ixs: ixs_topUpCard,
    //     lookupTables: lookupTables,
    //     signers: signers
    // } = await user.makeTopUpCardIxs(amountBaseUnits);

    const {
        ixs: ixs_spend,
        lookupTables,
        signers
    } = await user.makeSpendIxs(amountBaseUnits, env.SPEND_CALLER);

    const transaction = await buildTransaction(
        connection, 
        ixs_spend, 
        address,
        lookupTables
    );

    // Debug logging for required signers
    const messageAccounts = transaction.message.staticAccountKeys;
    console.log("Required signers:", transaction.message.header.numRequiredSignatures);
    messageAccounts.slice(0, transaction.message.header.numRequiredSignatures).forEach((pubkey, index) => {
        console.log(`${index}: ${pubkey.toBase58()} (required)`);
    });

    console.log("\nActual signers being provided:");
    signers.forEach((signer, index) => {
        console.log(`${index}: ${signer.publicKey.toBase58()}`);
    });

    transaction.sign(signers);

    const simulation = await connection.simulateTransaction(transaction);
    console.log(simulation);

    try {
        const signature = await connection.sendTransaction(transaction);
        console.log(signature);
    } catch (error) {
        if (error instanceof SendTransactionError) {
            console.error(error.getLogs(connection));
        } else {
            console.error(error);
        }
    }

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
    user: QuartzUser,
    amountBaseUnits: number,
): Promise<TransactionInstruction[]> {
    const usdcMint = TOKENS[MARKET_INDEX_USDC].mint;
    const walletAta = await getAssociatedTokenAddress(usdcMint, user.pubkey);
    const oix_createAta = await makeCreateAtaIxIfNeeded(connection, walletAta, user.pubkey, usdcMint, TOKEN_PROGRAM_ID);

    const { ixs: ix_withdraw } = await user.makeWithdrawIx(amountBaseUnits, MARKET_INDEX_USDC, false);
    return [...oix_createAta, ...ix_withdraw];
}
