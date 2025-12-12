import { Button } from '@/components/ui/Button'
import { ShieldCheck, Zap } from 'lucide-react'
import { storyblokEditable } from "@storyblok/react";

export default function HomeAudienceSplit({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-cream">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Parents Side */}
                    <div className="bg-white rounded-3xl p-10 shadow-sm border border-black/5">
                        <div className="w-12 h-12 bg-ultraviolet/10 rounded-xl flex items-center justify-center mb-6">
                            <ShieldCheck className="w-6 h-6 text-ultraviolet" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-deep-purple">{blok.parents_title}</h3>
                        <ul className="space-y-4 mb-8">
                            {blok.parents_bullets && blok.parents_bullets.map((item: any) => (
                                <li key={item._uid} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-ultraviolet mt-2.5" />
                                    <span className="text-deep-purple/80">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" className="w-full sm:w-auto">{blok.parents_cta_text}</Button>
                    </div>

                    {/* Teens Side */}
                    <div className="bg-deep-purple rounded-3xl p-10 shadow-xl text-white relative overflow-hidden">
                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-mint/20 blur-3xl rounded-full" />

                        <div className="w-12 h-12 bg-mint/20 rounded-xl flex items-center justify-center mb-6 relative z-10">
                            <Zap className="w-6 h-6 text-mint" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-white relative z-10">{blok.teens_title}</h3>
                        <ul className="space-y-4 mb-8 relative z-10">
                            {blok.teens_bullets && blok.teens_bullets.map((item: any) => (
                                <li key={item._uid} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2.5" />
                                    <span className="text-white/80">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <Button variant="secondary" className="w-full sm:w-auto relative z-10">{blok.teens_cta_text}</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
