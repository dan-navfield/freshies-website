import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const NEXT_PUBLIC_STORYBLOK_TOKEN = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
const SPACE_ID = "289085951461266"; // Freshies Space ID

if (!STORYBLOK_OAUTH_TOKEN) {
    console.error("Error: STORYBLOK_OAUTH_TOKEN is missing in .env.local");
    process.exit(1);
}

const Storyblok = new StoryblokClient({
    oauthToken: STORYBLOK_OAUTH_TOKEN,
});

// --- Component Schemas ---

const hero_section = {
    name: "hero_section",
    display_name: "Master Block: Hero",
    schema: {
        eyebrow: { type: "text" },
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        cta_primary_text: { type: "text" },
        cta_secondary_text: { type: "text" },
        layout: {
            type: "option",
            options: [
                { name: "Center", value: "center" },
                { name: "Split Left", value: "split_left" },
                { name: "Split Right", value: "split_right" },
            ],
            default_value: "center",
        },
        visual_style: {
            type: "option",
            options: [
                { name: "None", value: "none" },
                { name: "Single Image", value: "image" },
                { name: "Layered Phones (Parallax)", value: "layered_phones_parallax" },
            ]
        },
        background_theme: {
            type: "option",
            options: [
                { name: "Light (Soft Pink)", value: "light" },
                { name: "Dark (Deep Purple)", value: "dark" },
                { name: "Gradient Blue", value: "gradient_blue" },
                { name: "Gradient Purple", value: "gradient_purple" },
            ]
        },
        image_center: { type: "asset", filetypes: ["images"] },
        image_left: { type: "asset", filetypes: ["images"] },
        image_right: { type: "asset", filetypes: ["images"] },
        image: { type: "asset", filetypes: ["images"] },
    },
    is_root: false,
    is_nestable: true,
};

