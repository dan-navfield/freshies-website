import { Card } from '@/components/ui/Card'
import { Quote } from 'lucide-react'
import { storyblokEditable } from "@storyblok/react";

export default function HomeMission({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Mission */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold mb-6 text-deep-purple">{blok.title}</h2>
                    <p className="text-xl text-deep-purple/80 leading-relaxed">
                        {blok.mission_statement}
                    </p>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-8">
                    {blok.testimonials && blok.testimonials.map((t: any) => (
                        <Card key={t._uid} className="bg-cream p-8 relative">
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-ultraviolet/20" />
                            <p className="text-deep-purple/80 mb-6 italic">"{t.quote}"</p>
                            <div>
                                <p className="font-bold text-deep-purple">{t.author}</p>
                                <p className="text-sm text-deep-purple/60">{t.author_title}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
