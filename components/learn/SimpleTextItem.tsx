import { storyblokEditable } from "@storyblok/react";

export function SimpleTextItem({ blok }: { blok: any }) {
    return <span {...storyblokEditable(blok)}>{blok.text}</span>;
}
