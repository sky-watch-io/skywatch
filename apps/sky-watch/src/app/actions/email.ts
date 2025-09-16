import { WelcomeEmailTemplate } from "@/app/templates/WelcomeEmailTemplate";
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API_KEY);

export const sendWelcomEmail = async (name: string, email: string, verificationUrl: string) => {
    'use server'
    await resend.emails.send({
        from: 'Sky Watch <welcome@sky-watch.io>',
        to: email,
        subject: 'Welome to Sky Watch',
        react: WelcomeEmailTemplate({ name, verificationUrl }),
    });
}