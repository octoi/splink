import type { GetServerSideProps, NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { findPost } from '@/prisma/helpers/post';
import { PostType } from '@/utils/types';
import { PostContent } from '@/components/post';

interface Props {
  postJson: string;
}

const PostPage: NextPage<Props> = ({ postJson }) => {
  let post: PostType = JSON.parse(postJson);

  return (
    <Layout description={post.caption}>
      <PostContent post={post} />
    </Layout>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = Number(params?.id);

  let post: PostType | any = await findPost(postId).catch(() => null);

  if (post) {
    return {
      props: {
        postJson: JSON.stringify(post),
      },
    };
  }

  return {
    redirect: {
      destination: '/404',
      permanent: false,
    },
    props: {},
  };
};
