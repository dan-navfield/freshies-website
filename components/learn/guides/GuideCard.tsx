import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";

interface GuideCardProps {
    title: string;
    slug: string;
    excerpt: string;
    read_time: string;
    audience: string;
    topic: string; // Added topic
}

export const GuideCard = ({ title, slug, excerpt, read_time, audience, topic }: GuideCardProps) => {
    return (
        <Link href={`/learn/guides/${slug}`} className="group block h-full">
            <div className="bg-white rounded-2xl p-8 h-full border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-peach-100/50 transition-all hover:-translate-y-1 flex flex-col relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-peach-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                <div className="relative">
                    <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">{topic}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {read_time}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-deep-purple font-display mb-3 group-hover:text-peach-600 transition-colors leading-tight">
                        {title}
                    </h3>

                    <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                        {excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <span className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <Users size={16} /> {audience}
                        </span>
                        <span className="flex items-center text-sm font-bold text-deep-purple group-hover:text-peach-600 transition-colors">
                            Read Guide <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
