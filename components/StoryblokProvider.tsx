"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";

import Page from "@/components/Page";

storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: {
        page: Page,
    },
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
    return children;
}
