import React, { useEffect } from 'react';
import { ReactComponent } from '@/utils/reactTypes';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/states/user.state';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { Paths } from '@/utils/paths';

export const AuthProtected: ReactComponent = ({ children }) => {
  const userState = useHookState(userStore);

  const router = useRouter();
  const toast = useToast();

  const redirectWithMessage = () => {
    toast({
      title: 'You are not logged in',
      description: 'Only logged in users, can access that page',
      status: 'info',
      position: 'top-right',
      isClosable: true,
      duration: 3000,
    });
    router.push(Paths.login);
  };

  useEffect(() => {
    let userData = userState.get();

    if (!userData) {
      redirectWithMessage();
    }
  }, []);

  return <div>{children}</div>;
};
