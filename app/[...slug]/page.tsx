import { getStoryblokApi } from "@/lib/storyblok";
import StoryblokPage from "@/components/StoryblokPage";

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params;
    let slug = params.slug ? params.slug.join("/") : "home";

    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version: "draft" });

    return (
        <div>
            <StoryblokPage story={data.story} />
        </div>
    );
}

export async function generateStaticParams() {
    const storyblokApi = getStoryblokApi();
    try {
        let { data } = await storyblokApi.get("cdn/links", {
            version: "draft",
        });

        // Safety check for invalid response
        if (!data || !data.links) {
            return [];
        }

        let paths: { slug: string[] }[] = [];

        // Use standard for...in loop or assert type to avoid Object.keys issues with undefined
        const links = data.links as Record<string, any>;

        Object.keys(links).forEach((linkKey) => {
            const link = links[linkKey];
            if (!link.is_folder && link.slug !== "home") {
                paths.push({ slug: link.slug.split("/") });
            }
        });

        return paths;
    } catch (e) {
        // Fallback for build time if API fails or token is invalid
        console.error("Error generating static params:", e);
        return [];
    }
}
