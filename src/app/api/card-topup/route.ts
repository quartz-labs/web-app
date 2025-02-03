export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { AllbridgeCoreSdk, ChainSymbol } from "@allbridge/bridge-core-sdk";
import type { CardsForUserResponse } from '@/src/types/interfaces/CardUserResponse.interface';

const envSchema = z.object({
    RPC_URL: z.string().url(),
    BASE_RPC_URL: z.string().url(),
    NEXT_PUBLIC_INTERNAL_API_URL: z.string().url(),
});

const bodySchema = z.object({
    signature: z.string(),
    cardId: z.string(),
    jwtToken: z.string()
});

export async function POST(request: Request) {
    let env;
    try {
        env = envSchema.parse({
            RPC_URL: process.env.RPC_URL,
            BASE_RPC_URL: process.env.BASE_RPC_URL,
            NEXT_PUBLIC_INTERNAL_API_URL: process.env.NEXT_PUBLIC_INTERNAL_API_URL
        });
    } catch (error) {
        console.error("Error validating environment variables: ", error);
        return new Response("Internal server configuration error", { status: 500 });
    }

    const sdk = new AllbridgeCoreSdk({
        // ...nodeRpcUrlsDefault,
        SOL: env.RPC_URL,
        ETH: env.BASE_RPC_URL
    });

    const bodyJson = await request.json();

    let body: z.infer<typeof bodySchema>;
    try {
        body = bodySchema.parse(bodyJson);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const signature = body.signature;
    const chainSymbol = ChainSymbol.SOL;

    let transferStatus;
    try {
        transferStatus = await sdk.getTransferStatus(chainSymbol, signature);
    }
    catch {
        return NextResponse.json({"status": "Transfer status not found"}, { status: 404 });
    }

    let amount: number;
    try {
        if (!transferStatus.receive) {
            return NextResponse.json({"status": "Transfer status not found"}, { status: 404 });
        }

        // Convert to dollars by dividing by 1_000_000 (6 decimal places)
        const amountInDollars = Number(transferStatus.receive.amount) / 1_000_000;
        // Round to 2 decimal places
        const roundedAmount = Math.floor(amountInDollars * 100) / 100;

        amount = Math.round(roundedAmount * 100);

    } catch {
        return NextResponse.json({"status": "Transfer status not found"}, { status: 404 });
    }

    //TODO: convert number to format that Card api expects 
    try {
        const updatedCard = await updateCardLimit(body.cardId, Number(amount), env, body.jwtToken);
        return NextResponse.json(updatedCard);
    } catch (error) {
        console.error("Error updating the card limit: ", error);
        return NextResponse.json("Error updating the card limit", { status: 500 });
    }

}


const updateCardLimit = async (cardId: string, amount: number, env: z.infer<typeof envSchema>, jwtToken: string) => {
    try {
        const updateResponse = await fetch(`${env.NEXT_PUBLIC_INTERNAL_API_URL}card/issuing?id=${cardId}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                frequency: "allTime",
                amountLimit: amount,
                status: "active",
            })
        });

        if (updateResponse.status !== 200) {
            throw new Error("Failed to update the card limit");
        }
        //get the updated card details
        const updatedCardResponse = await fetch(`${env.NEXT_PUBLIC_INTERNAL_API_URL}card/issuing?id=${cardId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (updatedCardResponse.status !== 200) {
            throw new Error("Failed to get the updated card details");
        }

        return await updatedCardResponse.json() as CardsForUserResponse;
    } catch (error) {
        throw error;
    }
}