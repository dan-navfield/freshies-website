import { storyblokEditable } from "@storyblok/react";

// This component is rendered as part of LearnTrust
// It's registered in Storyblok but rendered inline by the parent component
export function LearnTrustItem({ blok }: { blok: any }) {
    return <div {...storyblokEditable(blok)} />;
}
