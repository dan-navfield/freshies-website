import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

async function checkContent() {
    console.log("🔍 Inspecting 'Home Alt' content...");
    try {
        const res = await Storyblok.get(`spaces/${SPACE_ID}/stories`, {
            with_slug: "home-alt",
            version: "draft"
        });

        if (res.data.stories.length > 0) {
            const summary = res.data.stories[0];
            console.log(`Found story summary: ${summary.name} (ID: ${summary.id})`);

            // GET FULL STORY CONTENT (List view often excludes 'content')
            const fullRes = await Storyblok.get(`spaces/${SPACE_ID}/stories/${summary.id}`);
            const story = fullRes.data.story;

            if (!story.content) {
                console.error("❌ Story has no content object!");
                return;
            }

            const blocks = story.content.body || [];
            console.log(`\nStory Body has ${blocks.length} blocks.`);

            console.log("\nBlocks found on page:");
            blocks.forEach((b, i) => {
                console.log(`${i + 1}. ${b.component}`);
                if (b.component === 'interactive_feature_showcase') {
                    console.log("   ✅ Interactive component found!");
                    console.log(`   - Headline: ${b.headline}`);
                    console.log(`   - Features count: ${b.features?.length}`);
                    console.log(`   - Theme: ${b.background_color}`); // Check for coloring
                }
            });

            if (!blocks.some(b => b.component === 'interactive_feature_showcase')) {
                console.error("\n❌ Interactive component MISSING from content body!");
            }
        } else {
            console.log("❌ Story not found");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
checkContent();
