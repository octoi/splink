import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { Container, Link, Text } from '@chakra-ui/react';

export const Footer: React.FC = () => {
  return (
    <Container opacity={0.7} mt={10} mb={10} centerContent>
      <Text className='flex items-center'>
        Made with <AiFillHeart className='mx-1 text-red-400' />{' '}
        <Link href='https://fadhilsaheer.github.io'>Fadhil</Link>
      </Text>
      <Text>
        <Link href='https://planetscale.com/'>PlanetScale</Link> X{' '}
        <Link href='https://hashnode.com/'>Hashnode</Link>
      </Text>
    </Container>
  );
};
