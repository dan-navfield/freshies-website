import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const aboutContent = {
    component: "page",
    body: [
        // 1. Hero
        {
            component: "hero_section",
            eyebrow: "Our Story",
            headline: "Built by parents, designed for kids.",
            subheadline: "Freshies was created from a simple question asked at a kitchen table. It’s not just an app—it’s a tool for growing up.",
            cta_primary_text: "Read our Principles",
            cta_secondary_text: null,
            layout: "center_text",
            visual_style: "simple",
            background_theme: "peach"
        },
        // 2. Origin Story
        {
            component: "content_section",
            eyebrow: "The Beginning",
            headline: "Freshies started at home.",
            body: "Dan runs Hide and Seek Digital, a boutique Australian digital consultancy. Together with Lil, he is raising their daughter Ruby, who is 11. Like many kids her age, Ruby is curious about skincare. As parents, Dan and Lil wanted to support that curiosity while still making informed choices. That turned out to be harder than expected.",
            layout: "split_left",
            visual_element: "none", // Placeholder for family photo
            background_color: "white"
        },
        // 3. The Challenge (Problem Statement)
        {
            component: "content_section",
            headline: "A clearer way to navigate skincare.",
            body: "We couldn't find a tool that answered basic questions: Is this safe? Is it appropriate for an 11-year-old? Advice online was inconsistent. So we decided to build something better. A tool built by parents, effectively designed for kids.",
            layout: "center_text",
            background_color: "neutral",
            visual_element: "none"
        },
        // 4. Values (New Vibrant Section)
        {
            component: "values_section",
            headline: "Clarity, context, and confidence.",
            subheadline: "Freshies treats skincare as something to learn, not something to hide or rush into. It is not about banning products or pushing perfection.",
            values: [
                {
                    component: "value_item",
                    icon: "sun",
                    title: "For Kids",
                    description: "Playful, visual, and empowering. Use tools that feel like they were built for you, not your parents."
                },
                {
                    component: "value_item",
                    icon: "shield",
                    title: "For Parents",
                    description: "Structured, transparent, and grounded in safety. Understand what is in products and why it matters."
                },
                {
                    component: "value_item",
                    icon: "heart",
                    title: "For Families",
                    description: "Create shared conversations. Support age-appropriate routines and choices as kids grow."
                }
            ]
        },
        // 5. Closing Mission
        {
            component: "cta_section",
            headline: "Because curiosity is normal.",
            subheadline: "And kids deserve tools that are built with them in mind.",
            cta_text: "Join Freshies",
            background_style: "gradient"
        }
    ]
};

async function seed() {
    console.log("🌱 Seeding About Page...");
    try {
        // Check and delete existing to ensure clean slate
        const stories = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: "about" });
        if (stories.data.stories.length > 0) {
            console.log("🗑️ Deleting existing 'About' story...");
            await Storyblok.delete(`spaces/${SPACE_ID}/stories/${stories.data.stories[0].id}`);
        }

        await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "About",
                slug: "about",
                content: aboutContent,
                path: "about",
            }
        });
        console.log("✅ Created 'About' story successfully!");
    } catch (e) {
        console.error("❌ Failed:", e.response?.data || e.message);
    }
}

seed();
