import StoryblokClient from 'storyblok-js-client';
import readline from 'readline';

const SPACE_ID = 289085951461266;

// Components definition
const components = [
    {
        name: 'teaser',
        display_name: 'Teaser',
        schema: {
            headline: { type: 'text', required: true },
            description: { type: 'textarea' }
        }
    },
    {
        name: 'grid',
        display_name: 'Grid',
        is_root: false,
        is_nestable: true,
        schema: {
            columns: {
                type: 'bloks',
                restrict_components: true,
                component_whitelist: ['feature', 'teaser']
            }
        }
    },
    {
        name: 'feature',
        display_name: 'Feature',
        schema: {
            name: { type: 'text', required: true },
            description: { type: 'textarea' },
            icon: {
                type: 'text',
                description: 'Lucide icon name (e.g., Scan, Salad, Calendar)'
            }
        }
    },
    {
        name: 'page',
        display_name: 'Page',
        is_root: true,
        is_nestable: true,
        schema: {
            body: {
                type: 'bloks',
                restrict_components: true,
                component_whitelist: ['teaser', 'grid']
            }
        }
    }
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log("🚀 Freshies Storyblok Seeder");
    console.log("----------------------------");

    // We need a Personal Access Token
    const verifiedToken = process.env.STORYBLOK_OAUTH_TOKEN || await askQuestion("Enter your Storyblok Personal Access Token (from My Account -> Personal Access Tokens): ");

    const Storyblok = new StoryblokClient({
        oauthToken: verifiedToken
    });

    try {
        // Test connection
        await Storyblok.get(`spaces/${SPACE_ID}`);
        console.log("✅ Connected to Space:", SPACE_ID);

        // 1. Create/Update Components
        for (const comp of components) {
            console.log(`Processing component: ${comp.name}...`);
            try {
                // Check if exists
                await Storyblok.post(`spaces/${SPACE_ID}/components`, { component: comp });
                console.log(`   ✅ Created ${comp.name}`);
            } catch (e) {
                if (e.message.includes('422')) {
                    // Update if exists (simplified, usually requires ID lookup but 422 implies name conflict)
                    console.log(`   ⚠️ Component ${comp.name} already exists. Skipping update (manual check recommended).`);
                } else {
                    console.error(`   ❌ Failed: ${e.message}`);
                }
            }
        }

        // 2. Create Features Page
        console.log("Creating Features Page...");
        const featuresContent = {
            name: 'Features',
            slug: 'features',
            content: {
                component: 'page',
                body: [
                    {
                        component: 'teaser',
                        headline: 'Features',
                        description: 'Everything you need to build healthy skincare habits.'
                    },
                    {
                        component: 'grid',
                        columns: [
                            { component: 'feature', name: 'Smart Scan', description: 'Analyze ingredients instantly.', icon: 'Scan' },
                            { component: 'feature', name: 'Safe Routines', description: 'Build habits that last.', icon: 'Calendar' },
                            { component: 'feature', name: 'Pantry Check', description: 'Know whats in your cupboard.', icon: 'Package' }
                        ]
                    }
                ]
            }
        };

        try {
            await Storyblok.post(`spaces/${SPACE_ID}/stories`, { story: featuresContent });
            console.log("✅ Created 'Features' story!");
        } catch (e) {
            console.log(`⚠️ Failed to create story (might already exist): ${e.message}`);
        }

    } catch (e) {
        console.error("❌ Fatal Error:", e.message);
    } finally {
        rl.close();
    }
}

main();
