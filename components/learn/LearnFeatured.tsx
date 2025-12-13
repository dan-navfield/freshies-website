import { ArrowRight, Clock } from "lucide-react";
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function LearnFeatured({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-20 bg-surface-sand/30">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-deep-purple mb-2">{blok.headline}</h2>
                        <p className="text-gray-600">{blok.subheadline}</p>
                    </div>
                    {/* Hidden on mobile, shown on desktop */}
                    <Button variant="ghost" className="hidden md:flex gap-2 text-ultraviolet">
                        View all articles <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {blok.articles?.map((article: any) => (
                        <article key={article._uid} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="h-48 bg-gray-200 relative overflow-hidden">
                                {article.image?.filename && (
                                    <Image
                                        src={article.image.filename}
                                        alt={article.image.alt || article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-deep-purple/5 group-hover:bg-deep-purple/10 transition-colors" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-deep-purple uppercase tracking-wider">
                                    {article.tag}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-deep-purple mb-3 group-hover:text-ultraviolet transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                    {article.excerpt}
                                </p>

                                <div className="flex items-center text-xs text-gray-400 font-medium pt-4 border-t border-gray-100">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {article.read_time}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Button variant="ghost" className="gap-2 text-ultraviolet">
                        View all articles <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
