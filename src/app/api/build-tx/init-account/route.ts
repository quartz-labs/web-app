export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection, Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { QuartzClient, DummyWallet } from '@quartz-labs/sdk';
import { getConfig as getMarginfiConfig, MarginfiClient } from '@mrgnlabs/marginfi-client-v2';
import { buildTransaction } from '@/src/utils/helpers';

const envSchema = z.object({
    RPC_URL: z.string().url(),
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
    )
});

export async function GET(request: Request) {
    let env;
    try {
        env = envSchema.parse({
            RPC_URL: process.env.RPC_URL,
        });
    } catch (error) {
        console.error("Error validating environment variables: ", error);
        return new Response("Internal server configuration error", { status: 500 });
    }

    const bodyJson = await request.json();
    let body: z.infer<typeof paramsSchema>;
    try {
        body = paramsSchema.parse(bodyJson);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const connection = new Connection(env.RPC_URL);
    const address = new PublicKey(body.address);

    try {
        const { instructions, marginfiSigner } = await makeInitAccountIxs(connection, address);
        const transaction = await buildTransaction(connection, instructions, address);
        if (marginfiSigner) transaction.sign([marginfiSigner]);

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

async function makeInitAccountIxs(
    connection: Connection,
    address: PublicKey
): Promise<{
    instructions: TransactionInstruction[], 
    marginfiSigner: Keypair | null
}> {
    const wallet = new DummyWallet(Keypair.generate());
    const [quartzClient, marginfiClient] = await Promise.all([
        QuartzClient.fetchClient(connection),
        MarginfiClient.fetch(getMarginfiConfig(), wallet, connection)
    ]);

    const [ixs_initAccount, marginfiAccounts] = await Promise.all([
        quartzClient.makeInitQuartzUserIxs(address),
        marginfiClient.getMarginfiAccountsForAuthority(address)
    ]);

    const newMarginfiKeypair = Keypair.generate();
    const oix_initMarginfiAccount: TransactionInstruction[] = [];
    if (marginfiAccounts.length === 0) {
        const ix_createMarginfiAccount = await marginfiClient.makeCreateMarginfiAccountIx(newMarginfiKeypair.publicKey);
        oix_initMarginfiAccount.push(...ix_createMarginfiAccount.instructions);
    } else if (marginfiAccounts[0]?.isDisabled) {
        throw new Error("Flash loan MarginFi account is bankrupt"); // TODO: Handle disabled MarginFi accounts
    }
    
    return {
        instructions: [...ixs_initAccount, ...oix_initMarginfiAccount],
        marginfiSigner: oix_initMarginfiAccount.length > 0 ? newMarginfiKeypair : null
    };
}