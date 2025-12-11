import StoryblokClient from "storyblok-js-client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const hardcodedToken = "xXH7eQFgg1mHPEfjDnIGUwtt"; // From your previous test file
const token = process.env.STORYBLOK_OAUTH_TOKEN || hardcodedToken;

const Storyblok = new StoryblokClient({
    oauthToken: token,
});

const SPACE_ID = 289085951461266;

async function debug() {
    console.log("🔍 Debugging connection...");
    console.log(`🔑 Token (last 4): ...${token.slice(-4)}`);
    console.log(`🌍 Space ID: ${SPACE_ID}`);

    try {
        // 1. Try to fetch the Space details directly
        console.log("\n1️⃣ Attempting to get Space details...");
        const space = await Storyblok.get(`spaces/${SPACE_ID}`);
        console.log("✅ Success! Space Name:", space.data.space.name);
    } catch (e) {
        console.log("❌ Failed to get Space:", e.message);
        if (e.response) {
            console.log("   Status:", e.response.status);
            console.log("   Data:", JSON.stringify(e.response.data));
        }
    }

    try {
        // 2. Try to list components (READ only)
        console.log("\n2️⃣ Attempting to list components...");
        const components = await Storyblok.get(`spaces/${SPACE_ID}/components`);
        console.log("✅ Success! Found", components.data.components.length, "components.");
    } catch (e) {
        console.log("❌ Failed to list components:", e.message);
    }
}

debug();
