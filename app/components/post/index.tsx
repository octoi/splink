import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { PostType } from '@/utils/types';
import { BiLinkExternal } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { Container, Heading } from '@chakra-ui/react';
import { PostDisplay } from './PostDisplay';

interface Props {
  post: PostType;
}

export const PostContent: React.FC<Props> = ({ post }) => {
  return (
    <Container maxW='container.lg' mt={10}>
      <Heading mb={5}>{post.link}</Heading>
      <PostDisplay post={post} displayDeleteButton />
    </Container>
  );
};
