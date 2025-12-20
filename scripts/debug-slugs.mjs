
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

async function checkStructure() {
    console.log("🔍 Checking Storyblok Structure...");
    try {
        const response = await Storyblok.get(`spaces/${SPACE_ID}/stories`, {
            text_search: "ingredients",
            per_page: 5
        });

        const stories = response.data.stories;
        stories.forEach(s => {
            console.log(`- Name: ${s.name}, Slug: ${s.slug}, Full Slug: ${s.full_slug}, ID: ${s.id}, Parent ID: ${s.parent_id}`);
        });

        console.log("---");
        const learnResponse = await Storyblok.get(`spaces/${SPACE_ID}/stories`, {
            with_slug: "learn"
        });
        const learn = learnResponse.data.stories[0];
        if (learn) {
            console.log(`Learn Page: Name: ${learn.name}, Is Folder: ${learn.is_folder}, ID: ${learn.id}`);
        }

    } catch (e) {
        console.error("❌ Failed:", JSON.stringify(e.response?.data || e.message));
    }
}

checkStructure();
