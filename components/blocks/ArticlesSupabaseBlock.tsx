
import { storyblokEditable } from "@storyblok/react";
import { TileLayout } from "../ui/TileLayout";
import { ArticleCard } from "../ui/ArticleCard";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { useState } from "react";

export default function ArticlesSupabaseBlock({ blok }: { blok: any }) {
    const tableName = blok.table_name || 'articles';
    const displayTitle = blok.title || 'Articles';
    const displaySubtitle = blok.subtitle || 'Learn more about skincare.';

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const { data, loading, error } = useSupabaseData(tableName, searchTerm, selectedCategory);

    const categories = blok.categories ? blok.categories.split(',').map((c: string) => c.trim()) : [];

    return (
        <div {...storyblokEditable(blok)}>
            <TileLayout
                title={displayTitle}
                subtitle={displaySubtitle}
                categories={categories}
                onSearch={setSearchTerm}
                onCategorySelect={setSelectedCategory}
            >
                {loading && <p className="text-center text-gray-500 col-span-full">Loading articles...</p>}
                {error && <p className="text-center text-red-500 col-span-full">Error loading data: {error}</p>}

                {!loading && !error && data.length === 0 && (
                    <p className="text-center text-gray-500 col-span-full">No articles found.</p>
                )}

                {data.map((item: any) => (
                    <ArticleCard
                        key={item.id}
                        title={item.title}
                        excerpt={item.excerpt || item.description}
                        author={item.author}
                        date={item.published_at ? new Date(item.published_at).toLocaleDateString() : undefined}
                        imageUrl={item.image_url}
                        slug={item.slug || item.id}
                    />
                ))}
            </TileLayout>
        </div>
    );
}
