import Page from "@/components/Page";
import Teaser from "@/components/Teaser";
import Grid from "@/components/Grid";
import Feature from "@/components/Feature";
import FeatureHero from "@/components/FeatureHero";
import TwoColFeature from "@/components/TwoColFeature";
import FeatureScores from "@/components/FeatureScores";
import ProfileShowcase from "@/components/ProfileShowcase";
import SimpleTextSection from "@/components/SimpleTextSection";
import HomeHero from "@/components/HomeHero";
import HomeHowItWorks from "@/components/HomeHowItWorks";
import HomeAudienceSplit from "@/components/HomeAudienceSplit";
import HomeIngredientSafety from "@/components/HomeIngredientSafety";
import HomeFeatureHighlights from "@/components/HomeFeatureHighlights";
import HomeMission from "@/components/HomeMission";
import HomeFinalCta from "@/components/HomeFinalCta";
import { storyblokInit, apiPlugin } from "@storyblok/react";

export const getStoryblokApi = storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: {
        page: Page,
        teaser: Teaser,
        grid: Grid,
        feature: Feature,
        // Features Page Components
        feature_hero: FeatureHero,
        two_col_feature: TwoColFeature,
        feature_scores: FeatureScores,
        profile_showcase: ProfileShowcase,
        simple_text_section: SimpleTextSection,
        // Helper components for Features
        feature_highlight: Feature,
        feature_bullet: Feature,
        // Home Page Components
        home_hero: HomeHero,
        home_how_it_works: HomeHowItWorks,
        home_audience_split: HomeAudienceSplit,
        home_ingredient_safety: HomeIngredientSafety,
        home_feature_highlights: HomeFeatureHighlights,
        home_mission: HomeMission,
        home_final_cta: HomeFinalCta,
    },
});
