import Page from "@/components/Page";
import Teaser from "@/components/Teaser";
import Grid from "@/components/Grid";
import Feature from "@/components/Feature";
import FeatureHero from "../components/FeatureHero";
import TwoColFeature from "../components/TwoColFeature";
import FeatureScores from "../components/FeatureScores";
import ProfileShowcase from "../components/ProfileShowcase";
import SimpleTextSection from "../components/SimpleTextSection";
import { storyblokInit, apiPlugin } from "@storyblok/react";

export const getStoryblokApi = storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: {
        page: Page,
        teaser: Teaser,
        grid: Grid,
        feature: Feature,
        feature_hero: FeatureHero,
        two_col_feature: TwoColFeature,
        feature_scores: FeatureScores,
        profile_showcase: ProfileShowcase,
        simple_text_section: SimpleTextSection,
    },
});
