import { Card } from '@/components/ui/Card'
import { Quote } from 'lucide-react'

export function MissionTestimonials() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Mission */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold mb-6 text-deep-purple">Our Mission</h2>
                    <p className="text-xl text-deep-purple/80 leading-relaxed">
                        Freshies was built to bridge the gap between scientific safety and teenage fun. We believe every family deserves to navigate the skincare world with confidence, clarity, and a little bit of sparkle.
                    </p>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="bg-cream p-8 relative">
                        <Quote className="absolute top-6 right-6 w-8 h-8 text-ultraviolet/20" />
                        <p className="text-deep-purple/80 mb-6 italic">"Finally, an app that explains ingredients in a way my 13-year-old actually cares about. The scanning is a game changer."</p>
                        <div>
                            <p className="font-bold text-deep-purple">Sarah J.</p>
                            <p className="text-sm text-deep-purple/60">Mom of two</p>
                        </div>
                    </Card>
                    <Card className="bg-cream p-8 relative">
                        <Quote className="absolute top-6 right-6 w-8 h-8 text-ultraviolet/20" />
                        <p className="text-deep-purple/80 mb-6 italic">"I love checking my streak! And my skin has actually cleared up since I stopped using random TikTok products."</p>
                        <div>
                            <p className="font-bold text-deep-purple">Mia</p>
                            <p className="text-sm text-deep-purple/60">Age 14</p>
                        </div>
                    </Card>
                    <Card className="bg-cream p-8 relative">
                        <Quote className="absolute top-6 right-6 w-8 h-8 text-ultraviolet/20" />
                        <p className="text-deep-purple/80 mb-6 italic">"The safety scores are so easy to understand. It takes the stress out of shopping for skincare."</p>
                        <div>
                            <p className="font-bold text-deep-purple">David L.</p>
                            <p className="text-sm text-deep-purple/60">Dad</p>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
