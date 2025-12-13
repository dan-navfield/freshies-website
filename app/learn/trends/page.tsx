import { getStoryblokApi } from "@/lib/storyblok";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const revalidate = 3600;

async function getTrends() {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
        version: "draft",
        starts_with: "trends/",
        is_startpage: false,
    });
    return data.stories;
}

export default async function TrendsIndex() {
    const trends = await getTrends();

    // Group by category
    const categorizedTrends: Record<string, any[]> = {};
    trends.forEach((trend: any) => {
        const category = trend.content.category || "General";
        if (!categorizedTrends[category]) {
            categorizedTrends[category] = [];
        }
        categorizedTrends[category].push(trend);
    });

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-deep-purple mb-6 font-display">
                        Trends & Questions
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Separating facts from fads. Answers to the questions kids are asking.
                    </p>
                </div>

                {/* Categories */}
                <div className="max-w-4xl mx-auto space-y-16">
                    {Object.keys(categorizedTrends).map((category) => (
                        <section key={category}>
                            <h2 className="text-2xl font-bold text-deep-purple mb-6 flex items-center gap-2">
                                <MessageCircle className="text-peach-500" />
                                {category}
                            </h2>

                            <div className="grid gap-4">
                                {categorizedTrends[category].map((story: any) => (
                                    <Link href={`/learn/trends/${story.slug}`} key={story.uuid} className="group">
                                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-peach-300">
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-peach-600 transition-colors mb-2">
                                                {story.content.question}
                                            </h3>
                                            <p className="text-slate-600 group-hover:text-slate-700">
                                                {story.content.answer_preview}
                                            </p>
                                            <div className="mt-4 flex items-center text-sm font-semibold text-deep-purple opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                                Read full answer <ArrowRight size={14} className="ml-1" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

            </div>
        </div>
    );
}
