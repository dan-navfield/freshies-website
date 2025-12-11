import { Hero } from '@/components/home/Hero'
import { HowItWorks } from '@/components/home/HowItWorks'
import { AudienceSplit } from '@/components/home/AudienceSplit'
import { IngredientSafety } from '@/components/home/IngredientSafety'
import { FeatureHighlights } from '@/components/home/FeatureHighlights'
import { MissionTestimonials } from '@/components/home/MissionTestimonials'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <HowItWorks />
      <AudienceSplit />
      <IngredientSafety />
      <FeatureHighlights />
      <MissionTestimonials />
      <FinalCTA />
    </main>
  );
}
