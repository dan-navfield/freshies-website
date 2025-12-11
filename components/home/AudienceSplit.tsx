import { Button } from '@/components/ui/Button'
import { ShieldCheck, Zap } from 'lucide-react'

export function AudienceSplit() {
    return (
        <section className="py-24 bg-cream">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Parents Side */}
                    <div className="bg-white rounded-3xl p-10 shadow-sm border border-black/5">
                        <div className="w-12 h-12 bg-ultraviolet/10 rounded-xl flex items-center justify-center mb-6">
                            <ShieldCheck className="w-6 h-6 text-ultraviolet" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-deep-purple">For Parents</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-ultraviolet mt-2.5" />
                                <span className="text-deep-purple/80">Understand exactly what's in your child's products</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-ultraviolet mt-2.5" />
                                <span className="text-deep-purple/80">Protect young skin from irritants and harsh chemicals</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-ultraviolet mt-2.5" />
                                <span className="text-deep-purple/80">Monitor routines and build healthy habits together</span>
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full sm:w-auto">Parent Features</Button>
                    </div>

                    {/* Teens Side */}
                    <div className="bg-deep-purple rounded-3xl p-10 shadow-xl text-white relative overflow-hidden">
                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-mint/20 blur-3xl rounded-full" />

                        <div className="w-12 h-12 bg-mint/20 rounded-xl flex items-center justify-center mb-6 relative z-10">
                            <Zap className="w-6 h-6 text-mint" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-white relative z-10">For Teens</h3>
                        <ul className="space-y-4 mb-8 relative z-10">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2.5" />
                                <span className="text-white/80">Build your own streak and earn badges</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2.5" />
                                <span className="text-white/80">Find products that actually work for your skin</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2.5" />
                                <span className="text-white/80">Simple routines that take less than 5 minutes</span>
                            </li>
                        </ul>
                        <Button variant="secondary" className="w-full sm:w-auto relative z-10">Teen Features</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
