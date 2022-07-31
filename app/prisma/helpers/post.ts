import { PrismaClient } from '@prisma/client';
import { deleteCommentsOfPosts } from './comment';

const prismaClient = new PrismaClient();

// find post
export const findPost = (id: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.post
      .findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              profile: true,
            },
          },
          Comment: {
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              id: true,
              postId: true,
              comment: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  profile: true,
                },
              },
            },
          },
        },
      })
      .then((post: any) => {
        if (!post) reject('Failed to find post');
        resolve(post);
      })
      .catch(() => reject('Failed to find post'));
  });
};

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

// get post data & check logged in user is the author, if yes delete the post
export const deletePost = (data: { userId: number; postId: number }) => {
  return new Promise(async (resolve, reject) => {
    let post: any = await findPost(data.postId).catch(reject);
    if (!post) return;

    // check if logged in user is the post author
    if (post.userId == data.userId) {
      deleteCommentsOfPosts(data.postId)
        .then(() => {
          prismaClient.post
            .delete({ where: { id: data.postId } })
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    } else {
      reject('Permission denied');
    }
  });
};

export const loadAllPosts = () => {
  return new Promise((resolve, reject) => {
    prismaClient.post
      .findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              profile: true,
            },
          },
        },
      })
      .then(resolve)
      .catch(reject);
  });
};
