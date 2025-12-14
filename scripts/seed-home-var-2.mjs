import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const homeAlt2Content = {
    component: "page",
    body: [
        // 1. Concept 2 Hero
        {
            component: "concept_2_hero",
            eyebrow: "Skincare made for families",
            headline: "Smarter skincare choices, made together.",
            subheadline: "Think routines, not battles. Build healthy habits, scan products for safety, and learn together.",
            cta_primary_text: "Get Freshies",
            cta_secondary_text: "Learn More",
        },
        // 2. Feature Marquee (No fields needed, hardcoded in component for now, or added as empty block)
        {
            component: "feature_marquee"
        },
        // 3. Problem Framing (with Mint background)
        {
            component: "problem_framing", // mapped to ProblemFraming.tsx
            headline: "Skincare shouldn’t feel confusing or stressful.",
            body: "Kids and teenagers are exposed to more skincare products than ever before. Ingredient lists are hard to read, trends change fast, and it’s not always clear what’s actually safe for young, developing skin.",
            highlight_1: "Parents want clarity and confidence.",
            highlight_2: "Kids want independence and understanding.",
            footer_text: "Freshies was created to support both, with clear guidance, friendly education and tools that help families make decisions together.",
            background_color: "mint"
        },
        // 4. Feature Overview (Grid)
        {
            component: "feature_overview",
            headline: "Everything you need to make better skincare choices.",
            intro_line: "Freshies brings safety, learning and habit-building together in one simple app."
        },
        // 5. Deep Dives (4 FeatureDeepDive blocks)
        // Scanning
        {
            component: "feature_deep_dive",
            label: "Scan and check",
            headline: "Scan products and understand what’s safe.",
            body: "Use your phone’s camera to scan skincare products at home or in store. Freshies breaks down long ingredient lists, highlights potential concerns, and shows a clear 0–100 safety score to help guide decisions.",
            bullets: "Scan barcodes or product labels\nClear safety score out of 100\nSimple colour cues to highlight risk\nIngredient explanations in plain language",
            supporting_line: "No guessing in the chemist aisle. No decoding tiny labels at home.",
            image: { filename: "/images/home-hero2.png", alt: "Scanning demo" },
            is_reversed: false
        },
        // Routines
        {
            component: "feature_deep_dive",
            label: "Daily habits",
            headline: "Build healthy skincare routines that stick.",
            body: "Freshies helps families turn safe products into simple daily routines. Designed for school mornings, sport, sleepovers and busy family life, routines are short, achievable and age-appropriate.",
            bullets: "Morning and night routines\nSteps linked to products on your shelf\nVisual progress kids can follow\nEncourages consistency, not perfection",
            micro_copy: "Tick it off, keep your streak going, and you’re done.",
            image: { filename: "/images/routine-list.png", alt: "Routine demo" },
            is_reversed: true
        },
        // Learning
        {
            component: "feature_deep_dive",
            label: "Learn",
            headline: "Learn what ingredients really mean.",
            body: "Freshies Learn helps parents and kids understand skincare without the jargon. From ingredient basics to common questions and trends, content is written in clear, friendly language for families to explore together.",
            bullets: "Ingredient explainers\nProduct guidance by age and need\nHealthy skincare habit guides\nCalm explanations of trends kids are seeing online",
            supporting_line: "No fear. No judgement. Just the facts you need.",
            image: { filename: "/images/welcome-ruby.png", alt: "Safety demo" },
            is_reversed: false
        },
        // Shelf
        {
            component: "feature_deep_dive",
            label: "Your shelf",
            headline: "Keep track of what your family uses.",
            body: "Your shelf is a simple way to see all the skincare products in your home, linked to the kids who use them. It helps families stay organised, avoid confusion, and make better choices over time.",
            bullets: "One place for all products at home\nProducts linked to each child\nEasy to add items to routines\nHelps avoid duplicates and unused products",
            micro_copy: "Your skincare setup, all in one place.",
            image: { filename: "/images/routine-detail.png", alt: "Shelf demo" },
            is_reversed: true
        },
        // 6. How It Works
        {
            component: "how_it_works",
            headline: "Designed to work together.",
            body: "Freshies connects scanning, learning and routines into one calm experience. Scan a product, understand what’s inside, and turn good choices into healthy habits your kids can build on."
        },
        // 7. Kids Journey
        {
            component: "kids_journey",
            headline: "Your skincare journey, your way.",
            body: "Freshies helps kids and teens take ownership of their skincare journey in a positive, supportive way. Track progress, build streaks, and learn what works for your skin without pressure or comparison."
        },
        // 8. Social Proof
        {
            component: "social_proof",
            headline: "Loved by families."
        },
        // 9. Trust
        {
            component: "trust_reassurance",
            headline: "Built with care."
        },
        // 10. Final CTA
        {
            component: "final_cta",
            headline: "Ready to make skincare simpler for your family?",
            body: "Join families using Freshies to make safer, smarter skincare choices together.",
            primary_cta: "Download the app",
            secondary_cta: "Explore Learn"
        }
    ]
};

async function seed() {
    console.log("🌱 Seeding Home-Alt-2 with Custom Components...");
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
            // If duplicate slug exists, we should update instead of delete/create to preserve ID if possible, 
            // but delete/create is cleaner for structure changes.
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
