import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { Scan, Sparkles, BookOpen, Library } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

const IconMap = {
    scan: Scan,
    sparkles: Sparkles,
    book: BookOpen,
    library: Library,
};

export default function FeatureGrid({ blok }: { blok: any }) {
    const gridCols = {
        '2': 'md:grid-cols-2 max-w-4xl',
        '3': 'md:grid-cols-3 max-w-6xl',
        '4': 'md:grid-cols-2 lg:grid-cols-4 max-w-7xl',
    }[blok.columns as string] || 'md:grid-cols-3';

    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-white">
            <div className="container mx-auto px-4">

                {(blok.headline || blok.subheadline) && (
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        {blok.headline && <h2 className="text-4xl font-bold">{blok.headline}</h2>}
                        {blok.subheadline && <p className="text-gray-600 text-lg">{blok.subheadline}</p>}
                    </div>
                )}

                <div className={cn("grid gap-6 mx-auto", gridCols)}>
                    {blok.cards && blok.cards.map((card: any) => {
                        const Icon = IconMap[card.icon as keyof typeof IconMap] || Sparkles;
                        return (
                            <Card
                                key={card._uid}
                                className="group hover:-translate-y-2 transition-transform duration-300 border border-gray-100 hover:shadow-xl hover:border-ultraviolet/20"
                            >
                                <div className="w-12 h-12 rounded-xl bg-ultraviolet/5 flex items-center justify-center mb-6 group-hover:bg-ultraviolet group-hover:text-white transition-colors duration-300">
                                    <Icon className="w-6 h-6 text-ultraviolet group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {card.description}
                                </p>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
