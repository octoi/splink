import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import axios from 'axios';
import { getRequestHeader } from '@/utils/user.util';
import { useRouter } from 'next/router';
import { userStore } from '@/states/user.state';
import { useState as useHookState } from '@hookstate/core';
import { PostType, UserType } from '@/utils/types';
import { BiLinkExternal } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  Flex,
  IconButton,
  Link as ChakraLink,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

interface Props {
  post: PostType;
  displayDeleteButton?: boolean;
}

export const PostDisplay: React.FC<Props> = ({ post, displayDeleteButton }) => {
  const toast = useToast();
  const router = useRouter();

  const { colorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  const userState = useHookState(userStore);

  useEffect(() => {
    setUserData(userState.get());
  }, []);

  const deletePost = () => {
    setLoading(true);

    axios
      .delete(`/api/post/${post.id}`, {
        headers: getRequestHeader(),
      })
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: 'Deleted post successfully',
            isClosable: true,
            status: 'success',
            duration: 3000,
            position: 'top-right',
          });

          router.push('/');
        } else {
          toast({
            title: res.data?.message,
            description: 'Failed to delete post',
            isClosable: true,
            status: 'error',
            duration: 3000,
            position: 'top-right',
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Failed to delete post',
          description:
            err?.request.status !== 409
              ? 'Failed to delete post'
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

    onClose();
  };

  return (
    <>
      <Flex
        direction='column'
        className='w-full p-5 border-2 border-dashed'
        _hover={{
          background: colorMode == 'dark' ? 'gray.700' : 'gray.50',
        }}
      >
        <ChakraLink href={post.link}>
          <Button colorScheme='blue' variant='link' fontSize='xl'>
            {post.link} <BiLinkExternal className='ml-2' />
          </Button>
        </ChakraLink>
        {post.caption && (
          <Text mt={5} fontSize='xl' opacity='0.8'>
            {post.caption}
          </Text>
        )}
        <Text mt={5} fontSize='xl' opacity='0.8'>
          {moment(post.createdAt).fromNow()}
        </Text>
        <Flex mt={5} alignItems='center' justifyContent='space-between'>
          <Link href={`/${post.user.username}`}>
            <Flex alignItems='center' className='cursor-pointer'>
              <Avatar size='lg' src={post.user.profile} name={post.user.name} />
              <div className='ml-2'>
                <Text fontSize='xl' fontWeight='medium'>
                  {post.user.name}
                </Text>
                <Text fontSize='lg' opacity='0.7'>
                  @{post.user.username}
                </Text>
              </div>
            </Flex>
          </Link>
          {displayDeleteButton && userData && post.userId === userData.id && (
            <IconButton
              aria-label='delete post'
              icon={<FiTrash2 />}
              colorScheme='red'
              size='lg'
              variant='ghost'
              onClick={onOpen}
              isLoading={loading}
            />
          )}
        </Flex>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={loading}
                colorScheme='red'
                onClick={deletePost}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
