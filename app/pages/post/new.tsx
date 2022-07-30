import type { NextPage } from 'next';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { Layout } from '@/components/Layout';
import { AuthProtected } from '@/components/AuthProtected';
import { getRequestHeader } from '@/utils/user.util';
import {
  Link as ChakraLink,
  Text,
  Button,
  Container,
  Heading,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';

const NewPostPage: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const [link, setLink] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post(
        '/api/post/new',
        {
          link,
          caption: caption.trim().length !== 0 ? caption : null,
        },
        {
          headers: getRequestHeader(),
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: 'Created post successfully',
            isClosable: true,
            status: 'success',
            duration: 3000,
            position: 'top-right',
          });

          router.push(`${Paths.post}/${res.data?.id}`);
        } else {
          toast({
            title: res.data?.message,
            description: 'Failed to create post',
            isClosable: true,
            status: 'error',
            duration: 3000,
            position: 'top-right',
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Failed to create post',
          description:
            err?.request.status !== 409
              ? 'Failed to create post'
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
  };

  return (
    <Layout title='New post'>
      <AuthProtected>
        <Container mt={100} maxW='container.sm'>
          <Heading>New Post</Heading>
          <form onSubmit={handleFormSubmit}>
            <Input
              mt={5}
              placeholder='Link'
              variant='filled'
              type='url'
              size='lg'
              value={link}
              onChange={(e) => setLink(e.target.value)}
              disabled={loading}
              required
            />
            <Textarea
              size='lg'
              mt={5}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              variant='filled'
              placeholder='Caption'
              disabled={loading}
            />
            <Button
              mt={5}
              colorScheme='teal'
              isLoading={loading}
              disabled={link.trim().length === 0}
              w='full'
              size='lg'
              type='submit'
            >
              New Post
            </Button>
          </form>
          <Text mt={5} fontSize='lg'>
            Don't want to create post ?{' '}
            <Link href='/' passHref>
              <ChakraLink>Go home</ChakraLink>
            </Link>
          </Text>
        </Container>
      </AuthProtected>
    </Layout>
  );
};

export default NewPostPage;
