import { storyblokEditable } from "@storyblok/react";
import { cn } from "@/lib/utils";

export default function StatsSection({ blok }: { blok: any }) {
    return (
        <section
            {...storyblokEditable(blok)}
            className="relative py-16 bg-white border-b border-gray-100"
        >
            {/* Zigzag Top Decoration */}
            {(blok.visual_style === 'zigzag' || blok.top_decoration === 'zigzag') && (
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[50px] text-white" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47,0,47,69,94,69,47,0,47-64,94-64,47,0,47,64,94,64,47,0,47-64,94-64,47,0,47,64,94,64,47,0,47-64,94-64,47,0,47,64,94,64,47,0,47-64,94-64,47,0,47,64,94,64,47,0,47-64,94-64,47,0,47,64,94,64,47,0,47-64,94-64,47,0,47,64,94,64,47,0,47-64,94-64V0Z" className="shape-fill" fill="currentColor"></path>
                    </svg>
                </div>
            )}

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {blok.stats?.map((stat: any) => (
                        <div key={stat._uid} className="text-center space-y-2">
                            <div className="text-4xl md:text-5xl font-black text-deep-purple tracking-tight">
                                {stat.number}
                            </div>
                            <div className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wide">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
