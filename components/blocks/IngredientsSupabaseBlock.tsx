import { storyblokEditable } from "@storyblok/react";
import { IngredientsExplorer } from "@/components/ingredients/IngredientsExplorer";

export default function IngredientsSupabaseBlock({ blok }: { blok: any }) {
    const displayTitle = blok.title || 'Ingredients, explained simply.';
    const displaySubtitle = blok.subtitle || 'Clear, friendly breakdowns of common skincare ingredients.';
    const categories = blok.categories ? blok.categories.split(',').map((c: string) => c.trim()) : [];

    return (
        <div {...storyblokEditable(blok)}>
            <IngredientsExplorer
                title={displayTitle}
                subtitle={displaySubtitle}
                categories={categories}
            />
        </div>
    );
}
