import { Html, Button, Tailwind, Heading, Container, Hr, Text, Img, Section } from "@react-email/components";

interface EmailTemplateProps {
    name: string;
    verificationUrl: string;
}

export function WelcomeEmailTemplate({ name, verificationUrl }: EmailTemplateProps) {
    return (
        <Html lang="en">
            <Tailwind>
                <Container className="max-w-100">
                    <Img src="https://app.sky-watch.io/web-app-manifest-512x512.png" width={30} height={30} className="mt-4" />
                    <Hr className="my-[16px] border-gray-300 border-t-2" />
                    <Heading as="h2">Hi {name},</Heading>
                    <Text>We’re excited to have you on Sky Watch.</Text>
                    <Text>Your journey to crystal-clear insights into your product starts here.</Text>
                    <Text>With Sky Watch, you can:</Text>
                    {[
                        {
                            number: 1,
                            title: '📊 Understand your users',
                            description:
                                'with powerful analytics',
                        },
                        {
                            number: 2,
                            title: '🎥 See exactly what they experience',
                            description:
                                'through session replays',
                        },
                        {
                            number: 3,
                            title: '🛠️ Catch and fix issues fast',
                            description:
                                'with real-time error tracking',
                        }
                    ].map((feature) => (
                        <Section className="mb-[36px]">
                            <div className="mr-[32px] ml-[12px] inline-flex items-start">
                                <div className="mt-[3px] mr-[12px] h-[24px] w-[24px] shrink-0 rounded-full bg-[#ff7d5d] font-semibold text-[#160503] text-[12px] leading-none text-center">
                                    <div className="mt-[6px]">{feature.number}</div>
                                </div>
                                <div>
                                    <Heading
                                        as="h4"
                                        className="mt-[0px] mb-[8px] leading-[28px] font-semibold text-[16px]"
                                    >
                                        {feature.title}
                                    </Heading>
                                    <Text className="m-0 text-gray-500 text-[14px] leading-[24px] ">
                                        {feature.description}
                                    </Text>
                                </div>
                            </div>
                        </Section>
                    ))}
                    <Text>👉 Start exploring your dashboard today and see your product from a whole new perspective.</Text>
                    <Button
                        className="box-border w-full rounded-[8px] bg-[#9fe88d] px-[12px] py-[12px] text-center font-semibold text-[#091307] text-[14px]"
                        href={verificationUrl}
                    >
                        View your dashboard
                    </Button>
                    <Hr className="my-[16px] border-gray-300 border-t-2" />
                </Container>
            </Tailwind>
        </Html>
    );
}