import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const learnContent = {
    component: "page",
    body: [
        {
            component: "learn_hero",
            eyebrow: "Knowledge Hub",
            headline: "Learn about skincare, without the confusion.",
            subheadline: "Freshies Learn helps parents and kids understand ingredients, products and skincare habits in clear, friendly language. No jargon. No fear. Just the facts you need.",
            cta_primary_text: "Explore Learn",
            cta_secondary_text: "Get full access in the app",
            background_words: [
                { component: "simple_text_item", text: "Squalane" },
                { component: "simple_text_item", text: "Ceramides" },
                { component: "simple_text_item", text: "Zinc" },
                { component: "simple_text_item", text: "SPF" },
                { component: "simple_text_item", text: "Glycerin" }
            ]
        },
        {
            component: "learn_categories",
            headline: "What you will find in Learn",
            subheadline: "Expert-backed knowledge organized to help you find exactly what you need.",
            pillars: [
                {
                    component: "learn_category_item",
                    title: "Ingredients explained",
                    description: "Plain-language breakdowns of common skincare ingredients, what they do, and when to be cautious for kids’ skin.",
                    icon_name: "BookOpen", // Mapping in component
                    color_theme: "blue",
                    article_links: [
                        { component: "simple_text_item", text: "What is Hyaluronic Acid?" },
                        { component: "simple_text_item", text: "Is Fragrance safe?" },
                        { component: "simple_text_item", text: "Understanding Preservatives" }
                    ]
                },
                {
                    component: "learn_category_item",
                    title: "Product guidance",
                    description: "How to think about cleansers, moisturisers, sunscreen and treatments for different ages and needs.",
                    icon_name: "Sparkles",
                    color_theme: "purple",
                    article_links: [
                        { component: "simple_text_item", text: "First Cleanser Guide" },
                        { component: "simple_text_item", text: "Sunscreen 101" },
                        { component: "simple_text_item", text: "Moisturiser types" }
                    ]
                },
                {
                    component: "learn_category_item",
                    title: "Healthy habits",
                    description: "Articles about routines, consistency, sun safety, and building good habits without pressure.",
                    icon_name: "Heart",
                    color_theme: "mint",
                    article_links: [
                        { component: "simple_text_item", text: "Building a Routine" },
                        { component: "simple_text_item", text: "Sun Safety Rules" },
                        { component: "simple_text_item", text: "Consistency is Key" }
                    ]
                },
                {
                    component: "learn_category_item",
                    title: "Trends and questions",
                    description: "Clear explanations of popular skincare trends, viral products and questions kids are seeing online.",
                    icon_name: "Zap",
                    color_theme: "peach",
                    article_links: [
                        { component: "simple_text_item", text: "Viral Trends Debunked" },
                        { component: "simple_text_item", text: "Teen Skin Myths" },
                        { component: "simple_text_item", text: "Social Media Pressure" }
                    ]
                }
            ]
        },
        {
            component: "learn_featured",
            headline: "Featured Articles",
            subheadline: "Free guides to get you started.",
            articles: [
                {
                    component: "learn_article_card",
                    title: "What does fragrance free actually mean?",
                    excerpt: "Understanding the difference between unscented and fragrance-free is key for sensitive skin.",
                    read_time: "3 min read",
                    tag: "Ingredient",
                },
                {
                    component: "learn_article_card",
                    title: "Do kids really need skincare?",
                    excerpt: "A dermatologist's perspective on when to start and what is actually necessary.",
                    read_time: "5 min read",
                    tag: "Guide",
                },
                {
                    component: "learn_article_card",
                    title: "How to read a sunscreen label",
                    excerpt: "SPF, broad spectrum, mineral vs chemical? We decode the jargon.",
                    read_time: "4 min read",
                    tag: "Habit",
                },
                {
                    component: "learn_article_card",
                    title: "Why less is often more for young skin",
                    excerpt: "Complex routines can damage young skin barriers. Here is why simple wins.",
                    read_time: "3 min read",
                    tag: "Guide",
                }
            ]
        },
        {
            component: "learn_ingredients",
            headline: "Ingredients, explained simply",
            subheadline: "Learn breaks down individual ingredients so you know what they do and why they appear in products.",
            ingredients: [
                {
                    component: "learn_ingredient_item",
                    name: "Fragrance",
                    description: "Added scent that can cause allergies.",
                    status: "caution"
                },
                {
                    component: "learn_ingredient_item",
                    name: "Niacinamide",
                    description: "Vitamin B3, soothes and strengthens.",
                    status: "safe"
                },
                {
                    component: "learn_ingredient_item",
                    name: "Salicylic Acid",
                    description: "Exfoliant for acne. Use with care.",
                    status: "depends"
                },
                {
                    component: "learn_ingredient_item",
                    name: "Zinc Oxide",
                    description: "Safe UV filter for sensitive skin.",
                    status: "safe"
                }
            ]
        },
        {
            component: "learn_app_connect",
            headline: "Learn works hand-in-hand with the app",
            subheadline: "We have designed Learn to be there exactly when you need it—whether you are in the aisle or at home.",
            steps: [
                {
                    component: "learn_step_item",
                    number: "1",
                    title: "Scan",
                    description: "Scan a product barcode in store to see its safety score instantly.",
                    icon_name: "ScanLine"
                },
                {
                    component: "learn_step_item",
                    number: "2",
                    title: "Learn",
                    description: "Tap on any ingredient in the scan result to read its Learn profile.",
                    icon_name: "BookOpen"
                },
                {
                    component: "learn_step_item",
                    number: "3",
                    title: "Decide",
                    description: "Make confident choices and explain them to your kids using Learn.",
                    icon_name: "Smile"
                }
            ]
        },
        {
            component: "learn_cta",
            headline: "Want full access to Learn?",
            subheadline: "You can explore a selection of Learn articles for free. To unlock the full ingredient library, product guides and personalised recommendations, you will need to create an account.",
            cta_primary_text: "Create a free account",
            cta_secondary_text: "Continue in the app"
        },
        {
            component: "learn_trust",
            items: [
                { component: "learn_trust_item", text: "Written for families, not influencers", icon_name: "ShieldCheck" },
                { component: "learn_trust_item", text: "Focused on developing skin", icon_name: "Check" },
                { component: "learn_trust_item", text: "Not medical advice, but informed guidance", icon_name: "Check" }
            ]
        }
    ]
};

async function seed() {
    console.log("🌱 Seeding Learn Page...");
    try {
        await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "Learn",
                slug: "learn",
                content: learnContent,
                path: "learn",
            }
        });
        console.log("✅ Created 'Learn' story successfully!");
    } catch (e) {
        console.log("Creation failed, trying update...");
        try {
            // Delete if exists to ensure clean slate with new components
            const stories = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: "learn" });
            if (stories.data.stories.length > 0) {
                console.log("🗑️ Deleting existing...");
                await Storyblok.delete(`spaces/${SPACE_ID}/stories/${stories.data.stories[0].id}`);

                // Re-create
                await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                    story: {
                        name: "Learn",
                        slug: "learn",
                        content: learnContent,
                        path: "learn",
                    }
                });
                console.log("✅ Re-created 'Learn' story!");
            }
        } catch (innerE) {
            console.error("❌ Failed:", innerE.response?.data || innerE);
        }
    }
}

seed();
