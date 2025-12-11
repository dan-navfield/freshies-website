import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokComponent } from "@storyblok/react";

export default async function Page({ params }: { params: { slug: string[] } }) {
    let slug = params.slug ? params.slug.join("/") : "home";

    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version: "draft" });

    return (
        <div>
            <StoryblokComponent blok={data.story.content} />
        </div>
    );
}

export async function generateStaticParams() {
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get("cdn/links", {
        version: "draft",
    });

    let paths: { slug: string[] }[] = [];
    Object.keys(data.links).forEach((linkKey) => {
        if (!data.links[linkKey].is_folder && data.links[linkKey].slug !== "home") {
            paths.push({ slug: data.links[linkKey].slug.split("/") });
        }
    });

    return paths;
}
