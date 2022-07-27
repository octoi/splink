import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Get user data with username or user id
export const getUserFromDatabase = ({
  username,
  id,
}: {
  username?: string;
  id?: number;
}) => {
  return new Promise((resolve, reject) => {
    if (!username || !id) {
      reject('username or user id must be provided');
      return;
    }

    prismaClient.user
      .findUnique({
        where: username ? { username } : { id }, // passing username or id according to which is given
      })
      .then((user: any) => {
        if (!user) reject('Failed to find user');
        resolve(user);
      })
      .catch(() => reject('Failed to find user'));
  });
};

// Hash password & save user data
export const registerUser = (data: {
  username: string;
  name: string;
  password: string;
  profile: string;
}) => {
  return new Promise(async (resolve, reject) => {
    let hashedPassword = await bcrypt.hash(data.password, 10);

    prismaClient.user
      .create({
        data: {
          ...data,
          password: hashedPassword,
        },
      })
      .then(resolve)
      .catch((err: { code: String }) => {
        /* 
          https://www.prisma.io/docs/reference/api-reference/error-reference
          error `P2002` = "Unique constraint failed on the {constraint}" 
          user is trying to signup with and username which is already exits
        */
        if (err.code === 'P2002') {
          reject('Username is already taken');
        }
        reject('Failed to register user');
      });
  });
};
