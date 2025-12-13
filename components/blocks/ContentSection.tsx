import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { Check, ShieldCheck, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function ContentSection({ blok }: { blok: any }) {
    const isReverse = blok.layout === "right_text_left_image";
    const isCentered = blok.layout === "center_text";

    const bgClasses = {
        white: "bg-white",
        neutral: "bg-surface-sand", // Assumes this tailwind color exists or use hex
        light_purple: "bg-ultraviolet/5",
        dark: "bg-deep-purple text-white",
    }[blok.background_color as string] || "bg-white";

    return (
        <section
            {...storyblokEditable(blok)}
            className={cn("py-20 md:py-32", bgClasses)}
        >
            <div className="container mx-auto px-4">
                <div className={cn(
                    "max-w-7xl mx-auto",
                    !isCentered && "grid md:grid-cols-2 gap-12 lg:gap-24 items-center"
                )}>

                    {/* Text Content */}
                    <div className={cn(
                        "space-y-6",
                        isCentered && "text-center max-w-3xl mx-auto",
                        isReverse && "md:order-2"
                    )}>
                        {blok.eyebrow && (
                            <span className="text-ultraviolet font-bold text-sm tracking-widest uppercase">
                                {blok.eyebrow}
                            </span>
                        )}

                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                            {blok.headline}
                        </h2>

                        <div className={cn(
                            "text-lg md:text-xl leading-relaxed opacity-90",
                            blok.background_color === 'dark' ? "text-gray-300" : "text-gray-600"
                        )}>
                            {blok.body}
                        </div>

                        {/* Key Points List */}
                        {blok.key_points && blok.key_points.length > 0 && (
                            <ul className={cn("space-y-4 pt-4", isCentered ? "text-left inline-block" : "")}>
                                {blok.key_points.map((point: any) => (
                                    <li key={point._uid} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-mint/20 flex items-center justify-center text-mint-dark">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium">{point.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {blok.cta_text && (
                            <div className="pt-6">
                                <Button variant="primary" className="rounded-full px-8">
                                    {blok.cta_text}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Visual Side */}
                    {!isCentered && (
                        <div className={cn(
                            "relative",
                            isReverse && "md:order-1"
                        )}>
                            {/* Decorative Blobs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-mint/30 blur-3xl rounded-full -z-10" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-ultraviolet/10 blur-3xl rounded-full -z-10" />

                            {/* Standard Image */}
                            {blok.visual_element === 'image' && blok.image?.filename && (
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <Image
                                        src={blok.image.filename}
                                        alt={blok.image.alt || ""}
                                        width={600}
                                        height={600}
                                        className="w-full h-auto bg-gray-100"
                                    />
                                </div>
                            )}

                            {/* Product Scan Visualization (Special) */}
                            {blok.visual_element === 'scan_demo' && (
                                <div className="relative bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 max-w-sm mx-auto">
                                    <div className="absolute top-6 right-6 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 font-bold text-lg">92</span>
                                    </div>
                                    <div className="aspect-[3/4] bg-gray-100 rounded-2xl mb-6 relative overflow-hidden group">
                                        {/* Fake Scan Line */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-mint/50 shadow-[0_0_20px_theme(colors.mint.DEFAULT)] animate-[scan_2s_ease-in-out_infinite]" />
                                        <div className="p-8 flex items-center justify-center h-full text-gray-400">
                                            [Product Image]
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-4 w-3/4 bg-gray-100 rounded-full" />
                                        <div className="h-3 w-1/2 bg-gray-50 rounded-full" />
                                    </div>
                                </div>
                            )}

                            {/* Ingredients Floating (Special) */}
                            {blok.visual_element === 'floating_icons' && (
                                <div className="relative h-[400px] w-full">
                                    <div className="absolute top-10 left-10 bg-white p-4 rounded-xl shadow-lg animate-bounce duration-[3000ms]">
                                        <ShieldCheck className="w-8 h-8 text-ultraviolet" />
                                        <span className="block text-xs font-bold mt-2">Safety</span>
                                    </div>
                                    <div className="absolute top-1/2 right-10 bg-white p-4 rounded-xl shadow-lg animate-bounce duration-[4000ms] delay-700">
                                        <Zap className="w-8 h-8 text-mint" />
                                        <span className="block text-xs font-bold mt-2">Energy</span>
                                    </div>
                                    <div className="absolute bottom-10 left-1/3 bg-white p-4 rounded-xl shadow-lg animate-bounce duration-[3500ms] delay-300">
                                        <Heart className="w-8 h-8 text-coral" />
                                        <span className="block text-xs font-bold mt-2">Care</span>
                                    </div>
                                </div>
                            )}

                            {/* Routine Checklist (Special) */}
                            {blok.visual_element === 'routine_checklist' && (
                                <div className="relative bg-white p-8 rounded-[2rem] shadow-2xl skew-y-1">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-bold text-deep-purple">Morning Routine</h3>
                                        <div className="bg-mint/20 text-mint-dark px-3 py-1 rounded-full text-sm font-bold">4/4</div>
                                    </div>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                                <div className="w-6 h-6 rounded-full bg-mint flex items-center justify-center text-white">
                                                    <Check className="w-4 h-4" />
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded-full w-24" />
                                                <div className="ml-auto h-2 bg-gray-100 rounded-full w-8" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Shelf (Special) */}
                            {blok.visual_element === 'shelf_display' && (
                                <div className="relative pt-10">
                                    <div className="relative z-10 grid grid-cols-2 gap-4 px-8">
                                        <div className="aspect-square bg-white rounded-xl shadow-lg border border-gray-100 p-4 transform -rotate-2">
                                            <div className="w-full h-full bg-ultraviolet/10 rounded-lg flex items-center justify-center text-ultraviolet font-bold text-2xl">A</div>
                                        </div>
                                        <div className="aspect-square bg-white rounded-xl shadow-lg border border-gray-100 p-4 transform rotate-3 translate-y-4">
                                            <div className="w-full h-full bg-mint/10 rounded-lg flex items-center justify-center text-mint-dark font-bold text-2xl">B</div>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded-full mt-4 -mx-4 relative z-0 shadow-inner" />
                                    <div className="relative z-10 grid grid-cols-2 gap-4 px-8 mt-2">
                                        <div className="aspect-square bg-white rounded-xl shadow-lg border border-gray-100 p-4 transform rotate-1">
                                            <div className="w-full h-full bg-coral/10 rounded-lg flex items-center justify-center text-coral font-bold text-2xl">C</div>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded-full mt-4 -mx-4 relative z-0 shadow-inner" />
                                </div>
                            )}

                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
