import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function HeroSection({ blok }: { blok: any }) {
    const isSplit = blok.layout === "split_left" || blok.layout === "split_right";
    const isDark = blok.background_theme === "dark" || blok.background_theme === "gradient_purple";

    // Theme classes
    const themeClasses = {
        light: "bg-surface-sand",
        peach: "bg-surface-sand",
        dark: "bg-deep-purple text-white",
        gradient_blue: "bg-gradient-to-br from-electric-blue/10 to-transparent",
        gradient_purple: "bg-gradient-to-br from-deep-purple to-ultraviolet text-white",
    }[blok.background_theme as string] || "bg-surface-sand";

    return (
        <section
            {...storyblokEditable(blok)}
            className={cn(
                "relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32",
                themeClasses
            )}
        >
            {/* Background Decor */}
            {blok.background_theme === 'gradient_purple' && (
                <>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ultraviolet/30 blur-[100px] rounded-full mix-blend-screen" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-electric-blue/20 blur-[100px] rounded-full mix-blend-screen" />
                </>
            )}

            <div className="container mx-auto px-4">
                <div className={cn(
                    "grid gap-12 items-center",
                    isSplit ? "lg:grid-cols-2" : "text-center max-w-4xl mx-auto"
                )}>

                    {/* Text Content */}
                    <div className={cn("relative z-10 space-y-8", { "order-2": blok.layout === "split_right" })}>
                        {blok.eyebrow && (
                            <div className={cn(
                                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                                isDark ? "bg-white/10 text-mint" : "bg-deep-purple/5 text-ultraviolet"
                            )}>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                                </span>
                                {blok.eyebrow}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            {blok.headline}
                        </h1>

                        <p className={cn(
                            "text-lg md:text-xl leading-relaxed max-w-xl",
                            !isSplit && "mx-auto",
                            isDark ? "text-white/80" : "text-gray-600"
                        )}>
                            {blok.subheadline}
                        </p>

                        <div className={cn("flex flex-wrap gap-4", !isSplit && "justify-center")}>
                            {blok.cta_primary_text && (
                                <Button
                                    size="lg"
                                    variant={isDark ? "secondary" : "primary"}
                                    className="rounded-full px-8 shadow-xl shadow-ultraviolet/10 hover:shadow-ultraviolet/20 transition-all hover:scale-105"
                                >
                                    {blok.cta_primary_text}
                                </Button>
                            )}
                            {blok.cta_secondary_text && (
                                <Button
                                    size="lg"
                                    variant={isDark ? "ghost" : "outline"}
                                    className="rounded-full border-2 gap-2 group"
                                >
                                    {blok.cta_secondary_text}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            )}
                        </div>

                        {/* Optional Trust Indicators */}
                        <div className={cn(
                            "pt-4 flex items-center gap-6 text-sm font-medium",
                            !isSplit && "justify-center",
                            isDark ? "text-white/60" : "text-gray-500"
                        )}>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-mint" />
                                <span>Pediatrician Approved</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-mint" />
                                <span>Data Privacy First</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Content */}
                    {blok.visual_style === 'layered_phones_parallax' && (
                        <div className={cn(
                            "relative mx-auto w-full max-w-[500px] lg:max-w-none aspect-square lg:aspect-auto h-[400px] lg:h-[600px]",
                            { "order-1": blok.layout === "split_right" }
                        )}>
                            {/* Center Phone (Main) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[280px] z-20">
                                <div className="relative rounded-[2.5rem] border-8 border-gray-900 overflow-hidden shadow-2xl bg-white">
                                    <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl z-20 mx-auto w-32" />
                                    <Image
                                        src={blok.image_center?.filename || "/images/hero-splash.png"}
                                        alt="App Interface"
                                        width={280}
                                        height={580}
                                        className="w-full h-auto object-cover"
                                    />
                                    {/* Glow effect behind main phone */}
                                    <div className="absolute -inset-10 bg-ultraviolet/20 blur-2xl -z-10 rounded-full" />
                                </div>
                            </div>

                            {/* Left Phone (Back) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-[90%] -translate-y-[40%] w-[220px] md:w-[260px] z-10 rotate-[-12deg] opacity-90 scale-90 blur-[1px] hover:blur-0 transition-all duration-500">
                                <div className="relative rounded-[2.5rem] border-8 border-gray-900/80 overflow-hidden shadow-xl bg-white">
                                    <Image
                                        src={blok.image_left?.filename || "/images/routine-list.png"}
                                        alt="App Interface Left"
                                        width={260}
                                        height={540}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>

                            {/* Right Phone (Back) */}
                            <div className="absolute top-1/2 left-1/2 translate-x-[0%] -translate-y-[60%] w-[220px] md:w-[260px] z-10 rotate-[12deg] opacity-90 scale-90 blur-[1px] hover:blur-0 transition-all duration-500">
                                <div className="relative rounded-[2.5rem] border-8 border-gray-900/80 overflow-hidden shadow-xl bg-white">
                                    <Image
                                        src={blok.image_right?.filename || "/images/routine-detail.png"}
                                        alt="App Interface Right"
                                        width={260}
                                        height={540}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Simple Image Visual */}
                    {blok.visual_style === 'image' && blok.image?.filename && (
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={blok.image.filename}
                                alt={blok.image.alt || "Hero Image"}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
