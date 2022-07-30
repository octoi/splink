import React from 'react';
import { UserSocial, UserType } from '@/utils/types';
import {
  Avatar,
  Container,
  Heading,
  Text,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react';

interface Props {
  user: UserType;
}

export const Biodata: React.FC<Props> = ({ user }) => {
  let socials: UserSocial[] = JSON.parse(user.socials || '[]');

  return (
    <div>
      <Container mt={5} maxW='container.sm'>
        <div className='relative'>
          <img
            src={user.banner || 'https://i.ibb.co/kmx9MnW/logo-text.png'}
            alt=''
            className='w-full h-52 rounded object-cover'
          />
          <Avatar
            src={user.profile}
            name={user.name}
            size='2xl'
            className='absolute -bottom-14 ml-auto mr-auto left-0 right-0'
          />
        </div>
        <Heading mt={12} fontSize='3xl'>
          {user.name}
        </Heading>
        <Text fontSize='xl'>@{user.username}</Text>
        {user.bio && (
          <Text mt={3} fontSize='xl'>
            {user.bio}
          </Text>
        )}
        <div className='mb-5' />
        {socials.map((social, idx) => (
          <ChakraLink key={idx} href={social.link}>
            <Button
              background={social.bgColor}
              textColor={social.textColor}
              size='lg'
              _hover={{
                opacity: '0.7',
              }}
              w='full'
              mb={2}
            >
              {social.title}
            </Button>
          </ChakraLink>
        ))}
      </Container>
    </div>
  );
};
