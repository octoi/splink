import React from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { Button } from '@chakra-ui/react';

export const GuestUser: React.FC = () => {
  return (
    <Link href={Paths.login} passHref>
      <Button size='lg' colorScheme='blue'>
        Login
      </Button>
    </Link>
  );
};
