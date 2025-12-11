import { storyblokEditable } from "@storyblok/react";

const Teaser = ({ blok }: { blok: any }) => {
    return (
        <div {...storyblokEditable(blok)} className="py-24 text-center container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4 text-deep-purple">{blok.headline}</h2>
            <p className="text-xl text-deep-purple/70 max-w-2xl mx-auto">{blok.description}</p>
        </div>
    );
};

export default Teaser;
