"use client";
import { ShieldCheck, Sparkles, Smile, Sun, Leaf, Droplets } from "lucide-react";

const features = [
    { icon: ShieldCheck, text: "Safe for Kids" },
    { icon: Sparkles, text: "Dermatologist Approved" },
    { icon: Smile, text: "Fun Routines" },
    { icon: Sun, text: "Daily Protection" },
    { icon: Leaf, text: "Clean Ingredients" },
    { icon: Droplets, text: "Hydration First" },
];

export default function FeatureMarquee() {
    return (
        <div className="bg-peach text-deep-purple py-6 overflow-hidden border-y border-deep-purple/5">
            <div className="flex gap-12 whitespace-nowrap animate-marquee">
                {/* Duplicate the items to ensure seamless loop */}
                {[...features, ...features, ...features, ...features].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 opacity-90">
                        <feature.icon className="w-6 h-6 text-deep-purple" strokeWidth={2.5} />
                        <span className="text-lg font-bold font-display uppercase tracking-wider">{feature.text}</span>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </div>
    );
}
