import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { RegisterForm } from '@/components/account/RegisterForm';
import { Container } from '@chakra-ui/react';

const Login: NextPage = () => {
  return (
    <Layout title='Register'>
      <Container mt={100} centerContent maxW='container.sm'>
        <RegisterForm />
      </Container>
    </Layout>
  );
};

export default Login;
