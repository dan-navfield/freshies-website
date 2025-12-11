import Page from "@/components/Page";
import Teaser from "@/components/Teaser";
import Grid from "@/components/Grid";
import Feature from "@/components/Feature";
import { storyblokInit, apiPlugin } from "@storyblok/react";

export const getStoryblokApi = storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: {
        page: Page,
        teaser: Teaser,
        grid: Grid,
        feature: Feature,
    },
});
