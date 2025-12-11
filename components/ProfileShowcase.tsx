import { storyblokEditable } from "@storyblok/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ProfileShowcase = ({ blok }: { blok: any }) => {
    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-cream/30">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <span className="text-ultraviolet font-bold tracking-wider uppercase text-sm mb-4 block">
                    {blok.label || "Profiles"}
                </span>
                <h2 className="text-4xl font-bold text-deep-purple mb-6">
                    {blok.headline}
                </h2>
                <p className="text-xl text-deep-purple/70 max-w-2xl mx-auto mb-16">
                    {blok.body}
                </p>

                {/* Interactive Element */}
                <div className="relative max-w-2xl mx-auto mt-20">

                    {/* Avatars */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-end gap-4 z-10 w-full justify-center">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={cn("rounded-full border-4 border-white shadow-lg overflow-hidden transition-all hover:-translate-y-2 cursor-pointer bg-white",
                                i === 2 ? "w-24 h-24 z-20" : "w-16 h-16 opacity-70 hover:opacity-100"
                            )}>
                                <div className={cn("w-full h-full flex items-center justify-center text-white font-bold text-xl",
                                    i === 1 ? "bg-accent-pink" : i === 2 ? "bg-mint" : "bg-ultraviolet"
                                )}>
                                    {["Ruby", "Leo", "Ava"][i - 1].charAt(0)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-[2rem] shadow-xl p-10 pt-16 border border-white">
                        <h3 className="text-2xl font-bold text-deep-purple mb-2">Leo's Routine</h3>
                        <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">Age 7 • Dry Skin</span>

                        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 justify-center">
                            {/* Mock Products */}
                            <div className="w-24 h-32 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shrink-0">
                                <div className="text-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2"></div>
                                    <div className="h-2 w-12 bg-gray-200 rounded mx-auto"></div>
                                </div>
                            </div>
                            <div className="w-24 h-32 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shrink-0">
                                <div className="text-center">
                                    <div className="w-8 h-8 bg-yellow-100 rounded-full mx-auto mb-2"></div>
                                    <div className="h-2 w-12 bg-gray-200 rounded mx-auto"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProfileShowcase;
