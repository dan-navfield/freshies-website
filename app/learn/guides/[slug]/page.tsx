import { getStoryblokApi } from "@/lib/storyblok";
import StoryblokPage from "@/components/StoryblokPage";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
        version: "draft",
        starts_with: "guides/",
        is_startpage: false,
    });

    return data.stories.map((story: any) => ({
        slug: story.slug,
    }));
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const storyblokApi = getStoryblokApi();

    try {
        const { data } = await storyblokApi.get(`cdn/stories/guides/${slug}`, {
            version: "draft",
        });

        return (
            <div>
                <StoryblokPage story={data.story} />
            </div>
        );
    } catch (e) {
        notFound();
    }
}
