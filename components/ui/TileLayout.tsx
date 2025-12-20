
import React, { useState } from 'react'

interface TileLayoutProps {
    title: string
    subtitle?: string
    searchPlaceholder?: string
    categories?: string[]
    onSearch: (term: string) => void
    onCategorySelect: (category: string) => void
    children: React.ReactNode
}

export function TileLayout({
    title,
    subtitle,
    searchPlaceholder = "Search...",
    categories = [],
    onSearch,
    onCategorySelect,
    children
}: TileLayoutProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value
        setSearchTerm(term)
        onSearch(term)
    }

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category)
        onCategorySelect(category)
    }

    return (
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#3d1861] mb-4">{title}</h2>
                {subtitle && (
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                )}
            </div>

            <div className="mb-12">
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full px-6 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6b2c91] text-lg"
                        />
                        {/* Icon could go here */}
                    </div>
                </div>

                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => handleCategoryClick('All')}
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
                                onClick={() => handleCategoryClick(cat)}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {children}
            </div>
        </section>
    )
}
