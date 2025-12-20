
import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

async function publish() {
    console.log("🚀 Publishing Ingredients Page...");
    try {
        // Find the page
        const responseData = await Storyblok.get(`spaces/${SPACE_ID}/stories`, {
            text_search: "ingredients",
            per_page: 5
        });

        const stories = responseData.data.stories;
        const targetStory = stories.find(s => s.slug === 'ingredients' || s.full_slug.endsWith('/ingredients'));

        if (targetStory) {
            console.log(`Found story: ${targetStory.name} (ID: ${targetStory.id})`);
            await Storyblok.get(`spaces/${SPACE_ID}/stories/${targetStory.id}/publish`, {});
            console.log("✅ Published successfully!");
        } else {
            console.log("❌ Could not find the page to publish.");
        }
    } catch (e) {
        console.error("❌ Failed:", JSON.stringify(e.response?.data || e.message));
    }
}

publish();
