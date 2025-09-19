import { Pool } from '@neondatabase/serverless';
import { PostgresDialect } from 'kysely'
import { betterAuth } from 'better-auth';
import { nextCookies } from "better-auth/next-js";
import { sendWelcomEmail } from '@/app/actions/email';

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
    database: {
        type: 'postgres',
        dialect: new PostgresDialect({
            pool: new Pool({ connectionString: process.env.DATABASE_URL })
        })
    },
    plugins: [nextCookies()]
});