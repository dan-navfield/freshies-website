import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeepDiveProps {
    label: string;
    headline: string;
    body: string;
    bullets: string[];
    supportingLine?: string;
    microCopy?: string;
    imageSrc: string; // We'll just pass generic images for now since we don't have all assets
    imageAlt: string;
    isReversed?: boolean; // Toggle image/text side
    colorTheme?: "purple" | "mint" | "peach"; // For subtle background accents if needed
}

export default function FeatureDeepDive({
    label,
    headline,
    body,
    bullets,
    supportingLine,
    microCopy,
    imageSrc,
    imageAlt,
    isReversed = false,
}: DeepDiveProps) {
    return (
        <section className="py-24 border-b border-slate-100 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className={cn("flex flex-col lg:flex-row items-center gap-12 lg:gap-24", isReversed && "lg:flex-row-reverse")}>

                    {/* Text Content */}
                    <div className="flex-1">
                        <span className="inline-block text-ultraviolet font-bold text-sm tracking-widest uppercase mb-4">
                            {label}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-deep-purple mb-6 font-display leading-tight">
                            {headline}
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            {body}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Check size={12} className="text-green-600 stroke-[3]" />
                                    </div>
                                    <span className="text-deep-purple font-medium">{bullet}</span>
                                </li>
                            ))}
                        </ul>

                        {(supportingLine || microCopy) && (
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                {supportingLine && (
                                    <p className="text-slate-500 italic font-medium">"{supportingLine}"</p>
                                )}
                                {microCopy && (
                                    <div className="bg-slate-50 inline-block px-4 py-2 rounded-lg text-sm text-slate-500 font-medium">
                                        {microCopy}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Image / Graphic */}
                    <div className="flex-1 w-full">
                        <div className="relative aspect-square md:aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
                            {/* Placeholder logic until real assets are mapped */}
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
