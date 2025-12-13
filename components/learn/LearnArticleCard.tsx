import { storyblokEditable } from "@storyblok/react";

// This component is rendered as part of LearnFeatured
// It's registered in Storyblok but rendered inline by the parent component
export function LearnArticleCard({ blok }: { blok: any }) {
    return <div {...storyblokEditable(blok)} />;
}
