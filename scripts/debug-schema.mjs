import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

async function debug() {
    console.log("🕵️‍♀️ Debugging Schemas...");

    try {
        const res = await Storyblok.get(`spaces/${SPACE_ID}/components`);

        const showcase = res.data.components.find(c => c.name === "interactive_feature_showcase");
        const tabItem = res.data.components.find(c => c.name === "feature_tab_item");

        if (showcase) {
            console.log("\n=== Interactive Feature Showcase ===");
            console.log("ID:", showcase.id);
            console.log("Schema for 'features':", JSON.stringify(showcase.schema.features, null, 2));
        } else {
            console.error("❌ interactive_feature_showcase NOT FOUND");
        }

        if (tabItem) {
            console.log("\n=== Feature Tab Item ===");
            console.log("ID:", tabItem.id);
            console.log("Is Nestable:", tabItem.is_nestable);
        } else {
            console.error("❌ feature_tab_item NOT FOUND");
        }

    } catch (e) {
        console.error("Error:", e);
    }
}
debug();
