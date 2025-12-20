
import { useState } from 'react';
import { SmartSearchBar } from './SmartSearch';
import { TileLayout } from '@/components/ui/TileLayout';
import { IngredientCard } from '@/components/ui/IngredientCard';
import { Intent } from '@/lib/searchLogic';

interface IngredientsExplorerProps {
    title: string;
    subtitle?: string;
    categories: string[];
}

export function IngredientsExplorer({ title, subtitle, categories }: IngredientsExplorerProps) {
    // If null, we haven't searched, so we might want to show all initially or just a few featured.
    // TileLayout defaults to empty if we don't pass children, but we want to show initial data.
    // The SmartSearchBar fetches data internally for client-side index.
    // Ideally we lift that state up or re-fetch here for the grid.
    // For simplicity, let's use the layout's internal "Search" as a fallback or replace it entirely?

    // Actually, TileLayout has its own search input. We want to REPLACE that with SmartSearchBar.
    // So we shouldn't use TileLayout directly as is, or we should modify TileLayout to accept a custom Search component.
    // Let's copy the structure of TileLayout but use SmartSearchBar.

    const [displayedItems, setDisplayedItems] = useState<any[]>([]);
    const [activeIntent, setActiveIntent] = useState<Intent | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleSearch = (results: any[], intent: any) => {
        setDisplayedItems(results);
        setActiveIntent(intent);
        setHasSearched(true);
    };

    // We also need to handle Category filtering from the pills.
    // This is tricky if SmartSearch controls the results.
    // Ideally SmartSearch also handles categories, OR we filter the `displayedItems` again here.
    // Let's filter here.
    const filteredItems = displayedItems.filter(item => {
        if (selectedCategory === 'All') return true;
        // Assuming item has category or tags
        return item.category === selectedCategory;
    });

    return (
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#3d1861] mb-4">{title}</h2>
                {subtitle && (
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                )}
            </div>

            <div className="mb-12 relative z-50">
                <div className="flex justify-center mb-8">
                    <SmartSearchBar onSearch={handleSearch} />
                </div>

                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`px-6 py-2 rounded-full transition-colors ${selectedCategory === 'All'
                                    ? 'bg-[#6b2c91] text-white'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full transition-colors ${selectedCategory === cat
                                        ? 'bg-[#6b2c91] text-white'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Intent/Active Filter Chips */}
                {activeIntent && (
                    <div className="flex justify-center mt-4 animate-in slide-in-from-top-2">
                        <div className="bg-[#f8f5fa] text-[#6b2c91] px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold border border-[#e9d8fd]">
                            <span>✨ Active Mode: {activeIntent.label}</span>
                            <button
                                onClick={() => setActiveIntent(null)}
                                className="hover:bg-[#e9d8fd] rounded-full p-0.5"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!hasSearched && displayedItems.length === 0 ? (
                    // Initial Load State - we might want to fetch initial data here if SmartSearch doesn't fire immediately
                    // For now, SmartSearch fires "onSearch" with all items when initialized or query cleared?
                    // We need to ensure SmartSearch calls onSearch with initial data.
                    <div className="col-span-full text-center text-gray-400 py-12">
                        <p>Start typing to search ingredients...</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <p className="text-xl text-gray-500 mb-4">No ingredients found matching your criteria.</p>
                        <button className="text-[#6b2c91] font-bold hover:underline">
                            Request an ingredient check
                        </button>
                    </div>
                ) : (
                    filteredItems.map((item: any) => (
                        <IngredientCard
                            key={item.id}
                            name={item.name}
                            description={item.description}
                            slug={item.slug || item.id}
                            status={item.safety_status || 'unknown'}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
