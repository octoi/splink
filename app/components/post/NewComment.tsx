import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useState as useHookState } from '@hookstate/core';
import { SetState } from '@/utils/reactTypes';
import { PostComment, UserType } from '@/utils/types';
import { Button, Textarea, useToast } from '@chakra-ui/react';
import { userStore } from '@/states/user.state';
import { getRequestHeader } from '@/utils/user.util';

interface Props {
  comments: PostComment[];
  setComments: SetState<PostComment[]>;
  postId: number;
}

export const NewComment: React.FC<Props> = ({
  postId,
  comments,
  setComments,
}) => {
  const toast = useToast();

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserType | null>(null);

  const userState = useHookState(userStore);

  useEffect(() => {
    setUserData(userState.get());
  }, []);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post(
        '/api/comment/new',
        {
          comment,
          postId,
        },
        {
          headers: getRequestHeader(),
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: 'Added comment successfully',
            isClosable: true,
            status: 'success',
            duration: 3000,
            position: 'top-right',
          });

          let allComments = [...comments];
          allComments.unshift(res.data);
          setComments(allComments);

          setComment('');
        } else {
          toast({
            title: res.data?.message,
            description: 'Failed to comment',
            isClosable: true,
            status: 'error',
            duration: 3000,
            position: 'top-right',
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Failed to comment',
          description:
            err?.request.status !== 409
              ? 'Failed to comment'
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
    <div>
      {userData && (
        <form onSubmit={handleFormSubmit}>
          <Textarea
            size='lg'
            mt={10}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant='filled'
            placeholder='Type your comment'
            disabled={loading}
          />
          <Button
            disabled={comment.trim().length === 0}
            mt={3}
            size='lg'
            colorScheme='blue'
            isLoading={loading}
            type='submit'
          >
            Comment
          </Button>
        </form>
      )}
    </div>
  );
};
