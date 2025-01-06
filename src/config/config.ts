import { z } from 'zod';

const envSchema = z.object({
    NEXT_PUBLIC_REQUIRE_BETA_KEY: z.string().transform((str) => str === "true"),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
    NEXT_PUBLIC_RPC_URL: z.string().url(),
    NEXT_PUBLIC_UNAVAILABLE_TIME: z.string()
});

type Config = z.infer<typeof envSchema>;
const config: Config = envSchema.parse({
    NEXT_PUBLIC_REQUIRE_BETA_KEY: process.env.NEXT_PUBLIC_REQUIRE_BETA_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_UNAVAILABLE_TIME: process.env.NEXT_PUBLIC_UNAVAILABLE_TIME
});

export default config;