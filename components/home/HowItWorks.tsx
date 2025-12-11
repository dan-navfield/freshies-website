import { Scan, ClipboardCheck, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const steps = [
    {
        icon: Scan,
        title: 'Scan a Product',
        description: 'Use your camera to instantly scan skincare ingredients.',
        color: 'text-ultraviolet'
    },
    {
        icon: ClipboardCheck,
        title: 'Get Your Score',
        description: 'See a clear 0-100 safety score and risk analysis.',
        color: 'text-mint'
    },
    {
        icon: Sparkles,
        title: 'Build Your Routine',
        description: 'Add safe products to your daily morning and night routine.',
        color: 'text-peach'
    }

]

export function HowItWorks() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-deep-purple">How Freshies Works</h2>
                    <p className="text-xl text-deep-purple/60 max-w-2xl mx-auto">
                        Three simple steps to safer, happier skin for your family.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <Card key={index} className="text-center p-8 hover:transform hover:-translate-y-1 transition-transform duration-300">
                            <div className={`mx-auto w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mb-6`}>
                                <step.icon className={`w-8 h-8 ${step.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-deep-purple">{step.title}</h3>
                            <p className="text-deep-purple/70">{step.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
