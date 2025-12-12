"use client";

import { useState } from "react";
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { Scan, Sparkles, BookOpen, Library, Check, ShieldCheck, Zap, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const IconMap = {
    scan: Scan,
    sparkles: Sparkles,
    book: BookOpen,
    library: Library,
};

export default function InteractiveFeatureShowcase({ blok }: { blok: any }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const features = blok.features || [];
    const activeFeature = features[activeIndex];

    // Debug log to verify HMR
    console.log("Rendering InteractiveFeatureShowcase with theme:", blok.background_color || "default");

    // Safety check if no features
    if (!activeFeature) return null;

    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-deep-purple text-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute w-[800px] h-[800px] bg-ultraviolet rounded-full blur-[128px] -top-64 -left-64 mix-blend-screen" />
                <div className="absolute w-[600px] h-[600px] bg-mint rounded-full blur-[128px] top-1/2 right-0 mix-blend-screen opacity-60" />
                <div className="absolute w-[600px] h-[600px] bg-coral rounded-full blur-[128px] -bottom-32 left-1/4 mix-blend-screen opacity-40" />
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                {(blok.headline || blok.subheadline) && (
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                        {blok.headline && <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{blok.headline}</h2>}
                        {blok.subheadline && <p className="text-white/80 text-xl leading-relaxed">{blok.subheadline}</p>}
                    </div>
                )}

                {/* 1. Top Tabs (Grid of Cards) */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mb-16">
                    {features.map((feature: any, index: number) => {
                        const Icon = IconMap[feature.tab_icon as keyof typeof IconMap] || Sparkles;
                        const isActive = index === activeIndex;

                        return (
                            <button
                                key={feature._uid}
                                onClick={() => setActiveIndex(index)}
                                className="text-left w-full focus:outline-none group"
                            >
                                <Card
                                    className={cn(
                                        "h-full p-6 transition-all duration-300 border backdrop-blur-md",
                                        isActive
                                            ? "bg-white text-deep-purple border-white shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] scale-[1.02]"
                                            : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20"
                                    )}
                                >
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                                        isActive ? "bg-ultraviolet/10 text-ultraviolet" : "bg-white/10 text-white group-hover:bg-white/20"
                                    )}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className={cn("text-lg font-bold mb-2", isActive ? "text-deep-purple" : "text-white")}>
                                        {feature.tab_title}
                                    </h3>
                                    <p className={cn("text-sm leading-snug", isActive ? "text-gray-600" : "text-white/60")}>
                                        {feature.tab_description}
                                    </p>
                                </Card>
                            </button>
                        );
                    })}
                </div>

                {/* 2. Bottom Content Area (Dynamic) */}
                <div className="relative min-h-[500px] overflow-hidden rounded-[2.5rem] bg-white border border-white/20 shadow-2xl p-8 md:p-12 lg:p-16 transition-all duration-500">
                    {features.map((feature: any, index: number) => {
                        const isVisible = index === activeIndex;
                        if (!isVisible) return null;

                        const isScanDemo = feature.visual_style === 'scan_demo';
                        const isFloatingIcons = feature.visual_style === 'floating_icons';

                        return (
                            <div
                                key={feature._uid}
                                className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center animate-in fade-in slide-in-from-bottom-4 duration-500"
                            >
                                {/* Text Side */}
                                <div className="space-y-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ultraviolet/5 text-ultraviolet text-sm font-bold tracking-wide uppercase">
                                        {feature.tab_icon && <IconMapComponent iconName={feature.tab_icon} className="w-4 h-4" />}
                                        <span>{feature.tab_title}</span>
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-deep-purple">
                                        {feature.headline}
                                    </h3>
                                    <div className="text-xl text-gray-600 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: feature.body?.html || feature.body || "" }}
                                    />

                                    {feature.key_points && feature.key_points.length > 0 && (
                                        <ul className="space-y-4 pt-2">
                                            {feature.key_points.map((point: any) => (
                                                <li key={point._uid} className="flex items-start gap-4">
                                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-mint flex items-center justify-center text-deep-purple shadow-sm">
                                                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                                                    </div>
                                                    <span className="font-medium text-lg text-gray-700">{point.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {feature.cta_text && (
                                        <div className="pt-4">
                                            <Button variant="primary" className="rounded-full px-10 py-6 text-lg shadow-xl shadow-ultraviolet/20 hover:shadow-ultraviolet/30 transition-all">
                                                {feature.cta_text}
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Visual Side */}
                                <div className="relative flex justify-center">
                                    {/* Default Image */}
                                    {!isScanDemo && !isFloatingIcons && feature.image?.filename && (
                                        <div className="relative w-full max-w-[500px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-purple-900/10 rotate-1 group-hover:rotate-0 transition-all duration-500 ring-8 ring-white">
                                            <Image
                                                src={feature.image.filename}
                                                alt={feature.image.alt || ""}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Component Visuals */}
                                    {isScanDemo && (
                                        <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl border border-gray-100 w-full max-w-sm ring-8 ring-white/50 relative z-10">
                                            <div className="absolute top-6 right-6 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                                                <span className="text-green-600 font-bold text-xl">92</span>
                                            </div>
                                            <div className="aspect-[3/4] bg-gray-50 rounded-[1.5rem] mb-6 relative overflow-hidden group shadow-inner">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-mint/50 shadow-[0_0_20px_theme(colors.mint.DEFAULT)] animate-[scan_2s_ease-in-out_infinite]" />
                                                <div className="p-8 flex items-center justify-center h-full text-gray-300 font-medium">
                                                    Product Preview
                                                </div>
                                            </div>
                                            <div className="space-y-4 px-2 pb-2">
                                                <div className="h-5 w-3/4 bg-gray-100 rounded-full" />
                                                <div className="h-3 w-1/2 bg-gray-50 rounded-full" />
                                                <div className="h-3 w-2/3 bg-gray-50 rounded-full" />
                                            </div>
                                        </div>
                                    )}

                                    {isFloatingIcons && (
                                        <div className="relative h-[400px] w-full max-w-md">
                                            <div className="absolute top-10 left-4 bg-white p-6 rounded-[2rem] shadow-xl text-center min-w-[120px] animate-bounce duration-[3000ms]">
                                                <ShieldCheck className="w-12 h-12 text-ultraviolet mx-auto mb-2" />
                                                <span className="block text-sm font-bold text-gray-800">Safety</span>
                                            </div>
                                            <div className="absolute top-1/2 right-0 bg-white p-6 rounded-[2rem] shadow-xl text-center min-w-[120px] animate-bounce duration-[4000ms] delay-700">
                                                <Zap className="w-12 h-12 text-mint mx-auto mb-2" />
                                                <span className="block text-sm font-bold text-gray-800">Energy</span>
                                            </div>
                                            <div className="absolute bottom-10 left-1/3 bg-white p-6 rounded-[2rem] shadow-xl text-center min-w-[120px] animate-bounce duration-[3500ms] delay-300">
                                                <Heart className="w-12 h-12 text-coral mx-auto mb-2" />
                                                <span className="block text-sm font-bold text-gray-800">Care</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Helper to render icon dynamically
function IconMapComponent({ iconName, className }: { iconName: string, className?: string }) {
    const Icon = IconMap[iconName as keyof typeof IconMap];
    if (!Icon) return null;
    return <Icon className={className} />;
}
