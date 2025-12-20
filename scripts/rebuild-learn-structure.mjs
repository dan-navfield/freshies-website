
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

const learnHomeBody = [
    {
        component: "learn_hero",
        eyebrow: "Knowledge Hub",
        headline: "Learn about skincare, without the confusion.",
        subheadline: "Freshies Learn helps parents and kids understand ingredients, products and skincare habits.",
        cta_primary_text: "Explore Ingredients",
        cta_secondary_text: "Read Guides"
    },
    {
        component: "learn_categories",
        headline: "What you will find in Learn",
        subheadline: "Expert-backed knowledge organized to help you find exactly what you need.",
        pillars: [
            { component: "learn_category_item", title: "Ingredients", description: "Decode labels.", icon_name: "BookOpen" },
            { component: "learn_category_item", title: "Guides", description: "How-to articles.", icon_name: "Sparkles" }
        ]
    }
];

async function rebuild() {
    console.log("🏗️ Rebuilding Learn Section...");

    try {
        // 1. DELETE EXISTING 'Learn' and 'Ingredients'
        console.log("🗑️ Cleaning up old content...");
        const rootStories = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { per_page: 50 });

        for (const story of rootStories.data.stories) {
            if (story.slug === 'learn' || story.slug === 'ingredients' || story.name === 'Learn' || story.name === 'Ingredients') {
                console.log(`Deleting ${story.name} (${story.slug})...`);
                await Storyblok.delete(`spaces/${SPACE_ID}/stories/${story.id}`);
            }
        }

        // 2. CREATE 'Learn' FOLDER
        console.log("Gd Creating 'Learn' folder...");
        const folderRes = await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "Learn",
                slug: "learn",
                is_folder: true,
                default_root: "home"
            }
        });
        const folderId = folderRes.data.story.id;

        // 3. CREATE 'Learn > Home'
        console.log("📄 Creating 'Learn > Home'...");
        await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "Learn Home",
                slug: "home",
                parent_id: folderId,
                is_startpage: true,
                content: {
                    component: "page",
                    body: learnHomeBody
                }
            }
        });

        // 4. CREATE 'Learn > Ingredients'
        console.log("📄 Creating 'Learn > Ingredients'...");
        await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "Ingredients",
                slug: "ingredients",
                parent_id: folderId,
                content: {
                    component: "page",
                    body: [{
                        component: "ingredients_list",
                        title: "Ingredients Database",
                        subtitle: "Search detailed safety profiles for skincare ingredients."
                    }]
                }
            }
        });

        // 5. CREATE 'Learn > Products'
        console.log("📄 Creating 'Learn > Products'...");
        await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "Products",
                slug: "products",
                parent_id: folderId,
                content: {
                    component: "page",
                    body: [{
                        component: "products_list",
                        title: "Curated Products",
                        subtitle: "Safe, vetted products for kids and tweens."
                    }]
                }
            }
        });

        // 6. CREATE 'Learn > Guides'
        console.log("📄 Creating 'Learn > Guides'...");
        await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "Guides",
                slug: "guides",
                parent_id: folderId,
                content: {
                    component: "page",
                    body: [{
                        component: "articles_list",
                        title: "Skincare Guides",
                        subtitle: "Expert advice on routines, sun safety, and myths."
                    }]
                }
            }
        });

        // Publish everything (simple loop over folder children)
        console.log("🚀 Publishing all new pages...");
        const newChildren = await Storyblok.get(`spaces/${SPACE_ID}/stories`, {
            starts_with: "learn/",
            per_page: 20
        });

        // Also publish the folder/home itself (which is 'learn')
        await Storyblok.get(`spaces/${SPACE_ID}/stories/${folderId}/publish`);

        for (const child of newChildren.data.stories) {
            console.log(`Publishing ${child.name}...`);
            await Storyblok.get(`spaces/${SPACE_ID}/stories/${child.id}/publish`);
        }

        console.log("✅ Rebuild Complete!");

    } catch (e) {
        console.error("❌ Failed:", JSON.stringify(e.response?.data || e.message));
    }
}

rebuild();
