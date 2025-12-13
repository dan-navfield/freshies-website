import { getStoryblokApi } from "@/lib/storyblok";
import { GuideCard } from "@/components/learn/guides/GuideCard";

export const revalidate = 3600;

async function getGuides() {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
        version: "draft",
        starts_with: "guides/",
        is_startpage: false,
    });
    return data.stories;
}

export default async function GuidesIndex() {
    const guides = await getGuides();

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-deep-purple mb-6 font-display">
                        Guides for every stage.
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Expert-backed advice on routines, sun safety, and building healthy habits for life.
                    </p>
                </div>

                {/* Filter Bar (Placeholder) */}
                <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
                    {["All Guides", "For Parents", "For Kids", "For Teens"].map((filter, i) => (
                        <button key={i} className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${i === 0 ? 'bg-deep-purple text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guides.map((story: any) => (
                        <GuideCard
                            key={story.uuid}
                            title={story.content.title || story.name}
                            slug={story.slug}
                            excerpt={story.content.excerpt}
                            read_time={story.content.read_time}
                            audience={story.content.audience}
                            topic={story.content.topic}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}
