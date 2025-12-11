import { storyblokEditable } from "@storyblok/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SimpleTextSection = ({ blok }: { blok: any }) => {
    return (
        <section {...storyblokEditable(blok)} className={cn("py-24 text-center", blok.background === 'purple' ? "bg-gradient-to-br from-ultraviolet to-deep-purple text-white" : "bg-white")}>
            <div className="container mx-auto px-4 max-w-4xl">
                {blok.label && (
                    <span className={cn("font-bold tracking-wider uppercase text-sm mb-4 block", blok.background === 'purple' ? "text-white/80" : "text-ultraviolet")}>
                        {blok.label}
                    </span>
                )}
                <h2 className={cn("text-4xl md:text-5xl font-bold mb-6", blok.background === 'purple' ? "text-white" : "text-deep-purple")}>
                    {blok.headline}
                </h2>
                <p className={cn("text-xl mb-10 max-w-2xl mx-auto", blok.background === 'purple' ? "text-white/80" : "text-deep-purple/70")}>
                    {blok.body}
                </p>
                {blok.cta_text && (
                    <Button
                        size="lg"
                        variant={blok.background === 'purple' ? 'secondary' : 'default'}
                        className="min-w-[200px]"
                    >
                        {blok.cta_text}
                    </Button>
                )}
            </div>
        </section>
    );
};

export default SimpleTextSection;
