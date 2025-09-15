import { Pool } from '@neondatabase/serverless';
import { PostgresDialect } from 'kysely'
import { betterAuth } from 'better-auth';
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    database: {
        type: 'postgres',
        dialect: new PostgresDialect({
            pool: new Pool({ connectionString: process.env.DATABASE_URL })
        })
    },
    plugins: [nextCookies()]
});