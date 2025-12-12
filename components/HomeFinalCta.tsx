import { Button } from '@/components/ui/Button'
import { storyblokEditable } from "@storyblok/react";

export default function HomeFinalCta({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="bg-ultraviolet rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-mint rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-peach rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">{blok.headline}</h2>
                        <p className="text-xl text-white/90 mb-10">
                            {blok.subheadline}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="bg-white text-ultraviolet hover:bg-gray-100 w-full sm:w-auto text-lg px-10 h-16">
                                {blok.cta_text}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
