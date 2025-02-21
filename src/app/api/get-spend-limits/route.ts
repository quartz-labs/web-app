import { type QuartzUser, BN, QuartzClient } from "@quartz-labs/sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import { NextResponse } from "next/server";
import { z } from "zod";

const envSchema = z.object({
    RPC_URL: z.string().url(),
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
    const connection = new Connection(env.RPC_URL);

    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    if (!address) return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });

    let pubkey;
    try {
        pubkey = new PublicKey(address);
    } catch {
        return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 });
    }

    try {
        const quartzClient = await QuartzClient.fetchClient(connection);
        const user = await quartzClient.getQuartzAccount(pubkey);
        const currentSlot = await connection.getSlot();
        
        const spendLimitTImeframeRemaining = getRemainingTimeframeLimit(user, new BN(currentSlot));

        return NextResponse.json({
            timeframe: user.timeframeInSeconds.toNumber(),
            spendLimitTransactionBaseUnits: user.spendLimitPerTransaction.toNumber(),
            spendLimitTimeframeBaseUnits: user.spendLimitPerTimeframe.toNumber(),
            spendLimitTimeframeRemainingBaseUnits: spendLimitTImeframeRemaining.toNumber()
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error: ${error}` },
            { status: 500 }
        );
    }
}

function getRemainingTimeframeLimit(
    quartzUser: QuartzUser,
    currentSlot: BN
) {
    let spendLimit: BN;
    if (quartzUser.timeframeInSeconds.lte(new BN(0))) {
        // If timeframe is 0, spendlimit is 0
        spendLimit = new BN(0);
    } else {
        if ((currentSlot).gte(quartzUser.nextTimeframeResetTimestamp)) {
            // If spendLimitPerTimeframe will be reset, use full spendLimit
            spendLimit = quartzUser.spendLimitPerTimeframe;
        } else {
            // Else, use remainingSpendLimit
            spendLimit = quartzUser.remainingSpendLimitPerTimeframe;
        }
        // Final spendLimit is the minimum of timeframe and transaction limits
        spendLimit = BN.min(spendLimit, quartzUser.spendLimitPerTransaction);
    }

    return spendLimit;
}
