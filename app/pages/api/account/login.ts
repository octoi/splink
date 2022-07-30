import { NextApiRequest, NextApiResponse } from 'next';
import { loginUser } from '@/prisma/helpers/user';
import { generateToken } from '@/utils/jwt';

interface RequestBody {
  username: string;
  password: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let requestBody: RequestBody = req.body;

  if (!requestBody?.username || !requestBody?.password) {
    res.status(404).json({ message: 'not enough data' });
    return;
  }

  loginUser(requestBody)
    .then((userData: any) => {
      userData.token = generateToken(userData);
      res.status(200).json(userData);
    })
    .catch((err) => {
      res.status(201).json({ message: err });
    });
}
