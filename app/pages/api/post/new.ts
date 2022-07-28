import { createNewPost } from '@/prisma/helpers/post';
import { getUserFromRequest } from '@/utils/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  link: string;
  caption?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let requestBody: RequestBody = req.body;

  if (!requestBody?.link) {
    res.status(404).json({ message: 'not enough data' });
    return;
  }

  getUserFromRequest(req)
    .then((user: any) => {
      createNewPost({
        userId: user.id,
        link: requestBody.link,
        caption: requestBody.caption,
      })
        .then((post) => {
          res.status(200).json(post);
        })
        .catch((err) => {
          res.status(409).json({ message: err });
        });
    })
    .catch((err) => res.status(409).json({ message: err }));
}
