"use client";

import { Suspense } from "react";
import { api } from "../trpc/react";

export function PostListRenderer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostList />
    </Suspense>
  );
}

export function PostList() {
  const [posts] = api.post.getPosts.useSuspenseQuery();

  return (
    <div className="flex flex-wrap gap-4">
      {posts.map((post) => (
        <div key={post.id} className="h-32 w-32 rounded bg-blue-200">
          <div className="text-lg font-bold">{post.name}</div>
          <Suspense fallback={<div>Loading author...</div>}>
            <AuthorName userId={post.authorId} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}

function AuthorName({ userId }: { userId: number }) {
  const [author] = api.post.getPostAuthor.useSuspenseQuery({ userId });

  return <div className="text-sm">Author: {author.name}</div>;
}
