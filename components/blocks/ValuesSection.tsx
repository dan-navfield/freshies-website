import { storyblokEditable } from "@storyblok/react";
import { cn } from "@/lib/utils";
import { Heart, ShieldCheck, Sun } from "lucide-react";

export default function ValuesSection({ blok }: { blok: any }) {
    const icons = {
        heart: Heart,
        shield: ShieldCheck,
        sun: Sun
    };

    return (
        <section
            {...storyblokEditable(blok)}
            className="py-24 relative overflow-hidden"
        >
            {/* Vibrant Background */}
            <div className="absolute inset-0 bg-surface-sand z-0" />

            {/* Decorative Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mint/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-ultraviolet/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-deep-purple mb-6">{blok.headline}</h2>
                    <p className="text-xl text-gray-700 leading-relaxed">{blok.subheadline}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {blok.values?.map((value: any, index: number) => {
                        // Simple color rotation
                        const colors = [
                            "bg-white border-mint text-mint-dark",
                            "bg-white border-ultraviolet text-ultraviolet",
                            "bg-white border-coral text-coral"
                        ];
                        const accentColor = colors[index % colors.length];
                        const Icon = (icons as any)[value.icon] || Heart;

                        return (
                            <div
                                key={value._uid}
                                className={cn(
                                    "p-8 rounded-3xl border-2 shadow-xl transition-all duration-300 hover:-translate-y-2",
                                    accentColor
                                )}
                            >
                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-current/10 text-current">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {value.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
