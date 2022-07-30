import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '@/utils/jwt';
import { deletePost } from '@/prisma/helpers/post';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let id = Number(req.query?.id);
  let method = req.method;

  if (method !== 'DELETE') {
    res.status(404).end();
    return;
  }

  if (isNaN(id)) {
    res.status(404).json({ message: 'please provide a valid post id' });
    return;
  }

  getUserFromRequest(req)
    .then((user: any) => {
      deletePost({ userId: user.id, postId: id })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => res.status(409).json({ message: err }));
    })
    .catch((err) => res.status(409).json({ message: err }));
}
