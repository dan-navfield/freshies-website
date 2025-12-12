import { Scan, ClipboardCheck, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { storyblokEditable } from "@storyblok/react";

// Icons map for mapping string names from CMS to actual components
const IconMap: any = {
    Scan,
    ClipboardCheck,
    Sparkles
};

export default function HomeHowItWorks({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-deep-purple">{blok.headline}</h2>
                    <p className="text-xl text-deep-purple/60 max-w-2xl mx-auto">
                        {blok.subheadline}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {blok.steps && blok.steps.map((step: any) => {
                        const Icon = IconMap[step.icon] || Scan;
                        return (
                            <Card key={step._uid} {...storyblokEditable(step)} className="text-center p-8 hover:transform hover:-translate-y-1 transition-transform duration-300">
                                <div className={`mx-auto w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mb-6`}>
                                    <Icon className={`w-8 h-8 ${step.color || 'text-ultraviolet'}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-deep-purple">{step.title}</h3>
                                <p className="text-deep-purple/70">{step.description}</p>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
