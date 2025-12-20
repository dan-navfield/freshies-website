import { storyblokEditable } from "@storyblok/react";
import { IngredientsExplorer } from "@/components/ingredients/IngredientsExplorer";

export default function IngredientsSupabaseBlock({ blok }: { blok: any }) {
    // We allow title/subtitle to be empty if the user wants to use a separate header block
    const categories = blok.categories ? blok.categories.split(',').map((c: string) => c.trim()) : [];

    return (
        <div {...storyblokEditable(blok)}>
            <IngredientsExplorer
                title={blok.title}
                subtitle={blok.subtitle}
                categories={categories}
            />
        </div>
    );
}
