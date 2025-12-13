import dotenv from "dotenv";
import StoryblokClient from "storyblok-js-client";

dotenv.config({ path: ".env.local" });

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = "289085951461266";

const Storyblok = new StoryblokClient({ oauthToken: STORYBLOK_OAUTH_TOKEN });

const ingredients = [
    {
        name: "Ceramides",
        slug: "ceramides",
        content: {
            component: "ingredient_page", // This will map to our Next.js component
            summary: "The building blocks of a healthy skin barrier.",
            safety: "safe",
            what_is_it: "Ceramides are lipids (fat molecules) that are found naturally in high concentrations in the uppermost layers of skin. They make up over 50% of skin's composition, so they play a vital role in determining how your skin looks (and how it responds to threats).",
            why_used: "Think of your skin cells like bricks in a wall. Ceramides are the mortar that holds them together. They help hold skin together by forming a protective layer that limits moisture loss and protects against visible damage from pollution and other environmental stressors.",
            kids_skin: "Babies and children have naturally thinner skin barriers than adults. Ceramides are often used in baby products to support this developing barrier, especially for little ones prone to eczema or dry skin.",
            product_types: [
                { component: "simple_text_item", text: "Daily Moisturisers" },
                { component: "simple_text_item", text: "Healing Balms" },
                { component: "simple_text_item", text: "Gentle Cleansers" }
            ]
        }
    },
    {
        name: "Fragrance",
        slug: "fragrance",
        content: {
            component: "ingredient_page",
            summary: "Added scents that can smell nice but may irritate sensitive skin.",
            safety: "caution",
            what_is_it: "Fragrance (or parfum) is a catch-all term that can represent a mixture of dozens or even hundreds of individual chemicals used to give a product a specific scent.",
            why_used: "To make products smell appealing and mask the natural odor of other ingredients.",
            kids_skin: "Fragrance is one of the most common causes of Allergic Contact Dermatitis in children. Because kids' skin is thinner and more absorbent, they are more susceptible to reactions. We generally recommend avoiding synthetic fragrances for babies and young children.",
            product_types: [
                { component: "simple_text_item", text: "Bubble Baths" },
                { component: "simple_text_item", text: "Body Lotions" },
                { component: "simple_text_item", text: "Shampoos" }
            ]
        }
    },
    {
        name: "Salicylic Acid",
        slug: "salicylic-acid",
        content: {
            component: "ingredient_page",
            summary: "An oil-soluble exfoliant great for acne but strong for little ones.",
            safety: "depends",
            what_is_it: "A beta hydroxy acid (BHA) derived originally from willow bark.",
            why_used: "It dives deep into pores to clear out excess oil and dead skin cells, making it a hero for treating acne and blackheads.",
            kids_skin: "Generally not recommended for babies or young children as it can be too harsh and drying. However, it becomes a very useful ingredient for pre-teens and teens starting to experience hormonal breakouts.",
            product_types: [
                { component: "simple_text_item", text: "Acne Cleansers" },
                { component: "simple_text_item", text: "Spot Treatments" },
                { component: "simple_text_item", text: "Exfoliating Toners" }
            ]
        }
    },
    {
        name: "Glycerin",
        slug: "glycerin",
        content: {
            component: "ingredient_page",
            summary: "A hydration superstar that pulls moisture into the skin.",
            safety: "safe",
            what_is_it: "A humectant, which is a substance that attracts moisture from the air and pulls it into your skin.",
            why_used: "It is one of the most effective common ingredients for hydration. It's gentle, affordable, and works well with almost everything else.",
            kids_skin: "Excellent for kids of all ages. It hydrates without being greasy or clogging pores, making it perfect for baby lotion and kids' face creams.",
            product_types: [
                { component: "simple_text_item", text: "Almost everything hydrating" }
            ]
        }
    },
    {
        name: "Oat Kernel Extract",
        slug: "oat-kernel-extract",
        content: {
            component: "ingredient_page",
            summary: "Nature's soothing remedy for itchy, irritated skin.",
            safety: "safe",
            what_is_it: "An extract derived from oat kernels (Avena sativa). You might also see 'Colloidal Oatmeal'.",
            why_used: "It has powerful anti-inflammatory and itch-relieving properties. It creates a protective film on the skin.",
            kids_skin: "A go-to ingredient for eczema-prone babies and children. It's incredibly soothing for nappy rash, heat rash, or just general dryness.",
            product_types: [
                { component: "simple_text_item", text: "Eczema Creams" },
                { component: "simple_text_item", text: "Bath Soaks" },
                { component: "simple_text_item", text: "Soothing Lotions" }
            ]
        }
    }
];

