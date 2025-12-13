import { getStoryblokApi } from "@/lib/storyblok";
import StoryblokPage from "@/components/StoryblokPage";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
        version: "draft",
        starts_with: "ingredients/",
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
        const { data } = await storyblokApi.get(`cdn/stories/ingredients/${slug}`, {
            version: "draft",
        });

        // Inject name into content if missing (seed script quirk handling)
        // Wait, story.content is readonly from API usually, but we can pass props to component?
        // StoryblokPage takes 'story'. The component will receive 'blok'.
        // We can mutate the content before passing it if needed, or better, update the component to read from 'story' prop if passed?
        // But StoryblokPage passes 'blok' = story.content.
        // Let's stick to modifying the component to be self-sufficient or fixing data. 
        // In the component I made, I used `blok.name`.
        // If my seed script didn't put name in 'content', `blok.name` will be undefined.
        // I should check my seed script:
        // `content: { component: "ingredient_page", summary: ... }` --> NAME IS MISSING IN CONTENT!
        // Good catch. I should patch it here for now or update seed.
        // Ideally update seed for future, but patch here for immediate fix.
        if (!data.story.content.name) {
            data.story.content.name = data.story.name;
        }

        return (
            <div>
                <StoryblokPage story={data.story} />
            </div>
        );
    } catch (e) {
        notFound();
    }
}
