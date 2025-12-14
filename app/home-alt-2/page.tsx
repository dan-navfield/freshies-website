import HomeHeroConcept2 from "@/components/home/HomeHeroConcept2";
import FeatureMarquee from "@/components/home/FeatureMarquee";
import { getStoryblokApi } from "@/lib/storyblok";
import StoryblokPage from "@/components/StoryblokPage"; // Fallback to reusing chunks of the main page if needed, but for now completely custom top

export default async function HomeAlt2() {
    // We might still want to fetch Storyblok data for the rest of the page (footer, sections below hero)
    // For this concept, we'll keep it simple and just show the new header + maybe some existing blocks if reachable.

    // Fetch home content just to see if we can reuse blocks?
    // Actually, let's keep it clean as a concept showcase focused on the header.
    // User asked for "completely different header".

    return (
        <div className="bg-cream min-h-screen">
            <HomeHeroConcept2 />
            <FeatureMarquee />

            <div className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-3xl font-bold text-deep-purple mb-4">Concept 2 Demo</h2>
                <p className="text-slate-600">This is a layout variation focusing on maximum visual impact.</p>
            </div>
        </div>
    );
}
