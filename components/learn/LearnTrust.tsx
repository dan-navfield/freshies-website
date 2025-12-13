import { Check, ShieldCheck } from "lucide-react";
import { storyblokEditable } from "@storyblok/react";

const iconMap: any = { Check, ShieldCheck };

export function LearnTrust({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-sm font-medium text-gray-500">
                    {blok.items?.map((item: any) => {
                        const Icon = iconMap[item.icon_name] || Check;
                        return (
                            <div key={item._uid} className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-mint/10 flex items-center justify-center text-mint">
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span>{item.text}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="text-center mt-8 text-xs text-gray-400">
                    <a href="#" className="hover:text-deep-purple underline">Methodology</a> • <a href="#" className="hover:text-deep-purple underline">Privacy Policy</a>
                </div>
            </div>
        </section>
    );
}
