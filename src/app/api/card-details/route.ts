export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateSessionId } from '@/src/utils/helpers';
import QueryString from 'qs';
import { decryptSecret, fetchAndParse } from '@/src/utils/helpers';

const envSchema = z.object({
    NEXT_PUBLIC_CARD_API_URL: z.string().url(),
    NEXT_PUBLIC_CARD_PEM: z.string()
});

const cardDetailsSchema = z.object({
    jwtToken: z.string()
});


export async function POST(request: Request) {
    let env;
    try {
        env = envSchema.parse({
            NEXT_PUBLIC_CARD_API_URL: process.env.NEXT_PUBLIC_CARD_API_URL,
            NEXT_PUBLIC_CARD_PEM: process.env.NEXT_PUBLIC_CARD_PEM
        });
    } catch (error) {
        console.error("Error validating environment variables: ", error);
        return new Response("Internal server configuration error", { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const cardId = searchParams.get('cardId');
    if (!cardId) return NextResponse.json({ error: "cardId is required" }, { status: 400 });


    const bodyJson = await request.json();
    
    let body: z.infer<typeof cardDetailsSchema>;
    try {
        body = cardDetailsSchema.parse(bodyJson);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    
    const sessionId = await generateSessionId(env.NEXT_PUBLIC_CARD_PEM);
    const queryString = QueryString.stringify({
        cardId: cardId,
        sessionId: sessionId
    });

    const response = await fetchAndParse(
        `${env.NEXT_PUBLIC_CARD_API_URL}card/secrets?${queryString}`,
         {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                accept: 'application/json',
                "Authorization": `Bearer ${body.jwtToken}`
            },
         }
    );

    try {
        const decryptedPan = (await decryptSecret(response.encryptedPan.data, response.encryptedPan.iv, sessionId.secretKey))
            .replace(/[^\d]/g, '').slice(0, 16);
        
        const decryptedCvc = (await decryptSecret(response.encryptedCvc.data, response.encryptedCvc.iv, sessionId.secretKey))
            .replace(/[^\d]/g, '').slice(0, 3);

        return NextResponse.json({
            pan: decryptedPan,
            cvc: decryptedCvc,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error, failed to decrypt card details: ${error}` },
            { status: 500 }
        );
    }
}