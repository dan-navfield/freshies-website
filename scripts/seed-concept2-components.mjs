import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const components = [
    {
        name: "concept_2_hero",
        display_name: "Concept 2 Hero",
        schema: {
            eyebrow: { type: "text" },
            headline: { type: "text" },
            subheadline: { type: "textarea" },
            cta_primary_text: { type: "text" },
            cta_secondary_text: { type: "text" },
        },
        is_root: false,
        is_nestable: true,
    },
    {
        name: "feature_marquee",
        display_name: "Feature Marquee",
        schema: {},
        is_root: false,
        is_nestable: true,
    },
    {
        name: "problem_framing",
        display_name: "Problem Framing",
        schema: {
            headline: { type: "text" },
            body: { type: "textarea" },
            highlight_1: { type: "text" },
            highlight_2: { type: "text" },
            footer_text: { type: "textarea" },
            background_color: {
                type: "option",
                options: [
                    { name: "Cream", value: "cream" },
                    { name: "Mint", value: "mint" },
                ],
                default_value: "mint"
            },
        },
        is_root: false,
        is_nestable: true,
    },
    {
        name: "feature_overview",
        display_name: "Feature Overview",
        schema: {
            headline: { type: "text" },
            intro_line: { type: "text" },
        },
        is_root: false,
        is_nestable: true,
    },
    {
        name: "feature_deep_dive",
        display_name: "Feature Deep Dive",
        schema: {
            label: { type: "text" },
            headline: { type: "text" },
            body: { type: "textarea" },
            bullets: { type: "bloks" }, // Or simplify to textarea sending array? Textarea is easier for now as comma-separated or lines. Let's stick with array of strings if component handles it, else simple textarea.
            // React component expects array. Storyblok can provide it via a "list" of text blocks or just a textarea we split. 
            // In seed script I used array of strings. Let's try to map that.
            // Actually, Storyblok doesn't strictly type "array of strings" natively like that without a block list.
            // Simplest way: "textarea" and we split by newline in component? Or "Blocks" field allowing "Simpe Text Item".
            // Component currently handles: `blok.bullets` as array strings. 
            // Let's use `textarea` for bullets for simple editing in Visual Editor (one per line) and I'll update component to split it.
            // OR use "bloks" field if I want items.
            // Decision: Let's use `textarea` and update component logic to `blok.bullets?.split('\n')`. It's cleaner for users than adding 4 sub-blocks.
            bullets: { type: "textarea", description: "One bullet per line" },
            supporting_line: { type: "text" },
            micro_copy: { type: "text" },
            image: { type: "asset", filetypes: ["images"] },
            is_reversed: { type: "boolean" },
        },
        is_root: false,
        is_nestable: true,
    },
    {
        name: "how_it_works",
        display_name: "How It Works",
        schema: {
            headline: { type: "text" },
            body: { type: "textarea" },
        },
        is_root: false,
        is_nestable: true,
    },
    {
        name: "kids_journey",
        display_name: "Kids Journey",
        schema: {
            headline: { type: "text" },
            body: { type: "textarea" },
        },
        is_root: false,
        is_nestable: true,
    },
    {
        name: "social_proof",
        display_name: "Social Proof",
        schema: {
            headline: { type: "text" },
            // testimonials could be a 'bloks' field, but for simplicity let's rely on defaults or hardcode structure
            // Or add a 'testimonials' block type. 
            // Let's keep it simple: headline only for now, rely on defaults if not provided, or add simple text fields.
        },
        is_root: false,
        is_nestable: true,
    },
    {
        name: "trust_reassurance",
        display_name: "Trust Reassurance",
        schema: {
            headline: { type: "text" },
            items: { type: "textarea", description: "One item per line" }
        },
        is_root: false,
        is_nestable: true,
    },
    {
        name: "final_cta",
        display_name: "Final CTA",
        schema: {
            headline: { type: "text" },
            body: { type: "textarea" },
            primary_cta: { type: "text" },
            secondary_cta: { type: "text" },
        },
        is_root: false,
        is_nestable: true,
    }
];

async function seedComponents() {
    console.log("🛠️ Seeding Concept 2 Components...");
    try {
        // First get existing components to update or create
        const existingComponents = await Storyblok.get(`spaces/${SPACE_ID}/components`);
        const existingMap = new Map(existingComponents.data.components.map(c => [c.name, c.id]));

        for (const comp of components) {
            if (existingMap.has(comp.name)) {
                console.log(`🔄 Updating ${comp.name}...`);
                await Storyblok.put(`spaces/${SPACE_ID}/components/${existingMap.get(comp.name)}`, {
                    component: comp
                });
            } else {
                console.log(`✨ Creating ${comp.name}...`);
                await Storyblok.post(`spaces/${SPACE_ID}/components`, {
                    component: comp
                });
            }
        }
        console.log("✅ All components seeded successfully!");
    } catch (e) {
        console.error("❌ Error seeding components:", e.response?.data || e);
    }
}

seedComponents();
