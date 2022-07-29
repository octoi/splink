import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { NextApiRequest } from 'next';

const jwtKey = process.env.JWT_KEY || 'n3v3r g0nn4 g1v3 y0u up'; // ! Please don't use this for production

export const generateToken = (data: any): string => {
  delete data?.password; // Password hash of user is in data btw, so we need to delete it
  return jwt.sign(data, jwtKey, { expiresIn: '100h' });
};

// get user data from request headers
export const getUserFromRequest = (req: NextApiRequest) => {
  return new Promise(async (resolve, reject) => {
    const token: any = await getTokenFromRequestHeader(req).catch(reject);

    try {
      const user = jwt.verify(token, jwtKey);
      resolve(user);
    } catch (error) {
      reject('Invalid/Expired token');
    }
  });
};

// validate token and return token
export const getTokenFromRequestHeader = (req: NextApiRequest) => {
  return new Promise((resolve, reject) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      reject('Authorization header must be provided');
      return;
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) reject("Authentication must be 'Bearer [token]'");

    resolve(token);
  });
};

// get user data from jwt token
export const getUserFromToken = (token: string): Boolean | any => {
  const decodedData: any = jwtDecode(token);

  if (decodedData?.exp * 1000 < Date.now()) {
    return false;
  }

  return decodedData;
};
