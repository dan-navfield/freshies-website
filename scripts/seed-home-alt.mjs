import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
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
            component_whitelist: ["simple_text_item"],
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

// --- NEW Interactive Component ---
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

const feature_tab_item = {
    name: "feature_tab_item",
    schema: {
        // Tab Data
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

        // Content Data
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

// Helper Items
const simple_text_item = {
    name: "simple_text_item",
    schema: {
        text: { type: "text" },
    },
    is_nestable: true,
};

async function seedHomeAlt() {
    console.log("🌱 Seeding Home-Alt with Interactive Showcase...");

    // 1. Create/Update Components
    try {
        console.log("Updating component schemas...");
        // Exclude feature_grid as we replace it, but keep it if other pages need it. Adding new ones.
        const components = [
            hero_section,
            content_section,
            cta_section,
            interactive_feature_showcase,
            feature_tab_item,
            simple_text_item
        ];

        for (const comp of components) {
            try {
                await Storyblok.post(`spaces/${SPACE_ID}/components`, { component: comp });
                console.log(`Created component: ${comp.name}`);
            } catch (e) {
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
    console.log("Preparing story content...");
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
            // 3. Interactive Showcase (Replaces Feature Grid + 4 Content Sections)
            {
                component: "interactive_feature_showcase",
                headline: "Everything you need to build healthy habits.",
                subheadline: "Explore the features that make Freshies the #1 choice for families.",
                features: [
                    // Feature 1: Scan
                    {
                        component: "feature_tab_item",
                        tab_icon: "scan",
                        tab_title: "Product scanning",
                        tab_description: "Scan barcodes for instant safety scores.",

                        headline: "Scan products and understand what’s safe.",
                        body: "Freshies lets parents and kids scan skincare products to see a clear safety score and ingredient breakdown. It helps families understand what’s generally safe, and what may not be right for a specific child.",
                        visual_style: "scan_demo", // Keeps the custom demo code
                        key_points: [
                            { component: "simple_text_item", text: "Scan barcodes or labels" },
                            { component: "simple_text_item", text: "Clear 0–100 safety score" },
                            { component: "simple_text_item", text: "Colour coded risk indicators" },
                        ]
                    },
                    // Feature 2: Routines
                    {
                        component: "feature_tab_item",
                        tab_icon: "sparkles",
                        tab_title: "Routines",
                        tab_description: "Build healthy habits morning and night.",

                        headline: "Build healthy skincare habits together.",
                        body: "Freshies helps kids and teens build simple morning and night routines using products that are right for them. Parents can guide and check in, while kids build independence and confidence.",
                        visual_style: "image",
                        image: { filename: "https://placehold.co/600x600/F5F3FF/7C3AED?text=Routine+Checklist+App", alt: "Routine App Interface" },
                        cta_text: "View Routines",
                        key_points: [
                            { component: "simple_text_item", text: "Short, age appropriate routines" },
                            { component: "simple_text_item", text: "Visual progress and streaks" },
                        ]
                    },
                    // Feature 3: Learning
                    {
                        component: "feature_tab_item",
                        tab_icon: "book",
                        tab_title: "Learning",
                        tab_description: "Understand ingredients in plain language.",

                        headline: "Learn what ingredients really mean.",
                        body: "Freshies includes a learning space where parents and kids can explore skincare topics together. From ingredient basics to trend explainers, everything is written in clear, friendly language.",
                        visual_style: "floating_icons", // Keeps the custom icons animation
                        cta_text: "Start Learning"
                    },
                    // Feature 4: Shelf
                    {
                        component: "feature_tab_item",
                        tab_icon: "library",
                        tab_title: "Family Shelf",
                        tab_description: "Keep track of who uses what.",

                        headline: "Keep track of what your family uses.",
                        body: "Freshies keeps a record of the skincare products in your home, linked to the kids who use them. This helps families make better choices over time and avoid confusion or duplication.",
                        visual_style: "image",
                        image: { filename: "https://placehold.co/600x600/FFF7ED/F97316?text=Family+Shelf+Interface", alt: "Digital Shelf UI" },
                    }
                ]
            },
            // 4. Kids Journey (Quick Summary)
            {
                component: "content_section",
                layout: "center_text",
                background_color: "dark",
                headline: "Your skincare journey, your way.",
                body: "Freshies helps kids and teens take ownership of their skincare journey. Track progress, earn small wins, and build habits that feel positive and empowering.",
            },
            // 5. Trust
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
            // 6. Final CTA
            {
                component: "cta_section",
                variant: "boxed_primary",
                headline: "Ready to make skincare simpler?",
                subheadline: "Join thousands of families building healthy skin habits.",
                cta_text: "Download Freshies",
            }
        ]
    };

    console.log("Posting story update...");
    try {
        // 1. Delete existing story if found (to ensure clean slate and fix ID issues)
        try {
            const stories = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: "home-alt" });
            if (stories.data.stories.length > 0) {
                console.log("🗑️ Deleting existing 'Home Alt' story to ensure fresh IDs...");
                await Storyblok.delete(`spaces/${SPACE_ID}/stories/${stories.data.stories[0].id}`);
            }
        } catch (e) {
            console.log("No existing story or delete failed (ignoring):", e.message);
        }

        // 2. Create fresh story
        await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "Home Alt",
                slug: "home-alt",
                content: homeAltContent,
                path: "home-alt",
                is_startpage: false,
            }
        });
        console.log("✅ Created 'Home Alt' story successfully!");

    } catch (e) {
        console.error("Story creation failed:", e.response?.data || e);
    }
}

seedHomeAlt();
