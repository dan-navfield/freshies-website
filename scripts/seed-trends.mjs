import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const trends = [
    {
        name: "Does chocolate cause acne?",
        slug: "chocolate-acne-myth",
        content: {
            component: "trend_page",
            question: "Does eating chocolate really cause acne?",
            answer_preview: "It's one of the oldest myths in the book, but the science is surprising.",
            category: "Common questions",
            full_answer: "For decades, teenagers were told to put down the chocolate bar. But modern studies show little direct link between cocoa and acne. However, high-sugar diets CAN cause inflammation which leads to breakouts. So dark chocolate? Probably fine. A family-sized bar of milk chocolate? The sugar is the culprit, not the cocoa."
        }
    },
    {
        name: "Slugging",
        slug: "slugging-trend",
        content: {
            component: "trend_page",
            question: "What is 'Slugging' and is it safe for kids?",
            answer_preview: "A viral TikTok trend involving Vaseline. Here is the verdict.",
            category: "Popular now",
            full_answer: "Slugging involves slathering your face in an occlusive (like Vaseline) before bed. For dry skin, it can be great. For acne-prone teen skin? It is a recipe for disaster as it traps bacteria and oil. For little kids with eczema, it's actually a standard medical recommendation!"
        }
    },
    {
        name: "Sephora Kids",
        slug: "sephora-kids",
        content: {
            component: "trend_page",
            question: "Why are 10-year-olds buying anti-aging cream?",
            answer_preview: "The 'Sephora Kids' phenomenon explained.",
            category: "Social Media Pressure",
            full_answer: "Bright packaging and viral videos make strong actives look like collectibles. But Retinol and exfoliating acids can damage young skin barriers."
        }
    }
];

async function seed() {
    console.log("🌱 Seeding Trends...");
    try {
        // 1. Create or Find Folder
        let folderId;
        console.log("Checking for 'trends' folder...");
        const folders = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: "trends" });

        if (folders.data.stories.length > 0) {
            folderId = folders.data.stories[0].id;
            console.log(`📂 'trends' folder exists (ID: ${folderId})`);
        } else {
            console.log("📂 Creating 'trends' folder...");
            const folder = await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                story: {
                    name: "Trends",
                    slug: "trends",
                    is_folder: true,
                    full_slug: "learn/trends",
                    content: { component: "folder_config" }
                }
            });
            folderId = folder.data.story.id;
            console.log(`✅ Created folder ID: ${folderId}`);
        }

        // 2. Create Trends
        for (const trend of trends) {
            console.log(`Processing ${trend.name}...`);
            try {
                await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                    story: {
                        name: trend.name,
                        slug: trend.slug,
                        parent_id: folderId,
                        content: trend.content
                    }
                });
                console.log(`✅ Created ${trend.name}`);
            } catch (e) {
                console.log(`⚠️ Skiping or updating ${trend.name}`);
            }
        }

    } catch (e) {
        console.error("❌ Fatal Error:", e);
    }
}

seed();
