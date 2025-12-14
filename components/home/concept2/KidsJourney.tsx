import { Star, TrendingUp, Shield } from "lucide-react";

export default function KidsJourney() {
    return (
        <section className="py-24 bg-cream">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl text-center md:text-left flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl font-bold text-deep-purple mb-6 font-display">
                            Your skincare journey, your way.
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Freshies helps kids and teens take ownership of their skincare journey in a positive, supportive way. Track progress, build streaks, and learn what works for your skin without pressure or comparison.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="text-ultraviolet" />
                                <span className="font-bold text-deep-purple">Encourages independence with guidance</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Star className="text-ultraviolet" />
                                <span className="font-bold text-deep-purple">Focuses on healthy habits, not trends</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="text-ultraviolet" />
                                <span className="font-bold text-deep-purple">Builds confidence through understanding</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual placeholder */}
                    <div className="flex-1 w-full max-w-sm mx-auto bg-peach-100 rounded-3xl aspect-square flex items-center justify-center text-peach-400">
                        {/* Ideally an image of the app "Strength" or "Profile" screen */}
                        <span className="font-bold text-2xl">Journey Visual</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
