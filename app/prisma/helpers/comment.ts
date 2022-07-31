import { prisma, PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// find comment
export const findComment = (id: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.comment
      .findUnique({
        where: { id },
        include: {
          post: {
            select: {
              userId: true,
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
    prismaClient.comment
      .create({
        data,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              profile: true,
            },
          },
        },
      })
      .then(resolve)
      .catch(reject);
  });
};

// authorize & delete comment
export const deleteComment = (data: { userId: number; commentId: number }) => {
  return new Promise(async (resolve, reject) => {
    let comment: any = await findComment(data.commentId).catch(reject);
    if (!comment) return;

    // comment author & post author have permission to delete a comment
    if (data.userId == comment.userId || data.userId == comment.post.userId) {
      prismaClient.comment
        .delete({ where: { id: data.commentId } })
        .then(resolve)
        .catch(reject);
    } else {
      reject('Permission denied');
    }
  });
};

export const deleteCommentsOfPosts = (postId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.comment
      .deleteMany({
        where: { postId },
      })
      .then(resolve)
      .catch(reject);
  });
};
