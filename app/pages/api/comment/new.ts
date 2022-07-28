import { addNewComment } from '@/prisma/helpers/comment';
import { getUserFromRequest } from '@/utils/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  postId: number;
  comment: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let requestBody: RequestBody = req.body;

  if (!requestBody?.postId || !requestBody.comment) {
    res.status(404).json({ message: 'not enough data' });
    return;
  }

  getUserFromRequest(req)
    .then((user: any) => {
      addNewComment({
        postId: requestBody.postId,
        userId: user.id,
        comment: requestBody.comment,
      })
        .then((comment) => {
          res.status(200).json(comment);
        })
        .catch((err) => {
          res.status(409).json({ message: err });
        });
    })
    .catch((err) => res.status(409).json({ message: err }));
}
