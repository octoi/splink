import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// find comment
export const findComment = (id: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.comment
      .findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      })
      .then((comment: any) => {
        if (!comment) reject('Failed to find comment');
        resolve(comment);
      })
      .catch(() => reject('Failed to find comment'));
  });
};

// add new comment
export const addNewComment = (data: {
  postId: number;
  userId: number;
  comment: string;
}) => {
  return new Promise((resolve, reject) => {
    prismaClient.comment.create({ data }).then(resolve).catch(reject);
  });
};
