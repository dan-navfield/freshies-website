import { BookOpen, Sparkles, Heart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { storyblokEditable } from "@storyblok/react";

const iconMap: any = {
    BookOpen, Sparkles, Heart, Zap
};

const bgMap: any = {
    blue: "bg-blue-500/10",
    purple: "bg-ultraviolet/10",
    mint: "bg-mint/10",
    peach: "bg-peach"
};

const textMap: any = {
    blue: "text-blue-500",
    purple: "text-ultraviolet",
    mint: "text-mint",
    peach: "text-orange-500"
};


export function LearnCategories({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-deep-purple mb-4">{blok.headline}</h2>
                    <p className="text-lg text-gray-600">
                        {blok.subheadline}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {blok.pillars?.map((pillar: any) => {
                        const Icon = iconMap[pillar.icon_name] || BookOpen;
                        const bgClass = bgMap[pillar.color_theme] || bgMap.blue;
                        const textClass = textMap[pillar.color_theme] || textMap.blue;

                        return (
                            <div
                                key={pillar._uid}
                                className="group p-6 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", bgClass)}>
                                    <Icon className={cn("w-6 h-6", textClass)} />
                                </div>

                                <h3 className="text-xl font-bold text-deep-purple mb-3">{pillar.title}</h3>
                                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                    {pillar.description}
                                </p>

                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Popular topics</p>
                                    <ul className="space-y-1">
                                        {pillar.article_links?.map((link: any) => (
                                            <li key={link._uid} className="text-sm text-deep-purple/80 hover:text-ultraviolet transition-colors">
                                                • {link.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
