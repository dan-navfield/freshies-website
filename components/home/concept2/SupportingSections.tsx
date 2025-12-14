import { Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SocialProof() {
    const testimonials = [
        {
            text: "Finally an app that explains ingredients in a way my kids and I both understand. Scanning products has changed how we shop.",
            author: "Sarah, parent of two"
        },
        {
            text: "I like checking my routine and my streak. My skin feels better now.",
            author: "Mia, age 11"
        },
        {
            text: "The safety score makes it easy to decide what’s okay and what’s not. It takes the stress out of skincare.",
            author: "David, dad"
        },
    ];

    return (
        <section className="py-24 bg-mint/10">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-deep-purple mb-16 font-display">Loved by families.</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                            <Quote className="absolute top-6 left-6 text-mint/30 w-8 h-8 rotate-180" />
                            <p className="text-slate-700 italic mb-6 relative z-10 leading-relaxed pt-6">"{t.text}"</p>
                            <p className="font-bold text-deep-purple">{t.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function TrustReassurance() {
    return (
        <section className="py-20 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-deep-purple mb-12 font-display">Built with care.</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    {[
                        "Written for families, not influencers",
                        "Focused on developing skin",
                        "Not medical advice, but informed guidance",
                        "Privacy and child safety first"
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-ultraviolet"></div>
                            <span className="font-medium text-slate-700">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FinalCta() {
    return (
        <section className="py-32 bg-ultraviolet text-white text-center">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-5xl font-bold mb-6 font-display">Ready to make skincare simpler for your family?</h2>
                <p className="text-xl text-white/80 mb-10">Join families using Freshies to make safer, smarter skincare choices together.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-ultraviolet hover:bg-white/90 px-10 h-14 text-lg">
                        Download the app
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 h-14 text-lg">
                        Explore Learn
                    </Button>
                </div>
            </div>
        </section>
    );
}
