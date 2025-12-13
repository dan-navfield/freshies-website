import { storyblokEditable } from "@storyblok/react";

// This component is rendered as part of LearnAppConnect
// It's registered in Storyblok but rendered inline by the parent component
export function LearnStepItem({ blok }: { blok: any }) {
    return <div {...storyblokEditable(blok)} />;
}
