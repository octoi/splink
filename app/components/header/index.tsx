import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/states/user.state';
import { UserType } from '@/utils/types';
import { LoggedInUser } from './LoggedInUser';
import { GuestUser } from './GuestUser';

export const Header: React.FC = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const [userData, setUserData] = useState<UserType | null>(null);

  const userState = useHookState(userStore);

  useEffect(() => {
    setUserData(userState.get());
  }, []);

  return (
    <Flex justifyContent='space-between' alignItems='center' p={5}>
      <Link href='/' passHref>
        <Avatar src='/splink.svg' border='none' className='cursor-pointer' />
      </Link>
      <Flex alignItems='center'>
        <IconButton
          aria-label='toggle theme'
          icon={colorMode == 'dark' ? <FiSun /> : <FiMoon />}
          onClick={toggleColorMode}
          variant='outline'
          size='lg'
          mr={3}
        />
        {userData ? <LoggedInUser userData={userData} /> : <GuestUser />}
      </Flex>
    </Flex>
  );
};
