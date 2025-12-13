import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const partnersContent = {
    component: "page",
    body: [
        // 1. Hero
        {
            component: "hero_section",
            eyebrow: "For Brands",
            headline: "Build trust with the next generation.",
            subheadline: "Join the Freshies Verified program to showcase your safety standards to thousands of health-conscious families.",
            cta_primary_text: "Become a Partner",
            cta_secondary_text: "View Requirements",
            layout: "center_text",
            visual_style: "simple",
            background_theme: "peach"
        },
        // 2. Stats
        {
            component: "stats_section",
            stats: [
                { component: "stat_item", number: "15k+", label: "Active Families" },
                { component: "stat_item", number: "500k+", label: "Product Scans" },
                { component: "stat_item", number: "92%", label: "Switch Brands after Scan" },
                { component: "stat_item", number: "4.9/5", label: "Trust Score" }
            ]
        },
        // 3. Benefits / Why Verify?
        {
            component: "content_section",
            eyebrow: "Why Partner?",
            headline: "Transparency wins loyalty.",
            body: "Modern parents and teens don't just trust marketing claims—they verify them. By becoming a Freshies Verified Partner, you prove your commitment to safety and transparency where it matters most: right at the moment of decision.",
            layout: "split_left",
            visual_style: "simple", // Using standard for now
            background_color: "white"
        },
        // 4. Process
        {
            component: "process_timeline",
            eyebrow: "How it works",
            headline: "Get verified in 4 steps.",
            steps: [
                {
                    component: "process_step",
                    title: "Submit Ingredients",
                    description: "Send us your full INCI lists and safety documentation for review by our toxicology team."
                },
                {
                    component: "process_step",
                    title: "Safety Analysis",
                    description: "We check every ingredient against our database of 3,000+ known allergens and irritants."
                },
                {
                    component: "process_step",
                    title: "Brand Verification",
                    description: "Once approved, you earn the Freshies Verified badge for your product packaging and profile."
                }
            ]
        },
        // 5. Pricing
        {
            component: "pricing_table",
            headline: "Partnership Tiers",
            subheadline: "Choose the plan that fits your brand's scale.",
            tiers: [
                {
                    component: "pricing_tier",
                    name: "Listed",
                    price: "Free",
                    description: "Ensure your products are accurately represented in our database.",
                    cta_text: "Submit Profile",
                    is_featured: false,
                    features: [
                        { component: "pricing_feature", text: "Basic Product Listing", included: true },
                        { component: "pricing_feature", text: "Ingredient Accuracy Check", included: true },
                        { component: "pricing_feature", text: "Verified Badge", included: false },
                        { component: "pricing_feature", text: "Brand Analytics", included: false }
                    ]
                },
                {
                    component: "pricing_tier",
                    name: "Verified Partner",
                    price: "$299",
                    period: "year / sku",
                    description: "Build trust with the official Verified Badge and detailed safety breakdowns.",
                    cta_text: "Get Verified",
                    is_featured: true,
                    features: [
                        { component: "pricing_feature", text: "Enhanced Product Card", included: true },
                        { component: "pricing_feature", text: "Verified Badge", included: true },
                        { component: "pricing_feature", text: "priority Search Ranking", included: true },
                        { component: "pricing_feature", text: "Monthly Insights Report", included: true },
                        { component: "pricing_feature", text: "Direct Purchase Links", included: true }
                    ]
                },
                {
                    component: "pricing_tier",
                    name: "Enterprise",
                    price: "Custom",
                    description: "For large portfolios and co-marketing campaigns.",
                    cta_text: "Contact Us",
                    is_featured: false,
                    features: [
                        { component: "pricing_feature", text: "Unlimited SKUs", included: true },
                        { component: "pricing_feature", text: "Custom Educational Content", included: true },
                        { component: "pricing_feature", text: "Homepage Feature Spot", included: true },
                        { component: "pricing_feature", text: "Dedicated Success Manager", included: true }
                    ]
                }
            ]
        },
        // 6. Testimonials
        {
            component: "testimonial_carousel",
            testimonials: [
                {
                    component: "testimonial_item",
                    quote: "Since verifying with Freshies, we've seen a 40% increase in trust perception among parents of teens. It's the new standard.",
                    name: "Sarah Chen",
                    role: "Founder, GlowKids"
                },
                {
                    component: "testimonial_item",
                    quote: "The transparency Freshies demands actually helped us refine our formulas. Now we wear the badge with pride.",
                    name: "Marcus O'Reilly",
                    role: "Product Director, PureTeen"
                },
                {
                    component: "testimonial_item",
                    quote: "Our customers were scanning our bottles in stores anyway—becoming a partner just meant we could control the narrative.",
                    name: "Amara Singh",
                    role: "CMO, Botanical Basics"
                }
            ]
        },
        // 7. FAQ (reusing Content Section for now or simple CTA)
        {
            component: "cta_section",
            headline: "Ready to join the movement?",
            cta_text: "Start Application",
            background_style: "gradient"
        }
    ]
};

async function seed() {
    console.log("🌱 Seeding Partners Page...");
    try {
        await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
            story: {
                name: "Partners",
                slug: "partners",
                content: partnersContent,
                path: "partners",
            }
        });
        console.log("✅ Created 'Partners' story successfully!");
    } catch (e) {
        console.log("Creation failed, trying update...");
        try {
            // Delete if exists to ensure clean slate with new components
            const stories = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: "partners" });
            if (stories.data.stories.length > 0) {
                console.log("🗑️ Deleting existing...");
                await Storyblok.delete(`spaces/${SPACE_ID}/stories/${stories.data.stories[0].id}`);

                // Re-create
                await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                    story: {
                        name: "Partners",
                        slug: "partners",
                        content: partnersContent,
                        path: "partners",
                    }
                });
                console.log("✅ Re-created 'Partners' story!");
            }
        } catch (innerE) {
            console.error("❌ Failed:", innerE.response?.data || innerE);
        }
    }
}

seed();
