import { storyblokEditable } from "@storyblok/react";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

const FeatureScores = ({ blok }: { blok: any }) => {
    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <span className="text-ultraviolet font-bold tracking-wider uppercase text-sm mb-4 block">
                        {blok.label || "Safety Scores"}
                    </span>
                    <h2 className="text-4xl font-bold text-deep-purple mb-6">
                        {blok.headline}
                    </h2>
                    <p className="text-xl text-deep-purple/70 max-w-2xl">
                        {blok.body}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left: Interactive Score Bar */}
                    <div className="flex-1 w-full max-w-xl">
                        {/* Score Scale Visualization */}
                        <div className="relative pt-10 pb-20">
                            <div className="h-4 w-full rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 shadow-inner"></div>

                            {/* Animated Marker (Simulated) */}
                            <div className="absolute top-8 left-[85%] -translate-x-1/2 flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-white shadow-lg border-4 border-mint mb-2 animate-bounce-slow"></div>
                                <div className="bg-deep-purple text-white px-3 py-1 rounded-lg font-bold text-lg shadow-xl">
                                    88
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex justify-between mt-6 text-sm text-deep-purple/60 font-medium">
                                <span>0-39<br />High Concern</span>
                                <span className="text-center">40-59<br />Caution</span>
                                <span className="text-center">60-79<br />Good</span>
                                <span className="text-right">80-100<br />Excellent</span>
                            </div>
                        </div>

                        {/* Traffic Light Colors */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                <div className="w-3 h-3 rounded-full bg-red-400 mb-4"></div>
                                <h4 className="font-bold text-deep-purple mb-2">Needs Attention</h4>
                                <p className="text-sm text-deep-purple/70">Ingredients linked to irritation or other concerns.</p>
                            </div>
                            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                                <div className="w-3 h-3 rounded-full bg-yellow-400 mb-4"></div>
                                <h4 className="font-bold text-deep-purple mb-2">Use with Care</h4>
                                <p className="text-sm text-deep-purple/70">Generally okay but maybe not for sensitive skin.</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                                <div className="w-3 h-3 rounded-full bg-green-500 mb-4"></div>
                                <h4 className="font-bold text-deep-purple mb-2">Kid Safe</h4>
                                <p className="text-sm text-deep-purple/70">Gentle ingredients suitable for most children.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Ingredient Popups */}
                    <div className="flex-1 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                        <h4 className="text-lg font-bold text-deep-purple mb-6 border-b pb-4">Ingredient Analysis</h4>
                        <div className="space-y-4">
                            {[{ name: "Fragrance (Parfum)", risk: "high", desc: "Can be irritating for sensitive skin." },
                            { name: "Niacinamide", risk: "safe", desc: "Helps calm redness and support barrier." },
                            { name: "Ceramides", risk: "safe", desc: "Great for holding moisture." }
                            ].map((ing, i) => (
                                <div key={i} className="group relative">
                                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                        <span className="font-medium text-deep-purple">{ing.name}</span>
                                        <div className={cn("w-3 h-3 rounded-full", ing.risk === 'high' ? 'bg-red-400' : 'bg-green-500')} />
                                    </div>
                                    {/* Mock Tooltip */}
                                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-deep-purple text-white text-xs p-3 rounded-xl shadow-xl z-20">
                                        {ing.desc}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-deep-purple"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeatureScores;
