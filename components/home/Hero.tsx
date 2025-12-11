import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function Hero() {
    return (
        <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-white to-cream">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-mint/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-ultraviolet/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-ultraviolet/10 text-ultraviolet text-sm font-semibold mb-6">
                        Skincare made for you
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                        Your family's journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-ultraviolet to-mint">healthier, glowing skin</span> starts here.
                    </h1>
                    <p className="text-xl text-deep-purple/70 mb-8 max-w-2xl mx-auto">
                        Scan products instantly, build personalized routines, and learn about ingredients with the app designed for modern families.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                            Download on iOS
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                            Get for Android
                        </Button>
                    </div>
                </div>

                {/* Mockup area */}
                <div className="relative mx-auto mt-20 w-full max-w-5xl h-[600px] flex justify-center perspective-[2000px]">

                    {/* Left Phone (Background) */}
                    <div className="absolute left-1/2 -translate-x-[180%] top-12 w-64 rotate-[-15deg] opacity-90 transition-transform duration-700 hover:-translate-y-4 z-0 hidden md:block">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-black aspect-[9/19]">
                            <Image src="/images/welcome-ruby.png" alt="Welcome Screen" fill className="object-cover" />
                        </div>
                        {/* Floating Element Left */}
                        <div className="absolute -left-8 top-1/2 bg-white p-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce duration-[4000ms]">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-xl">🔥</div>
                            <div>
                                <p className="text-xs font-bold text-deep-purple">Streak</p>
                                <p className="text-[10px] text-gray-500">12 Days</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Phone (Background) */}
                    <div className="absolute left-1/2 translate-x-[80%] top-12 w-64 rotate-[15deg] opacity-90 transition-transform duration-700 hover:-translate-y-4 z-0 hidden md:block">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-black aspect-[9/19]">
                            <Image src="/images/routine-list.png" alt="Routines Screen" fill className="object-cover" />
                        </div>
                        {/* Floating Element Right */}
                        <div className="absolute -right-4 bottom-1/3 bg-white p-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce duration-[3500ms]">
                            <div className="w-8 h-8 bg-mint/20 rounded-full flex items-center justify-center text-mint">✨</div>
                            <p className="text-xs font-bold text-deep-purple">Routine Done!</p>
                        </div>
                    </div>

                    {/* Center Phone (Main) */}
                    <div className="relative z-10 w-80 transform hover:scale-105 transition-transform duration-500">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-black aspect-[9/19]">
                            <Image
                                src="/images/hero-splash.png"
                                alt="Freshies App Screenshot"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Floating Safe Match */}
                        <div className="absolute -right-16 top-1/4 animate-bounce duration-[3000ms]">
                            <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg">92</div>
                                <div>
                                    <div className="text-sm font-bold text-deep-purple">Safe Match!</div>
                                    <div className="text-xs text-gray-400">Low Irritation Risk</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
