import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const guides = [
    {
        name: "Building a Routine for Kids",
        slug: "building-routine-kids",
        content: {
            component: "guide_page",
            title: "Building a Simple Skincare Routine for Kids",
            excerpt: "How to introduce healthy habits without making it a chore or a battle.",
            read_time: "5 min read",
            audience: "Parents",
            topic: "Routines",
            intro: "Start small. Consistency beats intensity every time when it comes to young skin.",
            body: [
                { component: "simple_text_section", headline: "Step 1: Cleanse", text: "Use a gentle cleanser at night to wash away the day's grime and sunscreen." },
                { component: "simple_text_section", headline: "Step 2: Moisturise", text: "Hydrate immediately after washing while skin is still damp to lock in moisture." },
                { component: "simple_text_section", headline: "Step 3: Protect", text: "Sunscreen every morning. No arguments." }
            ]
        }
    },
    {
        name: "Sun Safety 101",
        slug: "sun-safety-101",
        content: {
            component: "guide_page",
            title: "Sun Safety 101: Beyond just SPF",
            excerpt: "Hats, shade, and timing are just as important as the cream in the tube.",
            read_time: "4 min read",
            audience: "Both",
            topic: "Sun Care",
            intro: "The sun is fun, but UV damage adds up over a lifetime. Here is how to enjoy the outdoors safely.",
            body: [
                { component: "simple_text_section", headline: "The Shadow Rule", text: "If your shadow is shorter than you, the UV is high. Seek shade." },
                { component: "simple_text_section", headline: "Reapplication", text: "Every 2 hours. Set a timer on your phone so you do not forget." }
            ]
        }
    },
    {
        name: "Teen Skin Myths",
        slug: "teen-skin-myths",
        content: {
            component: "guide_page",
            title: "Top 5 Teen Skin Myths Debunked",
            excerpt: "Does chocolate cause acne? Do you need to scrub hard to get clean? We bust the myths.",
            read_time: "6 min read",
            audience: "Teens",
            topic: "Habits",
            intro: "There is a lot of bad advice on TikTok. Let's set the record straight with science.",
            body: [
                { component: "simple_text_section", headline: "Myth: Toothpaste zaps zits", text: "Fact: It just burns your skin and makes redness worse." },
                { component: "simple_text_section", headline: "Myth: Scrubbing clears pores", text: "Fact: Scrubbing inflames acne. Gentle chemical exfoliation is better." }
            ]
        }
    }
];

async function seed() {
    console.log("🌱 Seeding Guides...");
    try {
        // 1. Create or Find Folder
        let folderId;
        console.log("Checking for 'guides' folder...");
        const folders = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: "guides" });

        if (folders.data.stories.length > 0) {
            console.log("📂 'guides' folder exists (ID: " + folders.data.stories[0].id + ")");
            folderId = folders.data.stories[0].id;
        } else {
            console.log("📂 Creating 'guides' folder...");
            const folder = await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                story: {
                    name: "Guides",
                    slug: "guides",
                    is_folder: true,
                    full_slug: "learn/guides", // Attempt to nest URL
                    content: { component: "folder_config" }
                }
            });
            folderId = folder.data.story.id;
            console.log(`✅ Created folder ID: ${folderId}`);
        }

        // 2. Create Guides
        for (const guide of guides) {
            console.log(`Processing ${guide.name}...`);
            try {
                await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                    story: {
                        name: guide.name,
                        slug: guide.slug,
                        parent_id: folderId,
                        content: guide.content
                    }
                });
                console.log(`✅ Created ${guide.name}`);
            } catch (e) {
                console.log(`⚠️ Skiping ${guide.name} (probably exists) or updating...`);
                // Simplified update logic could go here
            }
        }

    } catch (e) {
        console.error("❌ Fatal Error:", e);
    }
}

seed();
