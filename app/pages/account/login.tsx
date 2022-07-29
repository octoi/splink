import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { Container } from '@chakra-ui/react';
import { LoginForm } from '@/components/account/LoginForm';

const LoginPage: NextPage = () => {
  return (
    <Layout title='Login'>
      <Container mt={100} centerContent maxW='container.sm'>
        <LoginForm />
      </Container>
    </Layout>
  );
};

export default LoginPage;
