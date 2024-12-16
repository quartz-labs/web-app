import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    RPC_URL: z.string().url(),
    NEXT_PUBLIC_REQUIRE_BETA_KEY: z.string().transform((str) => str === "true"),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url()
});

const config = envSchema.parse(process.env);
export default config;
