import StoryblokClient from "storyblok-js-client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN, // Management Token
});

const SPACE_ID = 329068; // Replace with your actual Space ID if different, though script usually fetches it or it's in URL

// --- Component Schemas ---

const components = [
    {
        name: "feature_hero",
        display_name: "Feature Hero",
        schema: {
            eyebrow: { type: "text" },
            headline: { type: "text" },
            subheadline: { type: "textarea" },
            image: { type: "asset" },
            highlights: {
                type: "bloks",
                translatable: false,
                component_whitelist: ["feature_highlight"], // Helper component
            },
            cta_text: { type: "text" },
        },
    },
    {
        name: "feature_highlight",
        display_name: "Feature Highlight",
        is_nestable: true,
        schema: {
            text: { type: "text" },
            icon: {
                type: "option",
                options: [
                    { name: "Scan", value: "Scan" },
                    { name: "Shield", value: "ShieldCheck" },
                    { name: "List", value: "List" },
                    { name: "Home", value: "Home" },
                    { name: "Book", value: "BookOpen" },
                    { name: "Medal", value: "Medal" }
                ]
            }
        }
    },
    {
        name: "two_col_feature",
        display_name: "Two Col Feature",
        schema: {
            label: { type: "text" },
            headline: { type: "text" },
            body: { type: "textarea" },
            bullets: {
                type: "bloks",
                component_whitelist: ["feature_bullet"],
            },
            image_1: { type: "asset" },
            image_2: { type: "asset" },
            alignment: {
                type: "option",
                options: [
                    { name: "Left", value: "left" },
                    { name: "Right", value: "right" },
                ],
                default_value: "left",
            },
            background: {
                type: "option",
                options: [
                    { name: "White", value: "white" },
                    { name: "Cream", value: "cream" }
                ],
                default_value: "white"
            }
        },
    },
    {
        name: "feature_bullet",
        display_name: "Feature Bullet",
        is_nestable: true,
        schema: {
            text: { type: "text" }
        }
    },
    {
        name: "feature_scores",
        display_name: "Feature Scores",
        schema: {
            label: { type: "text" },
            headline: { type: "text" },
            body: { type: "textarea" },
        },
    },
    {
        name: "profile_showcase",
        display_name: "Profile Showcase",
        schema: {
            label: { type: "text" },
            headline: { type: "text" },
            body: { type: "textarea" },
        },
    },
    {
        name: "simple_text_section",
        display_name: "Simple Text Section",
        schema: {
            label: { type: "text" },
            headline: { type: "text" },
            body: { type: "textarea" },
            cta_text: { type: "text" },
            background: {
                type: "option",
                options: [
                    { name: "White", value: "white" },
                    { name: "Purple", value: "purple" }
                ],
                default_value: "white"
            }
        },
    },
];

// --- Page Content ---

