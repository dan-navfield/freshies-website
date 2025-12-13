import { ArrowRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { storyblokEditable } from "@storyblok/react";

const colorMap: any = {
    safe: "bg-green-100 text-green-700 border-green-200",
    caution: "bg-orange-100 text-orange-700 border-orange-200",
    depends: "bg-yellow-100 text-yellow-700 border-yellow-200"
};

export function LearnIngredients({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-20 border-y border-gray-100 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold text-deep-purple mb-4">{blok.headline}</h2>
                        <p className="text-lg text-gray-600">
                            {blok.subheadline}
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Safe</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Caution</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Avoid</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {blok.ingredients?.map((ing: any) => (
                        <div
                            key={ing._uid}
                            className="group p-5 rounded-xl border border-gray-200 bg-white hover:border-ultraviolet/30 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-lg text-deep-purple">{ing.name}</h3>
                                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border", colorMap[ing.status] || colorMap.safe)}>
                                        {ing.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">{ing.description}</p>
                            </div>

                            {/* Hover reveal */}
                            <div className="absolute right-4 bottom-4 opacity-0 transform translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                <ArrowRight className="w-5 h-5 text-ultraviolet" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
