import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useState as useHookState } from '@hookstate/core';
import { PostComment, UserType } from '@/utils/types';
import { SetState } from '@/utils/reactTypes';
import { FiTrash2 } from 'react-icons/fi';
import { userStore } from '@/states/user.state';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { getRequestHeader } from '@/utils/user.util';

interface Props {
  comments: PostComment[];
  setComments: SetState<PostComment[]>;
  comment: PostComment;
  postAuthorId: number;
}

export const DeleteComment: React.FC<Props> = ({
  comment,
  postAuthorId,
  comments,
  setComments,
}) => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserType | null>(null);

  const userState = useHookState(userStore);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  useEffect(() => {
    setUserData(userState.get());
  }, []);

  const deleteComment = () => {
    setLoading(true);

    axios
      .delete(`/api/comment/${comment.id}`, {
        headers: getRequestHeader(),
      })
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: 'Deleted comment successfully',
            isClosable: true,
            status: 'success',
            duration: 3000,
            position: 'top-right',
          });

          let allComments = comments.filter((c) => c.id !== comment.id);
          setComments(allComments);
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

  if (!(userData?.id === postAuthorId || userData?.id === comment.user.id)) {
    return null;
  }

  return (
    <>
      <IconButton
        aria-label='delete comment'
        icon={<FiTrash2 />}
        colorScheme='red'
        size='lg'
        variant='ghost'
        onClick={onOpen}
        isLoading={loading}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete comment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deleteComment} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
