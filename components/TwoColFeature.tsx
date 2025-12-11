import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

const TwoColFeature = ({ blok }: { blok: any }) => {
    const isRightAligned = blok.alignment === 'right';

    return (
        <section {...storyblokEditable(blok)} className={cn("py-24", blok.background === 'white' ? "bg-white" : "bg-cream/20")}>
            <div className="container mx-auto px-4">
                <div className={cn("flex flex-col md:flex-row items-center gap-12 md:gap-24", isRightAligned ? "md:flex-row-reverse" : "")}>

                    {/* Text Content */}
                    <div className="flex-1 space-y-6">
                        {blok.label && (
                            <span className="text-ultraviolet font-bold tracking-wider uppercase text-sm">
                                {blok.label}
                            </span>
                        )}
                        <h2 className="text-4xl font-bold text-deep-purple leading-tight">
                            {blok.headline}
                        </h2>
                        <div className="prose prose-lg text-deep-purple/70">
                            <p>{blok.body}</p>
                        </div>

                        {blok.bullets && (
                            <ul className="space-y-4 pt-4">
                                {blok.bullets.map((bullet: any) => (
                                    <li key={bullet._uid} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-mint/20 flex items-center justify-center shrink-0">
                                            <Icons.Check className="w-3 h-3 text-mint" />
                                        </div>
                                        <span className="text-deep-purple/80">{bullet.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Visual Content */}
                    <div className="flex-1 relative w-full flex justify-center">
                        {/* Support for single or dual images */}
                        {blok.image_2?.filename ? (
                            <div className="relative w-full max-w-lg aspect-square">
                                <div className="absolute top-0 right-0 w-2/3 aspect-[9/19] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl rotate-6 z-10">
                                    <Image src={blok.image_2.filename} alt="" fill className="object-cover" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-2/3 aspect-[9/19] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl -rotate-6">
                                    <Image src={blok.image_1?.filename} alt="" fill className="object-cover" />
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white">
                                {blok.image_1?.filename && (
                                    <Image src={blok.image_1.filename} alt="" fill className="object-cover" />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TwoColFeature;
