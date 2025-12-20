import { getStoryblokApi } from "@/lib/storyblok";
import { IngredientCard } from "@/components/learn/ingredients/IngredientCard";
import { Search } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

async function getIngredients() {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
        version: "draft", // Change to 'published' for prod
        starts_with: "ingredients/",
        is_startpage: false, // Don't include the folder root if it's treated as a page
    });
    return data.stories;
}

export default async function IngredientsIndex() {
    const ingredients = await getIngredients();

    return (
        <div className="min-h-screen bg-surface-sand pt-32 pb-20">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-deep-purple mb-6 font-display">
                        Ingredients, explained simply.
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Clear, friendly breakdowns of common skincare ingredients. No fear-mongering, just facts to help you choose safely for your family.
                    </p>
                </div>

                {/* Search & Filter Bar (To be made interactive) */}
                <div className="max-w-2xl mx-auto mb-16 relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search ingredients (e.g. Zinc, Fragrance)..."
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-peach-400 focus:border-transparent outline-none text-lg"
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ingredients.map((story: any) => (
                        <IngredientCard
                            key={story.uuid}
                            name={story.name}
                            slug={story.slug}
                            summary={story.content.summary}
                            safety={story.content.safety}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}
