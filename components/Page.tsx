import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const Page = ({ blok }: { blok: any }) => (
    <main {...storyblokEditable(blok)} className="flex min-h-screen flex-col border-4 border-red-500 min-h-[500px]">
        <div className="bg-red-100 p-2 text-red-600 font-bold">
            Internal Debug: Page Component Mounted. {blok.body?.length || 0} blocks.
            <br />
            Blocks: {blok.body?.map((b: any) => b.component).join(', ')}
        </div>
        {blok.body?.map((nestedBlok: any) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </main>
);

export default Page;
