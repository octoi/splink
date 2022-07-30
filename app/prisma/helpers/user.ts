import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

// Get user data with username or user id
export const findUser = ({
  username,
  id,
}: {
  username?: string;
  id?: number;
}) => {
  return new Promise((resolve, reject) => {
    if (!username && !id) {
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

// Find user with the given username & check if the password matches
export const loginUser = (data: { username: string; password: string }) => {
  return new Promise(async (resolve, reject) => {
    const user: any = await findUser({
      username: data.username,
    }).catch(reject);
    if (!user) return;

    bcrypt.compare(data.password, user.password, (err, res) => {
      if (err) return reject('Failed to validate password');
      if (!res) return reject('Invalid password');
      resolve(user);
    });
  });
};

// Get user data from database & update the changed fields
export const updateUser = (
  userId: number,
  data: {
    id?: number;
    username?: string;
    name?: string;
    password?: string;
    profile?: string;
    bio?: string;
    banner?: string;
    socials?: string;
  }
) => {
  return new Promise(async (resolve, reject) => {
    const user: any = await findUser({ id: userId }).catch(reject);
    if (!user) return;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // There is a chance that someone can change the user id, which should not be changed
    if (data.id) {
      delete data.id;
    }

    prismaClient.user
      .update({
        where: { id: userId },
        data,
      })
      .then(resolve)
      .catch((err) => {
        console.log(err);
        reject('Failed to update user');
      });
  });
};
