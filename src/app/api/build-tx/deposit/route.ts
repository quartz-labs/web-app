export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection, PublicKey } from '@solana/web3.js';
import { MarketIndex, QuartzClient, QuartzUser } from '@quartz-labs/sdk';
import { buildTransaction } from '@/src/utils/helpers';
import { makeDepositIxs } from '../../_utils/utils.server';
import { DUST_BUFFER_BASE_UNITS } from '@/src/config/constants';

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
    ),
    amountBaseUnits: z.number().refine(
        Number.isInteger,
        { message: "amountBaseUnits must be an integer" }
    ),
    repayingLoan: z.boolean(),
    marketIndex: z.number().refine(
        (value) => MarketIndex.includes(value as any),
        { message: "marketIndex must be a valid market index" }
    ),
    useMaxAmount: z.boolean().optional().default(false),
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

    const { searchParams } = new URL(request.url);
    const params = {
        address: searchParams.get('address'),
        amountBaseUnits: Number(searchParams.get('amountBaseUnits')),
        repayingLoan: searchParams.get('repayingLoan') === 'true',
        marketIndex: Number(searchParams.get('marketIndex')),
        useMaxAmount: searchParams.get('useMaxAmount') === 'true',
    };

    let body: z.infer<typeof paramsSchema>;
    try {
        body = paramsSchema.parse(params);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const connection = new Connection(env.RPC_URL);
    const address = new PublicKey(body.address);
    let amountBaseUnits = body.amountBaseUnits;
    const marketIndex = body.marketIndex as MarketIndex;
    const repayingLoan = body.repayingLoan;
    const useMaxAmount = body.useMaxAmount;
    const quartzClient = await QuartzClient.fetchClient(connection);
    let user: QuartzUser;
    try {
        user = await quartzClient.getQuartzAccount(address);
    } catch {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    try {
        if (useMaxAmount && repayingLoan) {
            amountBaseUnits = await user.getTokenBalance(marketIndex).then(Number).then(Math.abs);
            amountBaseUnits += DUST_BUFFER_BASE_UNITS;
        }

        const { 
            ixs,
            lookupTables
        } = await makeDepositIxs(connection, address, amountBaseUnits, marketIndex, user, repayingLoan);
        const transaction = await buildTransaction(connection, ixs, address, lookupTables);
        
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
