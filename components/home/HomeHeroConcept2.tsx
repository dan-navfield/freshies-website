"use client";
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export default function HomeHeroConcept2() {
    return (
        <section className="relative min-h-[90vh] flex flex-col md:flex-row bg-mint/10">
            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-20 md:py-0 bg-[#E0F7F6]">
                <div className="max-w-xl">
                    <span className="text-deep-purple/80 font-medium mb-4 block text-lg">
                        The Skincare App for Families
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-deep-purple mb-8 leading-tight tracking-tight font-display">
                        Find what works.<br />
                        <span className="text-ultraviolet">Fast.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-deep-purple/70 mb-10 max-w-md leading-relaxed">
                        Think routines, not battles. Build healthy habits, scan products for safety, and learn together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="bg-ultraviolet hover:bg-ultraviolet/90 text-white rounded-full px-10 h-14 text-lg">
                            Get Freshies
                        </Button>
                        <Button size="lg" variant="ghost" className="text-deep-purple hover:bg-deep-purple/5 rounded-full px-8 h-14 text-lg">
                            Learn More
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
