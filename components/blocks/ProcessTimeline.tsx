import { storyblokEditable } from "@storyblok/react";
import { cn } from "@/lib/utils";

export default function ProcessTimeline({ blok }: { blok: any }) {
    return (
        <section
            {...storyblokEditable(blok)}
            className="py-24 bg-white"
        >
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <span className="text-ultraviolet font-bold tracking-wider uppercase text-sm">{blok.eyebrow}</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-deep-purple">{blok.headline}</h2>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute top-24 left-0 w-full h-1 bg-gradient-to-r from-ultraviolet/20 via-mint/50 to-ultraviolet/20 hidden md:block" />

                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        {blok.steps?.map((step: any, idx: number) => (
                            <div key={step._uid} className="relative flex flex-col items-center text-center group">
                                {/* Number Bubble */}
                                <div className="w-16 h-16 rounded-2xl bg-white border-4 border-mint text-mint-dark font-black text-2xl flex items-center justify-center shadow-xl mb-8 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                    {idx + 1}
                                </div>

                                <div className="bg-surface-sand/30 p-8 rounded-[2rem] h-full w-full transition-colors group-hover:bg-surface-sand/50">
                                    <h3 className="text-xl font-bold text-deep-purple mb-4">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
