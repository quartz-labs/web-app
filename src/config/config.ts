import { PublicKey } from '@solana/web3.js';
import { z } from 'zod';

const envSchema = z.object({
    NEXT_PUBLIC_REQUIRE_BETA_KEY: z.string().transform((str) => str === "true"),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
    NEXT_PUBLIC_RPC_URL: z.string().url(),
    NEXT_PUBLIC_BETA_KEY_COLLECTION: z.string().refine(
        (str) => {
            try {
                new PublicKey(str);
                return true;
            } catch {
                return false;
            }
        },
        { message: "Beta key collection is not a valid public key" }
    ),
    NEXT_PUBLIC_API_URL: z.string().url().transform((url) => url.endsWith('/') ? url.slice(0, -1) : url)
});

const config = envSchema.parse({
    NEXT_PUBLIC_REQUIRE_BETA_KEY: process.env.NEXT_PUBLIC_REQUIRE_BETA_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_BETA_KEY_COLLECTION: process.env.NEXT_PUBLIC_BETA_KEY_COLLECTION,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
});

export default config;