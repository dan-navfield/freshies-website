import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

async function checkStories() {
    console.log("🔍 Checking for 'Home Alt' stories...");
    try {
        const res = await Storyblok.get(`spaces/${SPACE_ID}/stories`, {
            search_term: "Home Alt",
            version: "draft"
        });

        if (res.data.stories.length === 0) {
            console.log("❌ No stories found matching 'Home Alt'");
        } else {
            console.log(`Found ${res.data.stories.length} stories:`);
            res.data.stories.forEach(s => {
                console.log(`- [${s.id}] Name: "${s.name}", Slug: "${s.full_slug}", Update: ${s.updated_at}`);
            });
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
checkStories();
