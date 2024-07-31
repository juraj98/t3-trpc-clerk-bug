import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Mocked DB
interface User {
  id: number;
  name: string;
}

const users: Record<number, User> = {
  1: {
    id: 1,
    name: "John Doe",
  },
  2: {
    id: 2,
    name: "Jane Doe",
  },
};

interface Post {
  id: number;
  name: string;
  authorId: number;
}
const posts: Post[] = [
  {
    id: 1,
    name: "First post",
    authorId: 1,
  },
  {
    id: 2,
    name: "Second post",
    authorId: 1,
  },
];

export const postRouter = createTRPCRouter({
  getPosts: publicProcedure.query(async () => {
    return await new Promise<Post[]>((resolve) => {
      setTimeout(() => {
        resolve(posts);
      }, 1000);
    });
  }),
  getPostAuthor: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      return await new Promise<User>((resolve) => {
        setTimeout(() => {
          const author = users[input.userId];
          if (!author) {
            throw new TRPCError({
              code: "NOT_FOUND",
              cause: "Author not found",
            });
          }

          resolve(author);
        }, 1000);
      });
    }),
});
