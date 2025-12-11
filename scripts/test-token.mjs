import StoryblokClient from 'storyblok-js-client';

const token = "xXH7eQFgg1mHPEfjDnIGUwtt";

// Try as Content Delivery
const client = new StoryblokClient({
    accessToken: token
});

async function testToken() {
    console.log("Testing token...");

    // 1. Try CDN access (Public/Preview)
    try {
        const { data } = await client.get('cdn/stories', { version: 'draft' });
        console.log("✅ CDN Access (Draft): Success. Found", data.stories.length, "stories.");
    } catch (e) {
        console.log("❌ CDN Access (Draft): Failed.", e.message);
    }

    // 2. Try Management Access
    // Management API requires oauthToken in constructor, not accessToken.
    // We'll try initializing a new client with oauthToken to see if this token works for management.
    const mgmtClient = new StoryblokClient({
        oauthToken: token
    });

    try {
        const { data } = await mgmtClient.get('spaces/me'); // or just 'spaces/289085951461266'
        console.log("✅ Management Access: Success.", data);
    } catch (e) {
        console.log("❌ Management Access: Failed.", e.message);
    }
}

testToken();
