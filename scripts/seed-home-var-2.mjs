import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const homeAlt2Content = {
    component: "page",
    body: [
        // 1. Hero
        {
            component: "hero_section",
            eyebrow: "Skincare made for families",
            headline: "Understand what’s safe for your kids’ skin.",
            subheadline: "Freshies helps parents and kids make smarter skincare choices together. Scan products, understand ingredients, and build healthy routines that grow with your child.",
            cta_primary_text: "Download the app",
            cta_secondary_text: "How Freshies works",
            layout: "split_left",
            visual_style: "layered_phones_parallax",
            background_theme: "peach"
        },
        // 2. Problem Framing
        {
            component: "content_section",
            headline: "Skincare shouldn’t be confusing or stressful.",
            body: "Kids and teens are exposed to more skincare products than ever. Ingredients lists are hard to read, trends change fast, and it’s not always clear what’s actually safe for developing skin. Parents want clarity. Kids want independence. Freshies is built to support both.",
            layout: "center_text",
            background_color: "neutral",
            visual_element: "none"
        },
        // 3. Feature Overview (Interactive Grid with Preview on Top)
        {
            component: "interactive_feature_showcase",
            headline: "Everything you need to build healthy habits.",
            layout: "preview_top",
            background_color: "dark",
            features: [
                {
                    component: "feature_tab_item",
                    tab_icon: "scan",
                    tab_title: "Product Scanning",
                    tab_description: "Instant safety scores and clear ingredient breakdowns.",
                    headline: "Know what's safe instantly.",
                    body: "Scan any barcode to see a simple 0-100 safety score. We flag harsh chemicals and allergens so you can shop with confidence.",
                    visual_style: "scan_demo",
                    cta_text: "Try scanning"
                },
                {
                    component: "feature_tab_item",
                    tab_icon: "sparkles",
                    tab_title: "Daily Routines",
                    tab_description: "Simple AM/PM streaks for building independence.",
                    headline: "Habits that stick.",
                    body: "Create custom routines that grow with your child. Gamified streaks make consistency fun, not a chore.",
                    visual_style: "routine_checklist",
                    cta_text: "Build a routine"
                },
                {
                    component: "feature_tab_item",
                    tab_icon: "book",
                    tab_title: "Learning",
                    tab_description: "Bite-sized guides for parents and kids.",
                    headline: "Learn together.",
                    body: "From 'What is Retinol?' to understanding skin types, our library helps you navigate the skincare world safely.",
                    visual_style: "floating_icons",
                    cta_text: "Start learning"
                },
                {
                    component: "feature_tab_item",
                    tab_icon: "library",
                    tab_title: "Family Shelf",
                    tab_description: "Manage products for the whole household.",
                    headline: "One shelf, everyone's favorites.",
                    body: "Keep track of who uses what. Avoid duplicate buys and monitor expiration dates easily.",
                    visual_style: "image", // Fallback to image for shelf if specific component not available inside this block nesting yet, or use generic
                    cta_text: "Organize shelf"
                }
            ]
        },
        // 4. Feature 1 - Scanning (Deep Dive)
        {
            component: "content_section",
            eyebrow: "Product Scanning",
            headline: "Scan products and understand what’s safe.",
            body: "Freshies lets parents and kids scan skincare products to see a clear safety score and ingredient breakdown. It helps families understand what’s generally safe, and what may not be right for a specific child.",
            key_points: [
                { component: "simple_text_item", text: "Scan barcodes or labels" },
                { component: "simple_text_item", text: "Clear 0–100 safety score" },
                { component: "simple_text_item", text: "Colour coded risk indicators" },
                { component: "simple_text_item", text: "Ingredient explanations in plain language" }
            ],
            layout: "split_left", // Visual on right, text left
            visual_element: "scan_demo",
            background_color: "white"
        },
        // 5. Feature 2 - Routines
        {
            component: "content_section",
            eyebrow: "Routines",
            headline: "Build healthy skincare habits together.",
            body: "Freshies helps kids and teens build simple morning and night routines using products that are right for them. Parents can guide and check in, while kids build independence and confidence.",
            key_points: [
                { component: "simple_text_item", text: "Short, age appropriate routines" },
                { component: "simple_text_item", text: "Morning and night steps" },
                { component: "simple_text_item", text: "Visual progress and streaks" },
                { component: "simple_text_item", text: "Encourages consistency, not perfection" }
            ],
            layout: "right_text_left_image", // Visual left
            visual_element: "routine_checklist",
            background_color: "neutral" // soft bg
        },
        // 6. Feature 3 - Learning
        {
            component: "content_section",
            eyebrow: "Education",
            headline: "Learn what ingredients really mean.",
            body: "Freshies includes a learning space where parents and kids can explore skincare topics together. From ingredient basics to trend explainers, everything is written in clear, friendly language.",
            key_points: [
                { component: "simple_text_item", text: "Ingredient explainers" },
                { component: "simple_text_item", text: "Guides for kids and parents" },
                { component: "simple_text_item", text: "Linked directly from scans" }
            ],
            layout: "split_left",
            visual_element: "floating_icons",
            background_color: "white"
        },
        // 7. Feature 4 - Shelf
        {
            component: "content_section",
            eyebrow: "Family Shelf",
            headline: "Keep track of what your family uses.",
            body: "Freshies keeps a record of the skincare products in your home, linked to the kids who use them. This helps families make better choices over time and avoid confusion or duplication.",
            key_points: [
                { component: "simple_text_item", text: "Products linked to each child" },
                { component: "simple_text_item", text: "Easy to add to routines" },
                { component: "simple_text_item", text: "See favourites and unused items" }
            ],
            layout: "right_text_left_image",
            visual_element: "shelf_display",
            background_color: "neutral"
        },
        // 8. Kids Journey
        {
            component: "content_section",
            eyebrow: "For Kids & Teens",
            headline: "Your skincare journey, your way.",
            body: "Freshies helps kids and teens take ownership of their skincare journey. Track progress, earn small wins, and build habits that feel positive and empowering.",
            layout: "center_text",
            visual_element: "none", // Maybe add badges later
            background_color: "dark" // Change pace
        },
        // 9. Trust
        {
            component: "content_section",
            headline: "Built with care.",
            body: "Designed to support families, not replace professional advice. Privacy and child safety first. No public social feeds or comparison pressure.",
            layout: "center_text",
            background_color: "white",
            visual_element: "none"
        },
        // 10. Final CTA
        {
            component: "cta_section",
            headline: "Ready to make skincare simpler for your family?",
            cta_text: "Download Freshies",
            background_style: "gradient"
        }
    ]
};

async function seed() {
    console.log("🌱 Seeding Home-Alt-2...");
    try {
        await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "Home Alt 2",
                slug: "home-alt-2",
                content: homeAlt2Content,
                path: "home-alt-2",
            }
        });
        console.log("✅ Created 'Home Alt 2' story successfully!");
    } catch (e) {
        console.log("Creation failed, trying update...");
        try {
            // If duplicate slug exists, try deleting first to ensure clean state given previous issues
            const stories = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: "home-alt-2" });
            if (stories.data.stories.length > 0) {
                console.log("🗑️ Deleting existing...");
                await Storyblok.delete(`spaces/${SPACE_ID}/stories/${stories.data.stories[0].id}`);

                // Re-create
                await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                    story: {
                        name: "Home Alt 2",
                        slug: "home-alt-2",
                        content: homeAlt2Content,
                        path: "home-alt-2",
                    }
                });
                console.log("✅ Re-created 'Home Alt 2' story!");
            }
        } catch (innerE) {
            console.error("❌ Failed:", innerE.response?.data || innerE);
        }
    }
}

seed();
