import { loadAllPosts } from '@/prisma/helpers/post';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let method = req.method;

  if (method !== 'GET') {
    res.status(404).end();
    return;
  }

  loadAllPosts()
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(409).json({ message: err }));
}
