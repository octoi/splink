import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// create new post
export const createNewPost = (data: {
  userId: number;
  link: string;
  caption?: string;
}) => {
  return new Promise((resolve, reject) => {
    prismaClient.post.create({ data }).then(resolve).catch(reject);
  });
};
