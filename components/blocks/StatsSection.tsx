import { storyblokEditable } from "@storyblok/react";
import { cn } from "@/lib/utils";

export default function StatsSection({ blok }: { blok: any }) {
    return (
        <section
            {...storyblokEditable(blok)}
            className="py-16 bg-white border-y border-gray-100"
        >
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
