import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

async function check() {
    try {
        const res = await Storyblok.get(`spaces/${SPACE_ID}/components`);
        const names = res.data.components.map(c => c.name);
        console.log("Existing Components:", names.join(", "));

        const missing = ["interactive_feature_showcase", "feature_tab_item"].filter(c => !names.includes(c));
        if (missing.length > 0) {
            console.error("❌ Missing components:", missing);
        } else {
            console.log("✅ All interactive components found.");
        }
    } catch (e) {
        console.error(e);
    }
}
check();
