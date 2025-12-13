"use client";
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function TestimonialCarousel({ blok }: { blok: any }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const testimonials = blok.testimonials || [];

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    if (testimonials.length === 0) return null;

    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-deep-purple text-white overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute w-[800px] h-[800px] bg-ultraviolet rounded-full blur-[128px] -top-64 -left-64 mix-blend-screen" />
                <div className="absolute w-[600px] h-[600px] bg-mint rounded-full blur-[128px] top-1/2 right-0 mix-blend-screen opacity-60" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-12 inline-block p-4 rounded-full bg-white/10 text-mint">
                        <Quote className="w-8 h-8 fill-current" />
                    </div>

                    <div className="relative min-h-[300px]">
                        {testimonials.map((t: any, idx: number) => (
                            <div
                                key={t._uid}
                                className={cn(
                                    "absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform",
                                    idx === activeIndex
                                        ? "opacity-100 translate-x-0 scale-100"
                                        : "opacity-0 translate-x-12 scale-95 pointer-events-none"
                                )}
                            >
                                <blockquote className="text-2xl md:text-4xl font-medium leading-tight mb-8">
                                    "{t.quote}"
                                </blockquote>
                                <div className="flex items-center justify-center gap-4">
                                    {t.image?.filename && (
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                                            <Image
                                                src={t.image.filename}
                                                alt={t.name || ""}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="text-left">
                                        <div className="font-bold text-lg">{t.name}</div>
                                        <div className="text-white/60 text-sm">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-12">
                        {testimonials.map((_: any, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-all duration-300",
                                    idx === activeIndex ? "bg-mint w-8" : "bg-white/20 hover:bg-white/40"
                                )}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
