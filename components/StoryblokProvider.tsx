"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";

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
import HeroSection from "@/components/blocks/HeroSection";
import ContentSection from "@/components/blocks/ContentSection";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import CtaSection from "@/components/blocks/CtaSection";

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
    hero_section: HeroSection,
    content_section: ContentSection,
    feature_grid: FeatureGrid,
    cta_section: CtaSection,
};

storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    components,
});




export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
    return children;
}
