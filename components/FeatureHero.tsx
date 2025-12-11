import { storyblokEditable } from "@storyblok/react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

const FeatureHero = ({ blok }: { blok: any }) => {
    return (
        <section {...storyblokEditable(blok)} className="relative pt-32 pb-20 overflow-hidden bg-cream/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    {blok.eyebrow && (
                        <span className="text-ultraviolet font-bold tracking-wider uppercase text-sm mb-4 block">
                            {blok.eyebrow}
                        </span>
                    )}
                    <h1 className="text-5xl md:text-6xl font-bold text-deep-purple mb-6 leading-tight">
                        {blok.headline}
                    </h1>
                    <p className="text-xl text-deep-purple/70 leading-relaxed">
                        {blok.subheadline}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    {/* Highlights List */}
                    <div className="flex-1 max-w-sm space-y-6">
                        {blok.highlights?.map((item: any) => {
                            const Icon = (Icons as any)[item.icon] || Icons.Check;
                            return (
                                <div key={item._uid} className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white hover:shadow-md transition-all">
                                    <div className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center text-mint">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-deep-purple">{item.text}</span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Central Phone */}
                    <div className="relative w-[280px] md:w-[320px] shrink-0">
                        <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden border-8 border-deep-purple shadow-2xl bg-white">
                            {/* Placeholder or Image from Storyblok */}
                            {blok.image?.filename ? (
                                <Image
                                    src={blok.image.filename}
                                    alt={blok.image.alt || "App Screenshot"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    Screenshot
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Side (Optional, or just another list) */}
                    <div className="flex-1 max-w-sm flex flex-col items-center md:items-start gap-6">
                        {blok.cta_text && (
                            <Button size="lg" className="w-full md:w-auto bg-ultraviolet hover:bg-ultraviolet/90 text-white shadow-lg shadow-ultraviolet/20">
                                {blok.cta_text}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureHero;
