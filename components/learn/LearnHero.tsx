import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { storyblokEditable } from "@storyblok/react";

export function LearnHero({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-surface-sand">
            {/* Floating words background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
                {blok.background_words?.map((word: any, i: number) => {
                    // Simple random positioning based on index
                    const positions = [
                        "top-1/4 left-10 rotate-[-5deg]",
                        "top-1/3 right-20 rotate-[10deg]",
                        "bottom-1/4 left-1/4 rotate-[3deg]",
                        "top-20 left-1/2 rotate-[-2deg]",
                        "bottom-20 right-1/3 rotate-[8deg]"
                    ];
                    const className = positions[i % positions.length];
                    return (
                        <span key={i} className={cn("absolute text-4xl md:text-5xl lg:text-6xl font-black text-deep-purple", className)}>
                            {word.text}
                        </span>
                    )
                })}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {blok.eyebrow && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-deep-purple/5 text-ultraviolet">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                            </span>
                            {blok.eyebrow}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-deep-purple">
                        {blok.headline}
                    </h1>

                    <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto">
                        {blok.subheadline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        {blok.cta_primary_text && (
                            <Button
                                size="lg"
                                variant="primary"
                                className="rounded-full px-8 shadow-xl shadow-ultraviolet/10 hover:shadow-ultraviolet/20 transition-all hover:scale-105"
                            >
                                {blok.cta_primary_text}
                            </Button>
                        )}
                        {blok.cta_secondary_text && (
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full border-2 gap-2 group"
                            >
                                {blok.cta_secondary_text}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        )}
                    </div>

                    <p className="text-sm text-gray-500 pt-4">
                        Trusted, science-led guidance for your family.
                    </p>
                </div>
            </div>
        </section>
    );
}
