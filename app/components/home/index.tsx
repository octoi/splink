import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PostType } from '@/utils/types';
import { Container, useToast } from '@chakra-ui/react';
import { PostDisplay } from '../post/PostDisplay';

interface Props {
  searchQuery: string;
}

export const HomePageContent: React.FC<Props> = ({ searchQuery }) => {
  const toast = useToast();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get('/api/post')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        toast({
          title: 'Failed to load posts',
          description:
            err?.request.status !== 409
              ? 'Failed to load posts'
              : JSON.parse(err?.request?.response)?.message,
          isClosable: true,
          status: 'error',
          duration: 3000,
          position: 'top-right',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container maxW='container.2xl'>
      {loading && <p className='text-xl'>Loading...</p>}
      {!loading && posts.length === 0 && (
        <p className='text-xl'>No posts yet</p>
      )}
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {posts
          .filter(
            (post) =>
              post.caption?.trim().toLowerCase().includes(searchQuery) ||
              post.link.toLowerCase().includes(searchQuery) ||
              post.user.name.trim().toLowerCase().includes(searchQuery) ||
              post.user.username.includes(searchQuery)
          )
          .map((post) => (
            <PostDisplay post={post} key={post.id} redirect />
          ))}
      </div>
    </Container>
  );
};
