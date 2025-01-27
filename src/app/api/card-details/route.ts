export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateSessionId } from '@/src/utils/helpers';
import QueryString from 'qs';
import { decryptSecret, fetchAndParse } from '@/src/utils/helpers';

const envSchema = z.object({
    NEXT_PUBLIC_INTERNAL_API_URL: z.string().url(),
    NEXT_PUBLIC_CARD_PEM: z.string()
});

const cardDetailsSchema = z.object({
    jwtToken: z.string()
});


export async function POST(request: Request) {
    let env;
    try {
        env = envSchema.parse({
            NEXT_PUBLIC_INTERNAL_API_URL: process.env.NEXT_PUBLIC_INTERNAL_API_URL,
            NEXT_PUBLIC_CARD_PEM: process.env.NEXT_PUBLIC_CARD_PEM
        });
    } catch (error) {
        console.error("Error validating environment variables: ", error);
        return new Response("Internal server configuration error", { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Card ID is required" }, { status: 400 });


    const bodyJson = await request.json();
    
    let body: z.infer<typeof cardDetailsSchema>;
    try {
        body = cardDetailsSchema.parse(bodyJson);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }


    const queryString = QueryString.stringify({
        id: id
    });

    console.log("queryString", queryString);

    const sessionId = await generateSessionId(env.NEXT_PUBLIC_CARD_PEM!)
    console.log("sessionId", sessionId);

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            accept: 'application/json',
            "Authorization": `Bearer ${body.jwtToken}`
        },
        body: JSON.stringify({ sessionId: sessionId.sessionId })
    };
    const response = await fetchAndParse(`${env.NEXT_PUBLIC_INTERNAL_API_URL}card/issuing/secrets?${queryString}`, options);
    console.log("response", response);
    try {
        const decryptedPan = (await decryptSecret(response.encryptedPan.data, response.encryptedPan.iv, sessionId.secretKey))
            .replace(/[^\d]/g, '');
        console.log("decryptedPan", decryptedPan);
        
        const decryptedCvc = (await decryptSecret(response.encryptedCvc.data, response.encryptedCvc.iv, sessionId.secretKey))
            .replace(/[^\d]/g, '');
        console.log("decryptedCvc", decryptedCvc);

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