
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

const components = [
    {
        name: "ingredients_list",
        is_nestable: true,
        schema: {
            title: { type: "text", default_value: "Ingredients" },
            subtitle: { type: "text", default_value: "Explained simply." },
            table_name: { type: "text", default_value: "ingredients" },
            categories: { type: "text", description: "Comma separated list of categories" }
        }
    },
    {
        name: "articles_list",
        is_nestable: true,
        schema: {
            title: { type: "text", default_value: "Articles" },
            subtitle: { type: "text", default_value: "Learn more about skincare." },
            table_name: { type: "text", default_value: "articles" },
            categories: { type: "text", description: "Comma separated list of categories" }
        }
    },
    {
        name: "products_list",
        is_nestable: true,
        schema: {
            title: { type: "text", default_value: "Products" },
            subtitle: { type: "text", default_value: "Shop our collection." },
            table_name: { type: "text", default_value: "products" },
            categories: { type: "text", description: "Comma separated list of categories" }
        }
    }
];

async function registerComponents() {
    console.log("🛠 Registering Supabase integration components...");
    console.log("Token exists?", !!STORYBLOK_OAUTH_TOKEN);

    if (!STORYBLOK_OAUTH_TOKEN) {
        console.error("❌ STORYBLOK_OAUTH_TOKEN is missing in .env.local");
        process.exit(1);
    }

    try {
        // Get existing components to update or create
        const existing = await Storyblok.get(`spaces/${SPACE_ID}/components`);
        const existingMap = new Map(existing.data.components.map(c => [c.name, c.id]));

        for (const comp of components) {
            try {
                if (existingMap.has(comp.name)) {
                    console.log(`Updating ${comp.name}...`);
                    await Storyblok.put(`spaces/${SPACE_ID}/components/${existingMap.get(comp.name)}`, { component: comp });
                } else {
                    console.log(`Creating ${comp.name}...`);
                    await Storyblok.post(`spaces/${SPACE_ID}/components`, { component: comp });
                }
            } catch (e) {
                console.error(`Failed to register ${comp.name}:`, JSON.stringify(e.response?.data || e.message));
            }
        }
        console.log("✅ All Supabase components registered!");
    } catch (e) {
        console.error("Critical error in registerComponents:", e);
        console.error("Error details:", JSON.stringify(e.response?.data || e.message));
    }
}

registerComponents().catch(e => console.error("Unhandled top level:", e));
