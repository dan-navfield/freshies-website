import { Button } from '@/components/ui/Button'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { storyblokEditable } from "@storyblok/react";

export default function HomeIngredientSafety({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Column: Content */}
                    <div className="lg:w-1/2">
                        <span className="text-mint font-bold tracking-wider uppercase mb-2 block">{blok.eyebrow}</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-deep-purple">
                            {blok.headline_part_1} <span className="text-ultraviolet">{blok.headline_highlight}</span>.
                        </h2>
                        <p className="text-xl text-deep-purple/70 mb-8 leading-relaxed">
                            {blok.body}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-deep-purple">Green means Go</h4>
                                    <p className="text-deep-purple/60">Safe, gentle ingredients suitable for young skin.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                    <Info className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-deep-purple">Yellow means Caution</h4>
                                    <p className="text-deep-purple/60">Use with care or limit frequency.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-deep-purple">Red means Stop</h4>
                                    <p className="text-deep-purple/60">Ingredients known to cause irritation or harm.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Demonstration */}
                    <div className="lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-mint/20 to-ultraviolet/20 rounded-full blur-3xl" />
                        <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md mx-auto">
                            {/* Mock Card */}
                            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                                <div>
                                    <h3 className="font-bold text-lg">Gentle Face Wash</h3>
                                    <p className="text-sm text-gray-400">Brand X</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-green-200">
                                    92
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="font-medium text-sm">Glycerin</span>
                                    </div>
                                    <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">Safe</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="font-medium text-sm">Aloe Barbadensis</span>
                                    </div>
                                    <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">Safe</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                        <span className="font-medium text-sm">Fragrance (Parfum)</span>
                                    </div>
                                    <span className="text-xs text-yellow-600 font-semibold bg-yellow-100 px-2 py-1 rounded">Caution</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
