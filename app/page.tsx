import { getStoryblokApi } from "@/lib/storyblok";
import StoryblokPage from "@/components/StoryblokPage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const storyblokApi = getStoryblokApi();
  // Fetch the home story
  let { data } = await storyblokApi.get("cdn/stories/home", { version: "draft" });

  return (
    <div>
      <StoryblokPage story={data.story} />
    </div>
  );
}
