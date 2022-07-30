import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { PostType } from '@/utils/types';
import { NewComment } from './NewComment';
import { Avatar, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import { DeleteComment } from './DeleteComment';

interface Props {
  post: PostType;
  postAuthorId: number;
}

export const PostComments: React.FC<Props> = ({ post, postAuthorId }) => {
  const [comments, setComments] = useState(post.Comment || []);

  return (
    <div className='mt-5'>
      <h2 className='text-2xl font-medium'>Comments ({comments.length})</h2>
      {comments.map((comment, idx) => (
        <Flex mt={5} key={idx} alignItems='flex-start'>
          <Link href={`/${comment.user.username}`} passHref>
            <Avatar
              size='lg'
              src={comment.user.profile}
              name={comment.user.name}
            />
          </Link>
          <div className='ml-3 w-full'>
            <Flex alignItems='center' justifyContent='space-between'>
              <div>
                <Flex alignItems='center'>
                  <Link href={`/${comment.user.username}`} passHref>
                    <ChakraLink>
                      <Text fontSize='xl' fontWeight='medium'>
                        {comment.user.name}
                      </Text>
                    </ChakraLink>
                  </Link>
                  <Text fontSize='lg' ml={2}>
                    {moment(comment.createdAt).fromNow()}
                  </Text>
                </Flex>
                <Text mt={1} fontSize='lg'>
                  {comment.comment}
                </Text>
              </div>
              <DeleteComment
                comment={comment}
                comments={comments}
                setComments={setComments}
                postAuthorId={postAuthorId}
              />
            </Flex>
          </div>
        </Flex>
      ))}
      <NewComment
        postId={post.id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
};
