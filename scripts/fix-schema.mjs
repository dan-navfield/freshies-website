import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const feature_tab_item = {
    name: "feature_tab_item",
    schema: {
        tab_icon: {
            type: "option",
            options: [
                { name: "Scan", value: "scan" },
                { name: "Sparkles", value: "sparkles" },
                { name: "Book", value: "book" },
                { name: "Library", value: "library" },
            ]
        },
        tab_title: { type: "text" },
        tab_description: { type: "textarea" },
        headline: { type: "text" },
        body: { type: "richtext" },
        key_points: {
            type: "bloks",
            restrict_components: true,
            component_whitelist: ["simple_text_item"],
        },
        cta_text: { type: "text" },
        visual_style: {
            type: "option",
            options: [
                { name: "None", value: "none" },
                { name: "Image", value: "image" },
                { name: "Scan Demo Animation", value: "scan_demo" },
                { name: "Floating Icons Animation", value: "floating_icons" },
            ]
        },
        image: { type: "asset", filetypes: ["images"] },
    },
    is_nestable: true,
};

const interactive_feature_showcase = {
    name: "interactive_feature_showcase",
    display_name: "Interactive Feature Showcase",
    schema: {
        headline: { type: "text" },
        subheadline: { type: "text" },
        features: {
            type: "bloks",
            restrict_components: true,
            component_whitelist: ["feature_tab_item"],
        }
    },
    is_root: false,
    is_nestable: true,
};

async function fix() {
    console.log("🔧 Fixing Schema Dependency...");

    try {
        // 1. Get existing IDs
        const res = await Storyblok.get(`spaces/${SPACE_ID}/components`);
        const components = res.data.components;

        const tabItem = components.find(c => c.name === "feature_tab_item");
        const showcase = components.find(c => c.name === "interactive_feature_showcase");

        if (tabItem) {
            console.log("Updating Child: feature_tab_item...");
            await Storyblok.put(`spaces/${SPACE_ID}/components/${tabItem.id}`, { component: feature_tab_item });
        } else {
            console.log("Creating Child: feature_tab_item...");
            await Storyblok.post(`spaces/${SPACE_ID}/components`, { component: feature_tab_item });
        }

        // Wait a bit just in case
        await new Promise(r => setTimeout(r, 1000));

        if (showcase) {
            console.log("Updating Parent: interactive_feature_showcase...");
            await Storyblok.put(`spaces/${SPACE_ID}/components/${showcase.id}`, { component: interactive_feature_showcase });
        } else {
            console.log("Creating Parent: interactive_feature_showcase...");
            await Storyblok.post(`spaces/${SPACE_ID}/components`, { component: interactive_feature_showcase });
        }

        console.log("✅ Schemas synced in order.");

    } catch (e) {
        console.error("Fix failed:", e.response?.data || e);
    }
}
fix();
