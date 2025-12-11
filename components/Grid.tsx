import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const Grid = ({ blok }: { blok: any }) => {
    return (
        <div {...storyblokEditable(blok)} className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
                {blok.columns.map((nestedBlok: any) => (
                    <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                ))}
            </div>
        </div>
    );
};

export default Grid;
