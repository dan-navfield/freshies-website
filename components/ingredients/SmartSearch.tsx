
import { useState, useEffect, useRef } from 'react';
import { Search, X, ShieldCheck, AlertTriangle, HelpCircle, Info } from 'lucide-react';
import { smartSearch, SmartSearchResponse, prepareSearchIndex } from '@/lib/searchLogic';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import Link from 'next/link';

interface SmartSearchBarProps {
    onSearch: (results: any[], intent: any) => void;
    initialData?: any[]; // If we passed data from server
}

export function SmartSearchBar({ onSearch, initialData = [] }: SmartSearchBarProps) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [response, setResponse] = useState<SmartSearchResponse | null>(null);

    // fetch all ingredients to index client-side for "Instant" feel
    // in a real large app we might debounce and search server-side, 
    // but for <1000 params client side fuse is faster and better UX.
    const { data: serverData } = useSupabaseData('ingredients');
    const [indexedData, setIndexedData] = useState<any[]>([]);

    useEffect(() => {
        if (serverData?.length) {
            setIndexedData(prepareSearchIndex(serverData));
        }
    }, [serverData]);

    const wrapperRef = useRef<HTMLDivElement>(null);

    // Handle outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);

        if (val.length > 0) {
            setIsOpen(true);
            const searchRes = smartSearch(indexedData, val);
            setResponse(searchRes);
            onSearch(searchRes.results.map(r => r.item), searchRes.intent);
        } else {
            setIsOpen(false);
            setResponse(null);
            onSearch(indexedData, null); // Reset to all
        }
    };

    const clearSearch = () => {
        setQuery('');
        setIsOpen(false);
        onSearch(indexedData, null);
    };

    const getSafetyIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'safe': return <ShieldCheck className="w-4 h-4 text-green-600" />;
            case 'caution': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
            case 'avoid': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            default: return <HelpCircle className="w-4 h-4 text-gray-400" />;
        }
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto z-50">
            <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={handleInput}
                    onFocus={() => query.length > 0 && setIsOpen(true)}
                    placeholder="Search ingredients (e.g. Zinc, Fragrance) or ask a question..."
                    className="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-[#6b2c91] focus:border-transparent outline-none text-lg transition-shadow"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Smart Dropdown */}
            {isOpen && response && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                    {/* Intent Detected Banner */}
                    {response.intent && (
                        <div className="bg-[#f8f5fa] px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                            <Info size={16} className="text-[#6b2c91]" />
                            <span className="text-sm font-medium text-[#6b2c91]">
                                Context: {response.intent.label}
                            </span>
                        </div>
                    )}

                    {/* Educational Context */}
                    {response.educationalContext && (
                        <div className="p-4 bg-blue-50 border-b border-blue-100">
                            <p className="text-sm text-blue-800 font-medium mb-1">Quick Fact:</p>
                            <p className="text-sm text-blue-700">{response.educationalContext.summary}</p>
                            <div className="mt-2 text-xs font-bold text-blue-800 uppercase tracking-wide">
                                Recommendation: {response.educationalContext.recommendation}
                            </div>
                        </div>
                    )}

                    {/* Results List */}
                    <div className="max-h-[60vh] overflow-y-auto">
                        {response.results.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p className="mb-2">We couldn't find matches for "{query}"</p>
                                {response.suggestion && (
                                    <p className="text-sm text-[#6b2c91] font-medium">{response.suggestion}</p>
                                )}
                                <div className="mt-4">
                                    <button className="text-sm text-gray-400 hover:text-[#6b2c91] underline">
                                        Request this ingredient
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <ul>
                                {response.results.slice(0, 5).map(({ item, isSynonym, synonymMatch }) => (
                                    <li key={item.id} className="border-b border-gray-50 last:border-0">
                                        <Link
                                            href={`/learn/ingredients/${item.slug || item.id}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block p-4 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-gray-900 group-hover:text-[#3d1861] transition-colors">
                                                            {item.name}
                                                        </span>
                                                        {isSynonym && (
                                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                                                Matches "{synonymMatch}"
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded text-xs font-medium text-gray-600">
                                                    {getSafetyIcon(item.safety_status)}
                                                    <span className="capitalize">{item.safety_status || 'Unknown'}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {response.results.length > 5 && (
                        <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-sm text-[#6b2c91] font-bold hover:underline"
                            >
                                View all {response.results.length} results
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
