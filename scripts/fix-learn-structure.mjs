
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

async function fixStructure() {
    console.log("🔧 Fixing Storyblok Structure...");
    try {
        // 1. Get existing 'Learn' page content
        const learnRes = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: "learn" });
        const learnPage = learnRes.data.stories[0];

        if (!learnPage) {
            console.error("❌ Could not find 'Learn' page to migrate.");
            return;
        }

        if (learnPage.is_folder) {
            console.log("ℹ️ 'Learn' is already a folder. Checking Ingredients location...");
            // Just move ingredients if needed
        } else {
            console.log("📦 'Learn' is a page. Converting to Folder...");
            const content = learnPage.content;
            const name = learnPage.name;

            // Delete existing page
            console.log("🗑️ Deleting old Learn page...");
            await Storyblok.delete(`spaces/${SPACE_ID}/stories/${learnPage.id}`);

            // Create Folder
            console.log("Gd Creating Learn folder...");
            const folderRes = await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                story: {
                    name: "Learn",
                    slug: "learn",
                    is_folder: true,
                    default_root: "home" // Optional, helps editor
                }
            });
            const folderId = folderRes.data.story.id;

            // Create Index Page (home)
            console.log("📄 Creating Learn Home page...");
            await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                story: {
                    name: "Learn Home",
                    slug: "home",
                    content: content,
                    parent_id: folderId,
                    is_startpage: true
                }
            });

            // Publish the home page (we can't publish folder directly effectively)
            // We need to find the new story ID to publish it?
            // The post returns it.

            console.log("✅ Learn folder structure created.");

            // 2. Move Ingredients Folder
            console.log("🚚 Moving Ingredients into Learn...");
            const ingRes = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: "ingredients" });
            const ingredients = ingRes.data.stories[0];

            if (ingredients) {
                await Storyblok.put(`spaces/${SPACE_ID}/stories/${ingredients.id}`, {
                    story: {
                        parent_id: folderId, // Move to Learn folder
                        slug: "ingredients", // Keep slug
                        name: ingredients.name
                    }
                });
                console.log("✅ Ingredients moved to /learn/ingredients");

                // Publish ingredients to be safe
                await Storyblok.get(`spaces/${SPACE_ID}/stories/${ingredients.id}/publish`);
            } else {
                console.warn("⚠️ Could not find 'Ingredients' page at root to move.");
            }
        }

    } catch (e) {
        console.error("❌ Failed:", JSON.stringify(e.response?.data || e.message));
    }
}

fixStructure();
