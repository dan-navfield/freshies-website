
import { storyblokEditable } from "@storyblok/react";
import { TileLayout } from "../ui/TileLayout";
import { ProductCard } from "../ui/ProductCard";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { useState } from "react";

export default function ProductsSupabaseBlock({ blok }: { blok: any }) {
    const tableName = blok.table_name || 'products';
    const displayTitle = blok.title || 'Products';
    const displaySubtitle = blok.subtitle || 'Shop our collection.';

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
                {loading && <p className="text-center text-gray-500 col-span-full">Loading products...</p>}
                {error && <p className="text-center text-red-500 col-span-full">Error loading data: {error}</p>}

                {!loading && !error && data.length === 0 && (
                    <p className="text-center text-gray-500 col-span-full">No products found.</p>
                )}

                {data.map((item: any) => (
                    <ProductCard
                        key={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        imageUrl={item.image_url}
                        slug={item.slug || item.id}
                    />
                ))}
            </TileLayout>
        </div>
    );
}