const featuresPageContent = {
    component: "page",
    body: [
        {
            component: "feature_hero",
            eyebrow: "Features",
            headline: "Everything Freshies can do for your family.",
            subheadline: "From instant ingredient scanning to simple daily routines, Freshies brings all your kids’ skincare decisions into one clear, kid friendly app.",
            cta_text: "Download on iOS",
            highlights: [
                { component: "feature_highlight", text: "Scan any skincare product", icon: "Scan" },
                { component: "feature_highlight", text: "See simple 0–100 safety scores", icon: "ShieldCheck" },
                { component: "feature_highlight", text: "Build routines for each child", icon: "List" },
                { component: "feature_highlight", text: "Track what is actually in your home", icon: "Home" },
                { component: "feature_highlight", text: "Learn about ingredients", icon: "BookOpen" },
                { component: "feature_highlight", text: "Keep kids motivated", icon: "Medal" }
            ]
        },
        {
            component: "two_col_feature",
            label: "Scan & decode",
            headline: "Point, scan, and get the full story.",
            body: "Freshies turns your phone into an instant skincare decoder. Scan a barcode or front label and we will pull the ingredients, highlight potential irritants, and show you a simple, kid friendly summary.",
            alignment: "left",
            background: "white",
            bullets: [
                { component: "feature_bullet", text: "Works on most common skincare products" },
                { component: "feature_bullet", text: "Recognises both barcodes and product labels" },
                { component: "feature_bullet", text: "Highlights ingredients that need a second look" }
            ],
            // We can upload images later or use placeholders
        },
        {
            component: "feature_scores",
            label: "Safety scores",
            headline: "A simple 0–100 score that everyone can understand.",
            body: "Underneath Freshies is a detailed ingredient engine, but on screen you just see what matters - a clear score out of 100 and easy colour cues for risk."
        },
        {
            component: "two_col_feature",
            label: "Routines",
            headline: "Simple routines that actually fit your kids’ lives.",
            body: "Freshies helps you build realistic routines that kids can stick to. No ten step lists or complicated instructions - just clear steps that match school, sport and family time.",
            alignment: "right",
            background: "cream",
            bullets: [
                { component: "feature_bullet", text: "Morning and night routines for each child" },
                { component: "feature_bullet", text: "Steps linked to specific products" },
                { component: "feature_bullet", text: "Gentle reminders for school nights" }
            ]
        },
        {
            component: "simple_text_section",
            headline: "Know exactly what is on the bathroom shelf.",
            label: "My Cupboard",
            body: "Every time you scan a product, you can add it to your digital cupboard. Over time, Freshies becomes a live snapshot of what each child is using.",
            background: "purple",
            cta_text: "Get Organized"
        },
        {
            component: "profile_showcase",
            label: "Profiles",
            headline: "Personalised care for each child.",
            body: "No two kids have the same skin or routine. Freshies lets you create profiles for each child so you can tailor products, scores and reminders to what they actually need."
        },
        {
            component: "simple_text_section",
            headline: "Ready to put Freshies to work?",
            body: "Scan your first product, set up your kids’ profiles and start building healthier skincare habits today.",
            cta_text: "Download the App",
            background: "white"
        },
    ],
};

async function seed() {
    try {
        console.log("Authenticating with Storyblok...");
        // 1. Set Space ID (Extracted from URL/Screenshot)
        const spaceId = 289085951461266;
        console.log(`Using Space ID: ${spaceId}`);

        // 2. Create/Update Components
        for (const comp of components) {
            try {
                await Storyblok.post(`spaces/${spaceId}/components`, { component: comp });
                console.log(`Created component: ${comp.name}`);
            } catch (e) {
                // If exists, try update (PUT) or just skip
                console.log(`Component ${comp.name} likely exists or error:`, e.message);
            }
        }

        // 3. Update 'features' page
        // First find the story
        const stories = await Storyblok.get(`spaces/${spaceId}/stories`, { with_slug: "features" });
        if (stories.data.stories.length > 0) {
            const storyId = stories.data.stories[0].id;
            const story = stories.data.stories[0];

            await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
                story: {
                    ...story,
                    content: featuresPageContent
                }
            });
            console.log("Updated Features page content!");
        } else {
            console.log("Features page not found, creating...");
            await Storyblok.post(`spaces/${spaceId}/stories`, {
                story: {
                    name: "Features",
                    slug: "features",
                    content: featuresPageContent
                }
            });
            console.log("Created Features page!");
        }

        // 4. Update 'home' page content
        const homeStories = await Storyblok.get(`spaces/${spaceId}/stories`, { with_slug: "home" });
        if (homeStories.data.stories.length > 0) {
            const homeStoryId = homeStories.data.stories[0].id;
            const homeStory = homeStories.data.stories[0];

            // Ensure home story content has the required body structure
            const homeContent = {
                component: "page",
                body: [
                    {
                        component: "feature_hero",
                        eyebrow: "Welcome",
                        headline: "Welcome to Freshies",
                        subheadline: "The fun and safe skincare app for kids.",
                        cta_text: "Get Started",
                        highlights: [
                            { component: "feature_highlight", text: "Kid-friendly interface", icon: "Medal" },
                            { component: "feature_highlight", text: "Safe ingredient scanning", icon: "Scan" }
                        ]
                    }
                ]
            };

            if (!homeStory.content || !homeStory.content.body || homeStory.content.body.length === 0) {
                await Storyblok.put(`spaces/${spaceId}/stories/${homeStoryId}`, {
                    story: {
                        ...homeStory,
                        content: homeContent
                    }
                });
                console.log("Updated Home page content with default structure!");
            } else {
                console.log("Home page already has content, skipping update.");
            }
        }

    } catch (error) {
        console.error("Seeding failed:", error);
    }
}

seed();
