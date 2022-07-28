import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '@/prisma/helpers/user';
import { generateToken } from '@/utils/jwt';

interface RequestBody {
  username: string;
  name: string;
  password: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let requestBody: RequestBody = req.body;

  if (!requestBody?.username || !requestBody?.name || !requestBody?.password) {
    res.status(404).json({ message: 'not enough data' });
    return;
  }

  registerUser({
    ...requestBody,
    profile: encodeURI(
      `https://avatars.dicebear.com/api/identicon/${requestBody.name}.svg`
    ),
  })
    .then((userData) => {
      res.status(200).json({ token: generateToken(userData) });
    })
    .catch((err) => {
      res.status(409).json({ message: err });
    });
}