import { storyblokEditable } from "@storyblok/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function CtaSection({ blok }: { blok: any }) {
    const isBoxed = blok.variant === 'boxed_primary';

    return (
        <section {...storyblokEditable(blok)} className="py-24">
            <div className="container mx-auto px-4">
                <div className={cn(
                    "relative overflow-hidden p-12 md:p-20 text-center rounded-[3rem]",
                    isBoxed
                        ? "bg-gradient-to-br from-deep-purple to-ultraviolet text-white shadow-2xl"
                        : "bg-surface-sand text-deep-purple"
                )}>
                    {/* Decor */}
                    {isBoxed && (
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric-blue blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
                        </div>
                    )}

                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            {blok.headline}
                        </h2>
                        {blok.subheadline && (
                            <p className={cn("text-xl opacity-90", isBoxed ? "text-white/80" : "text-gray-600")}>
                                {blok.subheadline}
                            </p>
                        )}

                        <Button
                            size="lg"
                            variant={isBoxed ? "secondary" : "primary"}
                            className="mt-8 px-10 h-14 text-lg rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            {blok.cta_text}
                        </Button>

                        {!isBoxed && (
                            <p className="text-xs text-gray-400 mt-6 tracking-wide uppercase font-semibold">
                                No Credit Card Required · Cancel Anytime
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
