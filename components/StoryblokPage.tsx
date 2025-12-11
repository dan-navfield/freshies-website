"use client";
import { useStoryblokState } from "@storyblok/react";
import { StoryblokComponent } from "@storyblok/react";

export default function StoryblokPage({ story }: { story: any }) {
    // This hook bridges the CMS and the app for live updates
    story = useStoryblokState(story);

    if (!story.content) {
        return null;
    }

    return <StoryblokComponent blok={story.content} />;
}
