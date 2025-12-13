import { ChevronDown, ChevronUp } from "lucide-react";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

export const TrendPage = ({ blok }: { blok: any }) => {
    // This is for the DETAIL PAGE view
    return (
        <div {...storyblokEditable(blok)} className="max-w-3xl mx-auto px-6 py-12">
            <div className="bg-peach-50 rounded-3xl p-8 md:p-12">
                <span className="inline-block bg-white text-peach-800 px-3 py-1 rounded-full text-sm font-bold mb-6">
                    {blok.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold font-display text-deep-purple mb-8 leading-tight">
                    {blok.question}
                </h1>
                <div className="prose prose-lg text-slate-700">
                    <p>{blok.full_answer}</p>
                </div>
            </div>
        </div>
    );
};
