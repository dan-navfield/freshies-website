import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { Clock, Users, Tag } from "lucide-react";

export const GuidePage = ({ blok }: { blok: any }) => {
    return (
        <div {...storyblokEditable(blok)} className="max-w-3xl mx-auto px-6 py-12 md:py-20">
            {/* Header */}
            <div className="mb-12 text-center md:text-left">
                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={14} /> {blok.read_time}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {blok.audience}</span>
                    <span className="flex items-center gap-1"><Tag size={14} /> {blok.topic}</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold font-display text-deep-purple mb-6 leading-tight">
                    {blok.title}
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-peach-400 pl-4 italic">
                    {blok.intro}
                </p>
            </div>

            {/* Body Content */}
            <div className="prose prose-lg prose-slate max-w-none">
                {/* Render blocks dynamically */}
                {blok.body && blok.body.map((nestedBlok: any) => (
                    <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                ))}
            </div>

            {/* Footer / CTA Area */}
            <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                <h3 className="text-xl font-bold text-deep-purple mb-2">Did you find this helpful?</h3>
                <p className="text-slate-500 mb-6">Create a free account to unlock more guides and personalized tips.</p>
                <button className="bg-deep-purple text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
                    Create Free Account
                </button>
            </div>
        </div>
    );
};
