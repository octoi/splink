import React, { useEffect, useState } from 'react';
import { Avatar, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/states/user.state';
import { UserType } from '@/utils/types';
import { logoutUser } from '@/utils/user.util';

export const Header: React.FC = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const [userData, setUserData] = useState<UserType | null>(null);

  const userState = useHookState(userStore);

  useEffect(() => {
    setUserData(userState.get());
  }, []);

  return (
    <Flex justifyContent='space-between' alignItems='center' p={5}>
      <Avatar src='/splink.svg' border='none' />
      <IconButton
        aria-label='toggle theme'
        icon={colorMode == 'dark' ? <FiSun /> : <FiMoon />}
        onClick={toggleColorMode}
        variant='ghost'
        size='lg'
      />
      {userData && <p onClick={logoutUser}>{userData.name}</p>}
    </Flex>
  );
};
