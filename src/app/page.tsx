import { HydrateClient } from "~/trpc/server";
import { PostListRenderer } from "./PostList";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="p-8">
        <PostListRenderer />
      </main>
    </HydrateClient>
  );
}