async function seed() {
    console.log("🌱 Seeding Ingredients...");
    try {
        // 1. Create or Find Folder
        let folderId;
        console.log("Checking for 'ingredients' folder...");
        // Search by slug 'ingredients' at root
        const folders = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: "ingredients" });

        if (folders.data.stories.length > 0) {
            console.log("📂 'ingredients' folder exists (ID: " + folders.data.stories[0].id + ")");
            folderId = folders.data.stories[0].id;
        } else {
            console.log("📂 Creating 'ingredients' folder...");
            const folder = await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                story: {
                    name: "Ingredients",
                    slug: "ingredients",
                    is_folder: true,
                    parent_id: null, // Top level or under learn? Request says /learn/ingredients.
                    // To put it under learn, we need learn folder id. 
                    // But usually we can just do slug "learn/ingredients" if parent exists?
                    // Let's check if 'learn' is a folder. The previous seed made 'learn' a page.
                    // Standard pattern in Storyblok for /learn/ingredients:
                    // 1. 'learn' folder (which has an index page 'learn/home' or just 'learn' is a folder with 'home' inside?)
                    // The previous script made 'learn' a Story of type 'page'.
                    // You cannot have a Story 'learn' and a Folder 'learn' at the same time usually, unless 'learn' is a folder with real_path '/learn'.
                    // If 'learn' is currently a simple story, we can't put a folder *inside* it.
                    // We might need to convert 'learn' to a folder with a root story.
                    // OR we can just create 'ingredients' at root and map it to /learn/ingredients in Next.js? 
                    // No, cleaner to have structure match.

                    // STRATEGY: Create 'ingredients' folder at root for now, but slug 'learn/ingredients'.
                    // Storyblok allows full slug definition.
                    full_slug: "learn/ingredients"
                }
            });
            // Initial creation with full_slug might fail if parent doesn't exist as folder. without parent_id it goes to root.
            // Let's try creating a folder 'Ingredients' at root first, then we can move it or just use it.
            // Actually, if 'Learn' is a page, we can't make 'Ingredients' a child of it easily in the UI tree.
            // Best practice: 'Learn' should be a Folder. The "Learn Page" content should be in 'Learn/home' or 'Learn/index' or just 'Learn' folder has a default path.
            // However, rewriting the existing 'Learn' setup might be risky.
            // Let's treat 'ingredients' as a root folder in Storyblok for simplicity of seeding, 
            // but we can enforce the URL to be /learn/ingredients in Next.js.
            // OR we try to fetch 'learn' and see if we can add to it.
        }

        // Let's try to just create 'ingredients' folder at root for now to avoid conflicts.
        // We will assert the slug is 'ingredients' (root level in storyblok) but we render it at /learn/ingredients in Next.
        // This keeps it decoupled.

        // Re-checking folder logic.
        // To avoid complexity, I will create a top-level folder "Ingredients".
        if (!folderId) {
            const folder = await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                story: {
                    name: "Ingredients",
                    slug: "ingredients",
                    is_folder: true,
                    content: { component: "folder_config" } // Minimal content
                }
            });
            folderId = folder.data.story.id;
            console.log(`✅ Created folder ID: ${folderId}`);
        }

        // 2. Create Ingredients
        for (const ingredient of ingredients) {
            console.log(`Processing ${ingredient.name}...`);
            try {
                await Storyblok.post(`spaces/${SPACE_ID}/stories`, {
                    story: {
                        name: ingredient.name,
                        slug: ingredient.slug,
                        parent_id: folderId,
                        content: ingredient.content
                    }
                });
                console.log(`✅ Created ${ingredient.name}`);
            } catch (e) {
                // Should do update if exists, but simplified here
                console.log(`⚠️ Failed to create ${ingredient.name}, might allow update logic later. Error: ${e.message}`);
                // Try delete and recreate
                const existing = await Storyblok.get(`spaces/${SPACE_ID}/stories`, { with_slug: `ingredients/${ingredient.slug}` });
                if (existing.data.stories.length > 0) {
                    await Storyblok.put(`spaces/${SPACE_ID}/stories/${existing.data.stories[0].id}`, {
                        story: {
                            name: ingredient.name,
                            slug: ingredient.slug,
                            parent_id: folderId,
                            content: ingredient.content
                        }
                    });
                    console.log(`🔄 Updated ${ingredient.name}`);
                }
            }
        }

    } catch (e) {
        console.error("❌ Fatal Error:", e);
    }
}

seed();
