import { storyblokEditable } from "@storyblok/react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function PricingTable({ blok }: { blok: any }) {
    return (
        <section
            {...storyblokEditable(blok)}
            className="py-24 bg-surface-sand/30"
        >
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-deep-purple">{blok.headline}</h2>
                    <p className="text-lg text-gray-600">{blok.subheadline}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {blok.tiers?.map((tier: any) => {
                        const isPopular = tier.is_featured;
                        return (
                            <div
                                key={tier._uid}
                                className={cn(
                                    "relative rounded-3xl p-8 bg-white border-2 flex flex-col transition-transform duration-300 hover:-translate-y-2",
                                    isPopular ? "border-ultraviolet shadow-xl scale-105 z-10" : "border-gray-100 shadow-lg text-gray-600"
                                )}
                            >
                                {isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ultraviolet text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-deep-purple">{tier.price}</span>
                                        {tier.period && <span className="text-sm text-gray-500">/{tier.period}</span>}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2 min-h-[40px]">{tier.description}</p>
                                </div>

                                <div className="space-y-4 mb-8 flex-1">
                                    {tier.features?.map((feature: any) => (
                                        <div key={feature._uid} className="flex items-start gap-3 text-sm">
                                            <div className={cn(
                                                "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                                                feature.included ? "bg-mint/20 text-mint-dark" : "bg-gray-100 text-gray-400"
                                            )}>
                                                {feature.included ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                            </div>
                                            <span className={cn(!feature.included && "text-gray-400 line-through")}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className="w-full"
                                    variant={isPopular ? "primary" : "outline"}
                                >
                                    {tier.cta_text || "Get Started"}
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
