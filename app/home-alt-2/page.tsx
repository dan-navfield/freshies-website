import HomeHeroConcept2 from "@/components/home/HomeHeroConcept2";
import FeatureMarquee from "@/components/home/FeatureMarquee";
import ProblemFraming from "@/components/home/concept2/ProblemFraming";
import FeatureOverview from "@/components/home/concept2/FeatureOverview";
import DeepDives from "@/components/home/concept2/DeepDives";
import HowItWorks from "@/components/home/concept2/HowItWorks";
import KidsJourney from "@/components/home/concept2/KidsJourney";
import { SocialProof, TrustReassurance, FinalCta } from "@/components/home/concept2/SupportingSections";
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
            <ProblemFraming />
            <FeatureOverview />
            <DeepDives />
            <HowItWorks />
            <KidsJourney />
            <SocialProof />
            <TrustReassurance />
            <FinalCta />
        </div>
    );
}
