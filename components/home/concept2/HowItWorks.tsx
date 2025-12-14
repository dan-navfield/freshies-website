import { storyblokEditable } from "@storyblok/react";
import { ArrowRight } from "lucide-react";

export default function HowItWorks({ blok }: { blok: any }) {
    const steps = ["Scan", "Learn", "Decide", "Build habits"];

    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-deep-purple text-white relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-ultraviolet opacity-20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-mint opacity-10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">{blok.headline || "Designed to work together."}</h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto mb-16 leading-relaxed">
                    {blok.body || "Freshies connects scanning, learning and routines into one calm experience. Scan a product, understand what’s inside, and turn good choices into healthy habits your kids can build on."}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                    {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-6 md:gap-12">
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-xl font-bold mb-4 shadow-lg group hover:scale-105 transition-transform duration-300">
                                    {/* Icons could go here, text for now */}
                                    {i + 1}
                                </div>
                                <span className="text-lg font-bold">{step}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <ArrowRight className="text-white/30 hidden md:block" />
                            )}
                            {/* Vertical arrow for mobile */}
                            {i < steps.length - 1 && (
                                <ArrowRight className="text-white/30 md:hidden rotate-90" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
