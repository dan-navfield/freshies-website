import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Calendar, Package } from 'lucide-react'
import Image from 'next/image'

export function FeatureHighlights() {
    return (
        <section className="py-24 bg-deep-purple text-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute w-96 h-96 bg-mint rounded-full blur-[128px] top-0 left-0" />
                <div className="absolute w-96 h-96 bg-ultraviolet rounded-full blur-[128px] bottom-0 right-0" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-white">More than just scanning</h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Build healthy habits and manage better choices for the whole family.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Routines Feature */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-8 hover:bg-white/10 transition-colors overflow-hidden relative group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-ultraviolet rounded-xl flex items-center justify-center mb-6">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Daily Routines</h3>
                            <p className="text-white/70 mb-6">
                                Create simple, actionable morning and night routines. Track streaks, earn badges, and make skincare fun without the fuss.
                            </p>
                        </div>
                        <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg mt-4 group-hover:scale-105 transition-transform duration-500 origin-top">
                            <Image
                                src="/images/routine-list.png"
                                alt="Daily Routines"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </Card>

                    {/* Cupboard Feature */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-8 hover:bg-white/10 transition-colors overflow-hidden relative group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center mb-6">
                                <Package className="w-6 h-6 text-deep-purple" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">My Cupboard</h3>
                            <p className="text-white/70 mb-6">
                                Digitize your bathroom cabinet. Keep track of what you own, check expiration dates, and see what works best for your skin profile.
                            </p>
                        </div>
                        <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg mt-4 group-hover:scale-105 transition-transform duration-500 origin-top">
                            <Image
                                src="/images/routine-detail.png"
                                alt="My Skin Profile"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
