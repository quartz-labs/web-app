export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection, PublicKey } from '@solana/web3.js';
import { BN, QuartzClient, QuartzUser } from '@quartz-labs/sdk';
import { buildTransaction } from '@/src/utils/helpers';
import { SpendLimitTimeframe } from '@/src/types/enums/SpendLimitTimeframe.enum';

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
    spendLimitTransactionBaseUnits: z.number().refine(
        Number.isInteger,
        { message: "spendLimitTransactionBaseUnits must be an integer" }
    ),  
    spendLimitTimeframeBaseUnits: z.number().refine(
        Number.isInteger,
        { message: "spendLimitTimeframeBaseUnits must be an integer" }
    ),
    spendLimitTimeframe: z.number().refine(
        (value) => {
            return Object.values(SpendLimitTimeframe).filter(v => typeof v === 'number').includes(value);
        },
        { message: "spendLimitTimeframe must be a valid SpendLimitTimeframe" }
    ),
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
        spendLimitTransactionBaseUnits: Number(searchParams.get('spendLimitTransactionBaseUnits')),
        spendLimitTimeframeBaseUnits: Number(searchParams.get('spendLimitTimeframeBaseUnits')),
        spendLimitTimeframe: Number(searchParams.get('spendLimitTimeframe')),
    };

    let body: z.infer<typeof paramsSchema>;
    try {
        body = paramsSchema.parse(params);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const connection = new Connection(env.RPC_URL);
    const address = new PublicKey(body.address);
    const spendLimitTransactionBaseUnits = body.spendLimitTransactionBaseUnits;
    const spendLimitTimeframeBaseUnits = body.spendLimitTimeframeBaseUnits;
    const spendLimitTimeframe = body.spendLimitTimeframe as SpendLimitTimeframe;

    const nextTimeframeResetTimestamp = getNextTimeframeReset(spendLimitTimeframe);

    const quartzClient = await QuartzClient.fetchClient(connection);
    let user: QuartzUser;
    try {
        user = await quartzClient.getQuartzAccount(address);
    } catch {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    try {
        const { 
            ixs,
            lookupTables,
            signers
        } = await user.makeAdjustSpendLimitsIxs(
            new BN(spendLimitTransactionBaseUnits),
            new BN(spendLimitTimeframeBaseUnits),
            new BN(spendLimitTimeframe),
            new BN(nextTimeframeResetTimestamp)
        );

        const transaction = await buildTransaction(connection, ixs, address, lookupTables);
        transaction.sign(signers);
        
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

function getNextTimeframeReset(timeframe: SpendLimitTimeframe): number {
    const reset = new Date();

    switch (timeframe) {    
        case SpendLimitTimeframe.DAY:
            reset.setUTCDate(reset.getUTCDate() + 1);
            reset.setUTCHours(0, 0, 0, 0);
            break;

        case SpendLimitTimeframe.WEEK:
            reset.setUTCDate(reset.getUTCDate() + ((8 - reset.getUTCDay()) % 7 || 7)); // Get next Monday
            reset.setUTCHours(0, 0, 0, 0);
            break;

        case SpendLimitTimeframe.MONTH:
            reset.setUTCMonth(reset.getUTCMonth() + 1); // Automatically handles rollover to next year
            reset.setUTCDate(1);
            reset.setUTCHours(0, 0, 0, 0);
            break;

        case SpendLimitTimeframe.YEAR:
            reset.setUTCFullYear(reset.getUTCFullYear() + 1);
            reset.setUTCMonth(0);
            reset.setUTCDate(1);
            reset.setUTCHours(0, 0, 0, 0);
            break;

        default:
            throw new Error("Invalid spend limit timeframe");
    }

    return Math.trunc(reset.getTime() / 1000); // Convert milliseconds to seconds
}
