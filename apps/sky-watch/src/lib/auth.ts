import { neon, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzleAdapter } from "better-auth/adapters/drizzle";
// import { PostgresDialect } from 'kysely'
import { betterAuth } from 'better-auth';
import { nextCookies } from "better-auth/next-js";
import { sendWelcomEmail } from '@/app/actions/email';
import * as schema from "@/schema/auth-schema"

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

export const auth = betterAuth({
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, }) => {
            await sendWelcomEmail(user.name, user.email, url)
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },
    // database: {
    //     type: 'postgres',
    //     dialect: new PostgresDialect({
    //         pool: new Pool({ connectionString: process.env.DATABASE_URL })
    //     })
    // },
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: schema
    }),
    plugins: [nextCookies()]
});