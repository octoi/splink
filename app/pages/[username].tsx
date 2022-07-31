import type { GetServerSideProps, NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { PostType, UserType } from '@/utils/types';
import { PrismaClient } from '@prisma/client';
import { Biodata } from '@/components/user/Biodata';
import { Container, Divider } from '@chakra-ui/react';
import { PostDisplay } from '@/components/post/PostDisplay';

interface Props {
  userJson: string;
}

const UserPage: NextPage<Props> = ({ userJson }) => {
  const user: UserType = JSON.parse(userJson);

  return (
    <Layout title={user.name} description={user.bio} image={user.profile}>
      <Biodata user={user} />
      {user.Post && user.Post?.length !== 0 && <Divider my={5} />}
      <Container maxW='container.2xl'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {user.Post &&
            user.Post.map((post) => (
              <PostDisplay
                key={post.id}
                post={{
                  ...post,
                  user,
                }}
              />
            ))}
        </div>
      </Container>
    </Layout>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const username = params?.username;
  const prismaClient = new PrismaClient();

  let user: PostType | any = await prismaClient.user.findUnique({
    where: { username: username?.toString() },
    include: {
      Post: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          link: true,
          caption: true,
          createdAt: true,
        },
      },
    },
  });

  if (user) {
    return {
      props: {
        userJson: JSON.stringify(user),
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
