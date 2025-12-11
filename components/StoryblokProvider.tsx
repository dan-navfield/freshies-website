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
};

storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    components,
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
    return children;
}
