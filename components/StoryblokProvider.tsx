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
import InteractiveFeatureShowcase from "@/components/blocks/InteractiveFeatureShowcase";
import StatsSection from "@/components/blocks/StatsSection";
import PricingTable from "@/components/blocks/PricingTable";
import TestimonialCarousel from "@/components/blocks/TestimonialCarousel";
import ProcessTimeline from "@/components/blocks/ProcessTimeline";
import FeatureTabItem from "@/components/blocks/FeatureTabItem";
import ValuesSection from "@/components/blocks/ValuesSection";
import { LearnHero } from "@/components/learn/LearnHero";
import { LearnCategories } from "@/components/learn/LearnCategories";
import { LearnFeatured } from "@/components/learn/LearnFeatured";
import { LearnIngredients } from "@/components/learn/LearnIngredients";
import { LearnAppConnect } from "@/components/learn/LearnAppConnect";
import { LearnCta } from "@/components/learn/LearnCta";
import { LearnTrust } from "@/components/learn/LearnTrust";
import { SimpleTextItem } from "@/components/learn/SimpleTextItem";
import { LearnCategoryItem } from "@/components/learn/LearnCategoryItem";
import { LearnArticleCard } from "@/components/learn/LearnArticleCard";
import { LearnIngredientItem } from "@/components/learn/LearnIngredientItem";
import { LearnStepItem } from "@/components/learn/LearnStepItem";
import { LearnTrustItem } from "@/components/learn/LearnTrustItem";

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
    interactive_feature_showcase: InteractiveFeatureShowcase,
    stats_section: StatsSection,
    pricing_table: PricingTable,
    testimonial_carousel: TestimonialCarousel,
    process_timeline: ProcessTimeline,
    feature_tab_item: FeatureTabItem,
    values_section: ValuesSection,
    // Learn components
    learn_hero: LearnHero,
    learn_categories: LearnCategories,
    learn_featured: LearnFeatured,
    learn_ingredients: LearnIngredients,
    learn_app_connect: LearnAppConnect,
    learn_cta: LearnCta,
    learn_trust: LearnTrust,
    // Learn sub-components
    simple_text_item: SimpleTextItem,
    learn_category_item: LearnCategoryItem,
    learn_article_card: LearnArticleCard,
    learn_ingredient_item: LearnIngredientItem,
    learn_step_item: LearnStepItem,
    learn_trust_item: LearnTrustItem,
};

storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    components,
});




export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
    return children;
}
