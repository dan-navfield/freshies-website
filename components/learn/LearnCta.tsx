import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";

export function LearnCta({ blok }: { blok: any }) {
    return (
        <section {...storyblokEditable(blok)} className="py-24 bg-surface-sand">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-xl text-center border border-ultraviolet/10">
                    <h2 className="text-3xl md:text-5xl font-bold text-deep-purple mb-6">{blok.headline}</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        {blok.subheadline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* Using simple buttons for now as links are not in basic schema yet. 
                             In real app, we would add link field to schema. */}
                        <Button
                            size="lg"
                            variant="primary"
                            className="rounded-full px-10 py-6 text-lg shadow-lg shadow-ultraviolet/20"
                        >
                            {blok.cta_primary_text}
                        </Button>
                        <Button
                            size="lg"
                            variant="ghost"
                            className="rounded-full px-10 py-6 text-lg text-deep-purple hover:bg-deep-purple/5"
                        >
                            {blok.cta_secondary_text}
                        </Button>
                    </div>

                    <p className="mt-6 text-sm text-gray-400">
                        No credit card required for basic access.
                    </p>
                </div>
            </div>
        </section>
    );
}
