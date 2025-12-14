import { storyblokEditable } from "@storyblok/react";
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export default function HomeHeroConcept2({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="relative min-h-[90vh] flex flex-col md:flex-row bg-mint/10">
            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-20 md:py-0 bg-[#E0F7F6]">
                <div className="max-w-xl">
                    {blok.eyebrow && (
                        <div className="inline-flex items-center gap-2 bg-ultraviolet/5 rounded-full px-4 py-1.5 mb-6">
                            <div className="w-2 h-2 rounded-full bg-ultraviolet"></div>
                            <span className="text-ultraviolet font-medium text-sm">
                                {blok.eyebrow}
                            </span>
                        </div>
                    )}
                    <h1 className="text-5xl md:text-7xl font-bold text-deep-purple mb-6 leading-[1.1] tracking-tight font-display">
                        {blok.headline || "Smarter skincare choices, made together."}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-normal">
                        {blok.subheadline || "Think routines, not battles. Build healthy habits, scan products for safety, and learn together."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="bg-ultraviolet hover:bg-ultraviolet/90 text-white rounded-full px-10 h-14 text-lg">
                            {blok.cta_primary_text || "Get Freshies"}
                        </Button>
                        <Button size="lg" variant="ghost" className="text-deep-purple hover:bg-deep-purple/5 rounded-full px-8 h-14 text-lg">
                            {blok.cta_secondary_text || "Learn More"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-full bg-deep-purple">
                <Image
                    src="/images/home-hero2.png"
                    alt="Kid using Freshies app"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay gradient for text readability if needed, though image is solid */}
                <div className="absolute inset-0 bg-deep-purple/10 mix-blend-multiply md:hidden"></div>
            </div>
        </section>
    )
}
