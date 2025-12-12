import StoryblokClient from "storyblok-js-client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

// Component Definitions
const components = [
    {
        name: "home_hero",
        display_name: "Home Hero",
        schema: {
            eyebrow: { type: "text" },
            headline_part_1: { type: "text" },
            headline_gradient: { type: "text" },
            headline_part_2: { type: "text" },
            subheadline: { type: "textarea" },
        },
    },
    {
        name: "home_how_it_works",
        display_name: "Home How It Works",
        schema: {
            headline: { type: "text" },
            subheadline: { type: "textarea" },
            steps: {
                type: "bloks",
                component_whitelist: ["home_step_card"],
            }
        },
    },
    {
        name: "home_step_card",
        display_name: "Home Step Card",
        is_nestable: true,
        schema: {
            icon: {
                type: "option",
                options: [
                    { name: "Scan", value: "Scan" },
                    { name: "ClipboardCheck", value: "ClipboardCheck" },
                    { name: "Sparkles", value: "Sparkles" }
                ]
            },
            title: { type: "text" },
            description: { type: "textarea" },
            color: { type: "text" }
        }
    },
    {
        name: "home_audience_split",
        display_name: "Home Audience Split",
        schema: {
            parents_title: { type: "text" },
            parents_bullets: {
                type: "bloks",
                component_whitelist: ["bullet_point"]
            },
            parents_cta_text: { type: "text" },
            teens_title: { type: "text" },
            teens_bullets: {
                type: "bloks",
                component_whitelist: ["bullet_point"]
            },
            teens_cta_text: { type: "text" },
        },
    },
    {
        name: "bullet_point",
        display_name: "Bullet Point",
        is_nestable: true,
        schema: {
            text: { type: "text" }
        }
    },
    {
        name: "home_ingredient_safety",
        display_name: "Home Ingredient Safety",
        schema: {
            eyebrow: { type: "text" },
            headline_part_1: { type: "text" },
            headline_highlight: { type: "text" },
            body: { type: "textarea" },
        },
    },
    {
        name: "home_feature_highlights",
        display_name: "Home Feature Highlights",
        schema: {
            headline: { type: "text" },
            subheadline: { type: "textarea" },
        },
    },
    {
        name: "home_mission",
        display_name: "Home Mission",
        schema: {
            title: { type: "text" },
            mission_statement: { type: "textarea" },
            testimonials: {
                type: "bloks",
                component_whitelist: ["home_testimonial"]
            }
        },
    },
    {
        name: "home_testimonial",
        display_name: "Home Testimonial",
        is_nestable: true,
        schema: {
            quote: { type: "textarea" },
            author: { type: "text" },
            author_title: { type: "text" }
        }
    },
    {
        name: "home_final_cta",
        display_name: "Home Final CTA",
        schema: {
            headline: { type: "text" },
            subheadline: { type: "textarea" },
            cta_text: { type: "text" }
        },
    },
];

// Content
const homePageContent = {
    component: "page",
    body: [
        {
            component: "home_hero",
            eyebrow: "Skincare made for you",
            headline_part_1: "Your family's journey to",
            headline_gradient: "healthier, glowing skin",
            headline_part_2: "starts here.",
            subheadline: "Scan products instantly, build personalized routines, and learn about ingredients with the app designed for modern families."
        },
        {
            component: "home_how_it_works",
            headline: "How Freshies Works",
            subheadline: "Three simple steps to safer, happier skin for your family.",
            steps: [
                { component: "home_step_card", icon: "Scan", title: "Scan a Product", description: "Use your camera to instantly scan skincare ingredients.", color: "text-ultraviolet" },
                { component: "home_step_card", icon: "ClipboardCheck", title: "Get Your Score", description: "See a clear 0-100 safety score and risk analysis.", color: "text-mint" },
                { component: "home_step_card", icon: "Sparkles", title: "Build Your Routine", description: "Add safe products to your daily morning and night routine.", color: "text-peach" }
            ]
        },
        {
            component: "home_audience_split",
            parents_title: "For Parents",
            parents_cta_text: "Parent Features",
            parents_bullets: [
                { component: "bullet_point", text: "Understand exactly what's in your child's products" },
                { component: "bullet_point", text: "Protect young skin from irritants and harsh chemicals" },
                { component: "bullet_point", text: "Monitor routines and build healthy habits together" }
            ],
            teens_title: "For Teens",
            teens_cta_text: "Teen Features",
            teens_bullets: [
                { component: "bullet_point", text: "Build your own streak and earn badges" },
                { component: "bullet_point", text: "Find products that actually work for your skin" },
                { component: "bullet_point", text: "Simple routines that take less than 5 minutes" }
            ]
        },
        {
            component: "home_ingredient_safety",
            eyebrow: "Safety First",
            headline_part_1: "Know what's safe in",
            headline_highlight: "seconds",
            body: "No more guessing. Freshies uses advanced AI to analyze ingredient lists instantly, giving you a clear 0-100 score and highlighting potential irritants or risks."
        },
        {
            component: "home_feature_highlights",
            headline: "More than just scanning",
            subheadline: "Build healthy habits and manage better choices for the whole family."
        },
        {
            component: "home_mission",
            title: "Our Mission",
            mission_statement: "Freshies was built to bridge the gap between scientific safety and teenage fun. We believe every family deserves to navigate the skincare world with confidence, clarity, and a little bit of sparkle.",
            testimonials: [
                { component: "home_testimonial", quote: "Finally, an app that explains ingredients in a way my 13-year-old actually cares about. The scanning is a game changer.", author: "Sarah J.", author_title: "Mom of two" },
                { component: "home_testimonial", quote: "I love checking my streak! And my skin has actually cleared up since I stopped using random TikTok products.", author: "Mia", author_title: "Age 14" },
                { component: "home_testimonial", quote: "The safety scores are so easy to understand. It takes the stress out of shopping for skincare.", author: "David L.", author_title: "Dad" },
            ]
        },
        {
            component: "home_final_cta",
            headline: "Ready to start your journey?",
            subheadline: "Join thousands of families making safer, smarter skincare choices today.",
            cta_text: "Download Now"
        }
    ]
};

async function seed() {
    try {
        console.log("Authenticating...");
        // 1. Set Space ID
        const spaceId = 289085951461266;
        console.log(`Using Space ID: ${spaceId}`);

        // 2. Create/Update Components
        for (const comp of components) {
            try {
                await Storyblok.post(`spaces/${spaceId}/components`, { component: comp });
                console.log(`Created component: ${comp.name}`);
            } catch (e) {
                console.log(`Component ${comp.name} likely exists`);
            }
        }

        // 3. Update 'home' page
        const stories = await Storyblok.get(`spaces/${spaceId}/stories`, { with_slug: "home" });
        if (stories.data.stories.length > 0) {
            const story = stories.data.stories[0];
            await Storyblok.put(`spaces/${spaceId}/stories/${story.id}`, {
                story: { ...story, content: homePageContent }
            });
            console.log("✅ Updated Home page content!");
        } else {
            console.log("❌ Home page not found (unexpected)!");
        }

    } catch (error) {
        console.error("Seeding failed:", error);
    }
}

seed();
