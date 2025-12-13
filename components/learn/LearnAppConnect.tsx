import { ArrowRight, ScanLine, BookOpen, Smile } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { storyblokEditable } from "@storyblok/react";

const iconMap: any = {
    ScanLine, BookOpen, Smile
};

export function LearnAppConnect({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-deep-purple text-white relative overflow-hidden">
            {/* Background shapes */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ultraviolet/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-mint/10 blur-[100px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{blok.headline}</h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        {blok.subheadline}
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-mint/0 via-mint/50 to-mint/0 -translate-y-1/2" />

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {blok.steps?.map((step: any) => {
                            const Icon = iconMap[step.icon_name] || ScanLine;
                            return (
                                <div key={step._uid} className="relative text-center px-4 md:px-0">
                                    <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-[0_0_30px_rgba(59,218,209,0.2)]">
                                        <Icon className="w-10 h-10 text-mint" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{step.number}. {step.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="text-center mt-16">
                    <Button size="lg" className="bg-mint text-deep-purple hover:bg-mint/90 font-bold rounded-full px-8">
                        Try the App
                    </Button>
                </div>
            </div>
        </section>
    );
}
