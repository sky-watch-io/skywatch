import crypto from "crypto";

export const getGravatarUrl = (email: string | undefined, size = 200) => {
    if (email) {
        const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
        return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
    }
}

export function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .normalize('NFKD')
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
