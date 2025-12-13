import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const components = [
    {
        name: "values_section",
        schema: {
            headline: { type: "text" },
            subheadline: { type: "textarea" },
            values: {
                type: "bloks",
                translatable: false,
                component_whitelist: ["value_item"]
            },
        },
        is_nestable: true,
    },
    {
        name: "value_item",
        schema: {
            title: { type: "text" },
            description: { type: "textarea" },
            icon: {
                type: "option",
                source: "internal",
                datasource_slug: "icons", // Optional if using datasource, or just text. Let's use simple text for now to match code.
                type: "text"
            }
        },
        is_nestable: true,
    }
];

async function registerComponents() {
    console.log("🛠 Registering About Page components...");

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
            console.error(`Failed to register ${comp.name}:`, e.response?.data || e.message);
        }
    }
    console.log("✅ All components registered!");
}

registerComponents();
