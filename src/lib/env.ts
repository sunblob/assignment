import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().default('postgresql://postgres:password@localhost:5432/postgres'),
    AUTH_SECRET: z.string().default(''),
  },
  client: {
    NEXT_PUBLIC_PEXELS_API_KEY: z.string().default(''),
  },
  runtimeEnv: {
    NEXT_PUBLIC_PEXELS_API_KEY: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
});
