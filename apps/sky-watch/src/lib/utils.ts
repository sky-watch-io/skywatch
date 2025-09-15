import crypto from "crypto";

export const getGravatarUrl = (email: string | undefined, size = 200) => {
    if (email) {
        const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
        return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
    }
}
