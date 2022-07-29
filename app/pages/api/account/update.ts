import { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '@/prisma/helpers/user';
import { generateToken, getUserFromRequest } from '@/utils/jwt';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  getUserFromRequest(req)
    .then((user: any) => {
      updateUser(user.id, req.body)
        .then((updatedUser: any) => {
          updatedUser.token = generateToken(updatedUser);
          res.status(200).json(updatedUser);
        })
        .catch((err) => {
          res.status(201).json({ message: err });
        });
    })
    .catch((err) => res.status(201).json({ message: err }));
}
