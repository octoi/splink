import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useState as useHookState } from '@hookstate/core';
import { Layout } from '@/components/Layout';
import { Container } from '@chakra-ui/react';
import { AuthProtected } from '@/components/AuthProtected';
import { SettingsForm } from '@/components/account/settings';
import { UserType } from '@/utils/types';
import { userStore } from '@/states/user.state';

const SettingsPage: NextPage = () => {
  const [userData, setUserData] = useState<UserType | null>(null);

  const userState = useHookState(userStore);

  useEffect(() => {
    setUserData(userState.get());
  }, [userState]);

  return (
    <Layout title='Settings'>
      <AuthProtected>
        <Container mt={50} maxW='container.sm'>
          {userData && <SettingsForm userData={userData} />}
        </Container>
      </AuthProtected>
    </Layout>
  );
};

export default SettingsPage;
