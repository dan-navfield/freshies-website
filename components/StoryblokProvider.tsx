"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";

import Page from "@/components/Page";
import Teaser from "@/components/Teaser";
import Grid from "@/components/Grid";
import Feature from "@/components/Feature";
import FeatureHero from "./FeatureHero";
import TwoColFeature from "./TwoColFeature";
import FeatureScores from "./FeatureScores";
import ProfileShowcase from "./ProfileShowcase";
import SimpleTextSection from "./SimpleTextSection";
import HomeHero from "./HomeHero";
import HomeHowItWorks from "./HomeHowItWorks";
import HomeAudienceSplit from "./HomeAudienceSplit";
import HomeIngredientSafety from "./HomeIngredientSafety";
import HomeFeatureHighlights from "./HomeFeatureHighlights";
import HomeMission from "./HomeMission";
import HomeFinalCta from "./HomeFinalCta";

const components = {
    page: Page,
    teaser: Teaser,
    grid: Grid,
    feature: Feature,
    feature_hero: FeatureHero,
    two_col_feature: TwoColFeature,
    feature_scores: FeatureScores,
    profile_showcase: ProfileShowcase,
    simple_text_section: SimpleTextSection,
    home_hero: HomeHero,
    home_how_it_works: HomeHowItWorks,
    home_audience_split: HomeAudienceSplit,
    home_ingredient_safety: HomeIngredientSafety,
    home_feature_highlights: HomeFeatureHighlights,
    home_mission: HomeMission,
    home_final_cta: HomeFinalCta,
};

storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    components,
});

console.log("StoryblokProvider: Registered components:", Object.keys(components));


export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
    return children;
}
