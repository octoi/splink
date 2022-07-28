import { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '@/prisma/helpers/user';
import { generateToken, getUserFromRequest } from '@/utils/jwt';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  getUserFromRequest(req)
    .then((user: any) => {
      updateUser(user.id, req.body)
        .then((updatedUser) => {
          res.status(200).json({
            token: generateToken(updatedUser),
          });
        })
        .catch((err) => {
          res.status(409).json({ message: err });
        });
    })
    .catch((err) => res.status(409).json({ message: err }));
}