const content_section = {
    name: "content_section",
    display_name: "Master Block: Content",
    schema: {
        eyebrow: { type: "text" },
        headline: { type: "text" },
        body: { type: "richtext" },
        key_points: {
            type: "bloks",
            restrict_components: true,
            component_whitelist: ["simple_text_item"], // Will reuse or create a simple item
        },
        cta_text: { type: "text" },
        layout: {
            type: "option",
            options: [
                { name: "Center Text", value: "center_text" },
                { name: "Left Text / Right Image", value: "left_text_right_image" },
                { name: "Right Text / Left Image", value: "right_text_left_image" },
            ],
        },
        background_color: {
            type: "option",
            options: [
                { name: "White", value: "white" },
                { name: "Neutral (Sand)", value: "neutral" },
                { name: "Light Purple", value: "light_purple" },
                { name: "Dark (Deep Purple)", value: "dark" },
            ]
        },
        visual_element: {
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
    is_root: false,
    is_nestable: true,
};

const feature_grid = {
    name: "feature_grid",
    display_name: "Master Block: Feature Grid",
    schema: {
        headline: { type: "text" },
        subheadline: { type: "text" },
        cards: {
            type: "bloks",
            restrict_components: true,
            component_whitelist: ["feature_card_item"],
        },
        columns: {
            type: "option",
            options: [
                { name: "2 Columns", value: "2" },
                { name: "3 Columns", value: "3" },
                { name: "4 Columns", value: "4" },
            ],
            default_value: "3"
        }
    },
    is_root: false,
    is_nestable: true,
};

const cta_section = {
    name: "cta_section",
    display_name: "Master Block: CTA",
    schema: {
        headline: { type: "text" },
        subheadline: { type: "text" },
        cta_text: { type: "text" },
        variant: {
            type: "option",
            options: [
                { name: "Simple Centered", value: "simple_centered" },
                { name: "Boxed Primary (Dark Gradient)", value: "boxed_primary" },
                { name: "Split", value: "split" },
            ]
        }
    },
    is_root: false,
    is_nestable: true,
};

// Helper Items
const feature_card_item = {
    name: "feature_card_item",
    schema: {
        icon: {
            type: "option",
            options: [
                { name: "Scan", value: "scan" },
                { name: "Sparkles", value: "sparkles" },
                { name: "Book", value: "book" },
                { name: "Library", value: "library" },
            ]
        },
        title: { type: "text" },
        description: { type: "textarea" },
    },
    is_nestable: true,
};

const simple_text_item = {
    name: "simple_text_item",
    schema: {
        text: { type: "text" },
    },
    is_nestable: true,
};

async function seedHomeAlt() {
    console.log("🌱 Seeding Home-Alt...");

    // 1. Create/Update Components
    try {
        console.log("Updating component schemas...");
        const components = [hero_section, content_section, feature_grid, cta_section, feature_card_item, simple_text_item];

        for (const comp of components) {
            try {
                // Try create
                await Storyblok.post(`spaces/${SPACE_ID}/components`, { component: comp });
                console.log(`Created component: ${comp.name}`);
            } catch (e) {
                // If exists (422), use PUT to update. Currently API requires finding ID first or ignoring error.
                // We'll optimistically skip complex update logic for brevity, assuming 'post' fails if exists.
                // Better approach: Get all components, map names to IDs, then update.
                const res = await Storyblok.get(`spaces/${SPACE_ID}/components`);
                const existing = res.data.components.find(c => c.name === comp.name);
                if (existing) {
                    await Storyblok.put(`spaces/${SPACE_ID}/components/${existing.id}`, { component: comp });
                    console.log(`Updated component: ${comp.name}`);
                }
            }
        }
    } catch (error) {
        console.error("Component setup failed:", error);
    }

    // 2. Create Story Content
    const homeAltContent = {
        component: "page",
        body: [
            // 1. Hero
            {
                component: "hero_section",
                layout: "split_left",
                visual_style: "layered_phones_parallax",
                background_theme: "light",
                eyebrow: "Skincare made for families",
                headline: "Understand what’s safe for your kids’ skin.",
                subheadline: "Freshies helps parents and kids make smarter skincare choices together. Scan products, understand ingredients, and build healthy routines that grow with your child.",
                cta_primary_text: "Download the app",
                cta_secondary_text: "How Freshies works",
                // Images would ideally be uploaded assets, we'll rely on default fallbacks in component for now
            },
            // 2. Problem Framing
            {
                component: "content_section",
                layout: "center_text",
                background_color: "neutral",
                headline: "Skincare shouldn’t be confusing or stressful.",
                body: "Kids and teens are exposed to more skincare products than ever. Ingredients lists are hard to read, trends change fast, and it’s not always clear what’s actually safe for developing skin. Parents want clarity. Kids want independence. Freshies is built to support both.",
                visual_element: "none",
            },
            // 3. Feature Overview Grid
            {
                component: "feature_grid",
                columns: "4",
                cards: [
                    { component: "feature_card_item", icon: "scan", title: "Product scanning", description: "Scan barcodes for instant safety scores." },
                    { component: "feature_card_item", icon: "sparkles", title: "Routines", description: "Build healthy habits morning and night." },
                    { component: "feature_card_item", icon: "book", title: "Learning", description: "Understand ingredients in plain language." },
                    { component: "feature_card_item", icon: "library", title: "Family Shelf", description: "Keep track of who uses what." },
                ]
            },
            // 4. Feature 1: Scan
            {
                component: "content_section",
                layout: "left_text_right_image",
                background_color: "white",
                visual_element: "scan_demo", // Uses our specific demo visual
                headline: "Scan products and understand what’s safe.",
                body: "Freshies lets parents and kids scan skincare products to see a clear safety score and ingredient breakdown. It helps families understand what’s generally safe, and what may not be right for a specific child.",
                key_points: [
                    { component: "simple_text_item", text: "Scan barcodes or labels" },
                    { component: "simple_text_item", text: "Clear 0–100 safety score" },
                    { component: "simple_text_item", text: "Colour coded risk indicators" },
                ]
            },
            // 5. Feature 2: Routines
            {
                component: "content_section",
                layout: "right_text_left_image",
                background_color: "light_purple",
                visual_element: "image", // Fallback to image for now
                eyebrow: "Daily Habits",
                headline: "Build healthy skincare habits together.",
                body: "Freshies helps kids and teens build simple morning and night routines using products that are right for them. Parents can guide and check in, while kids build independence and confidence.",
                key_points: [
                    { component: "simple_text_item", text: "Short, age appropriate routines" },
                    { component: "simple_text_item", text: "Visual progress and streaks" },
                ]
            },
            // 6. Feature 3: Learning
            {
                component: "content_section",
                layout: "left_text_right_image",
                background_color: "white",
                visual_element: "floating_icons",
                headline: "Learn what ingredients really mean.",
                body: "Freshies includes a learning space where parents and kids can explore skincare topics together. From ingredient basics to trend explainers, everything is written in clear, friendly language.",
            },
            // 7. Feature 4: Shelf
            {
                component: "content_section",
                layout: "right_text_left_image",
                background_color: "neutral",
                visual_element: "image",
                eyebrow: "Your Shelf",
                headline: "Keep track of what your family uses.",
                body: "Freshies keeps a record of the skincare products in your home, linked to the kids who use them. This helps families make better choices over time and avoid confusion or duplication.",
            },
            // 8. Kids Journey (Quick Summary)
            {
                component: "content_section",
                layout: "center_text",
                background_color: "dark",
                headline: "Your skincare journey, your way.",
                body: "Freshies helps kids and teens take ownership of their skincare journey. Track progress, earn small wins, and build habits that feel positive and empowering.",
            },
            // 9. Trust
            {
                component: "content_section",
                layout: "center_text",
                background_color: "white",
                headline: "Built with care.",
                key_points: [
                    { component: "simple_text_item", text: "Designed to support families, not replace professional advice" },
                    { component: "simple_text_item", text: "Privacy and child safety first" },
                    { component: "simple_text_item", text: "No public social feeds" },
                ]
            },
            // 10. Final CTA
            {
                component: "cta_section",
                variant: "boxed_primary",
                headline: "Ready to make skincare simpler?",
                subheadline: "Join thousands of families building healthy skin habits.",
                cta_text: "Download Freshies",
            }
        ]
    };

    try {
        await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "Home Alt",
                slug: "home-alt",
                content: homeAltContent,
                path: "home-alt",
                is_startpage: false, // Not main homepage yet
            }
        });
        console.log("✅ Created 'Home Alt' story successfully!");
    } catch (e) {
        // If conflict, try update (not implemented for brevity, assume manual delete if needed or unique slug)
        console.error("Story creation failed (might already exist):", e.response?.data || e);
    }
}

seedHomeAlt();
