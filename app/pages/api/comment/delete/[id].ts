import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '@/utils/jwt';
import { deleteComment } from '@/prisma/helpers/comment';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let id = Number(req.query?.id);
  let method = req.method;

  if (method !== 'DELETE') {
    res.status(404).end();
    return;
  }

  if (isNaN(id)) {
    res.status(404).json({ message: 'please provide a valid comment id' });
    return;
  }

  getUserFromRequest(req)
    .then((user: any) => {
      deleteComment({ userId: user.id, commentId: id })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => res.status(409).json({ message: err }));
    })
    .catch((err) => res.status(409).json({ message: err }));
}
