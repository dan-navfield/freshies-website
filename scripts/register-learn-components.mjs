import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const components = [
    // Main Sections
    {
        name: "learn_hero",
        is_nestable: true,
        schema: {
            eyebrow: { type: "text" },
            headline: { type: "text" },
            subheadline: { type: "textarea" },
            cta_primary_text: { type: "text" },
            cta_secondary_text: { type: "text" },
            background_words: { type: "bloks" } // List of simple text items
        }
    },
    {
        name: "learn_categories",
        is_nestable: true,
        schema: {
            headline: { type: "text" },
            subheadline: { type: "text" },
            pillars: { type: "bloks" } // learn_category_item
        }
    },
    {
        name: "learn_featured",
        is_nestable: true,
        schema: {
            headline: { type: "text" },
            subheadline: { type: "text" },
            articles: { type: "bloks" } // learn_article_card
        }
    },
    {
        name: "learn_ingredients",
        is_nestable: true,
        schema: {
            headline: { type: "text" },
            subheadline: { type: "textarea" },
            ingredients: { type: "bloks" } // learn_ingredient_item
        }
    },
    {
        name: "learn_app_connect",
        is_nestable: true,
        schema: {
            headline: { type: "text" },
            subheadline: { type: "textarea" },
            steps: { type: "bloks" } // learn_step_item
        }
    },
    {
        name: "learn_cta",
        is_nestable: true,
        schema: {
            headline: { type: "text" },
            subheadline: { type: "textarea" },
            cta_primary_text: { type: "text" },
            cta_secondary_text: { type: "text" }
        }
    },
    {
        name: "learn_trust",
        is_nestable: true,
        schema: {
            items: { type: "bloks" } // learn_trust_item
        }
    },

    // Sub Components
    {
        name: "simple_text_item", // Reusable
        is_nestable: true,
        schema: {
            text: { type: "text" }
        }
    },
    {
        name: "learn_category_item",
        is_nestable: true,
        schema: {
            title: { type: "text" },
            description: { type: "textarea" },
            icon_name: { type: "text" },
            color_theme: { type: "option", options: [{ name: "Blue", value: "blue" }, { name: "Purple", value: "purple" }, { name: "Mint", value: "mint" }, { name: "Peach", value: "peach" }] },
            article_links: { type: "bloks" } // simple_text_item
        }
    },
    {
        name: "learn_article_card",
        is_nestable: true,
        schema: {
            title: { type: "text" },
            excerpt: { type: "textarea" },
            read_time: { type: "text" },
            tag: { type: "text" },
            image: { type: "asset" }
        }
    },
    {
        name: "learn_ingredient_item",
        is_nestable: true,
        schema: {
            name: { type: "text" },
            description: { type: "text" },
            status: { type: "option", options: [{ name: "Safe", value: "safe" }, { name: "Caution", value: "caution" }, { name: "Depends", value: "depends" }] }
        }
    },
    {
        name: "learn_step_item",
        is_nestable: true,
        schema: {
            number: { type: "text" },
            title: { type: "text" },
            description: { type: "textarea" },
            icon_name: { type: "text" }
        }
    },
    {
        name: "learn_trust_item",
        is_nestable: true,
        schema: {
            text: { type: "text" },
            icon_name: { type: "text" }
        }
    }
];

async function registerComponents() {
    console.log("🛠 Registering Learn Page components...");
    console.log("Token exists?", !!STORYBLOK_OAUTH_TOKEN);

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
        console.log("✅ All Learn components registered!");
    } catch (e) {
        console.error("Critical error in registerComponents:", e);
    }
}

registerComponents().catch(e => console.error("Unhandled top level:", e));
