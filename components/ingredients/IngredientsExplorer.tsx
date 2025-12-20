import { useState, useMemo } from 'react';
import { SmartSearchBar } from './SmartSearch';
import { IngredientCard } from '@/components/ui/IngredientCard';
import { Intent } from '@/lib/searchLogic';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { ChevronLeft, ChevronRight, SlidersHorizontal, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

interface IngredientsExplorerProps {
    title?: string;
    subtitle?: string;
    categories: string[];
}

type SortOption = 'name-asc' | 'name-desc';

export function IngredientsExplorer({ title, subtitle, categories }: IngredientsExplorerProps) {
    const { data: allIngredients, loading, error } = useSupabaseData('ingredients');

    const [activeIntent, setActiveIntent] = useState<Intent | null>(null);
    const [searchResult, setSearchResult] = useState<any[] | null>(null); // null means no active search
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState<SortOption>('name-asc');
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 9;

    // Handle Smart Search updates
    const handleSearch = (results: any[], intent: any) => {
        // If results equals full data length (and no query active), treat as "no search"
        // But SmartSearch usually filters.
        // If SmartSearch returns "all" because query is empty, we handle that.
        setSearchResult(results);
        setActiveIntent(intent);
        setCurrentPage(1); // Reset page on search
    };

    // Filter & Sort Logic
    const processedData = useMemo(() => {
        // 1. Source: Search Result ID set OR All Ingredients
        let data = searchResult !== null ? searchResult : allIngredients;

        // 2. Filter by Category
        if (selectedCategory !== 'All') {
            data = data.filter((item: any) => {
                // Handle comma-separated categories or arrays if needed, currently string match
                // Our mock data has single category strings.
                return item.category === selectedCategory;
            });
        }

        // 3. Sort
        if (sortOrder === 'name-asc') {
            data = [...data].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === 'name-desc') {
            data = [...data].sort((a, b) => b.name.localeCompare(a.name));
        }

        return data;
    }, [allIngredients, searchResult, selectedCategory, sortOrder]);

    // Pagination Logic
    const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);
    const paginatedData = processedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
    };

    if (error) {
        return (
            <div className="py-20 text-center text-red-600 bg-red-50 rounded-xl max-w-2xl mx-auto my-12 border border-red-100">
                <p className="font-bold mb-2">Unable to load ingredients</p>
                <p className="text-sm opacity-80">{error}</p>
                <p className="text-xs text-slate-500 mt-4">Please check your network or database connection.</p>
            </div>
        );
    }

    return (
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto min-h-[600px]">
            {/* Header Section - Only render if title is provided */}
            {title && (
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#3d1861] mb-4 tracking-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {/* Controls Section */}
            <div className="mb-10 relative z-50 space-y-6">
                <div className="flex justify-center w-full">
                    <SmartSearchBar
                        onSearch={handleSearch}
                        initialData={allIngredients}
                    />
                </div>

                {/* Filters & Toggles */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-100 pb-6">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <button
                            onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === 'All'
                                ? 'bg-[#6b2c91] text-white shadow-md'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                    ? 'bg-[#6b2c91] text-white shadow-md'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sorting */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400 font-medium flex items-center gap-1">
                            <SlidersHorizontal size={14} /> Sort:
                        </span>
                        <div className="flex bg-slate-100 rounded-lg p-1">
                            <button
                                onClick={() => setSortOrder('name-asc')}
                                className={`p-1.5 rounded-md transition-all ${sortOrder === 'name-asc' ? 'bg-white shadow text-[#6b2c91]' : 'text-slate-500 hover:text-[#6b2c91]'
                                    }`}
                                title="A-Z"
                            >
                                <ArrowDownAZ size={18} />
                            </button>
                            <button
                                onClick={() => setSortOrder('name-desc')}
                                className={`p-1.5 rounded-md transition-all ${sortOrder === 'name-desc' ? 'bg-white shadow text-[#6b2c91]' : 'text-slate-500 hover:text-[#6b2c91]'
                                    }`}
                                title="Z-A"
                            >
                                <ArrowUpAZ size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Intent/Active Filter Chips */}
                {activeIntent && (
                    <div className="flex justify-center animate-in slide-in-from-top-2">
                        <div className="bg-[#f8f5fa] text-[#6b2c91] px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold border border-[#e9d8fd]">
                            <span>✨ Active Mode: {activeIntent.label}</span>
                            <button
                                onClick={() => { setActiveIntent(null); setSearchResult(null); }} // Clear intent also clears specific search? Or just intent? Usually tightly coupled.
                                className="hover:bg-[#e9d8fd] rounded-full p-0.5"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Grid */}
            <div className="min-h-[300px]">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 bg-slate-100 rounded-2xl"></div>
                        ))}
                    </div>
                ) : paginatedData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-slate-50 p-6 rounded-full mb-4">
                            <SlidersHorizontal size={32} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No ingredients found</h3>
                        <p className="text-slate-500 max-w-md">
                            We couldn't find any ingredients matching your current filters. Try adjusting your search or categories.
                        </p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchResult(null); }}
                            className="mt-6 text-[#6b2c91] font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                        {paginatedData.map((item: any) => (
                            <IngredientCard
                                key={item.id}
                                name={item.name}
                                description={item.description}
                                slug={item.slug || item.id}
                                status={item.safety_status || 'unknown'}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <span className="text-sm font-medium text-slate-600">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </section>
    );
}
