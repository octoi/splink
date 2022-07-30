import React from 'react';
import { PostType } from '@/utils/types';
import { Container, Heading } from '@chakra-ui/react';
import { PostDisplay } from './PostDisplay';
import { PostComments } from './PostComments';

interface Props {
  post: PostType;
}

export const PostContent: React.FC<Props> = ({ post }) => {
  return (
    <Container maxW='container.lg' mt={10}>
      <Heading mb={5}>{post.link}</Heading>
      <PostDisplay post={post} displayDeleteButton />
      <PostComments post={post} postAuthorId={post.userId} />
    </Container>
  );
};
