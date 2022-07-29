import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { setUser } from '@/utils/user.util';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import {
  Button,
  Heading,
  Input,
  Text,
  Link as ChakraLink,
  useToast,
} from '@chakra-ui/react';

export const LoginForm: React.FC = () => {
  const toast = useToast();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post('/api/account/login', {
        username,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          router.push('/');

          toast({
            title: `Welcome back ${name} to splink 🥳`,
            description: 'Logged in successfully',
            isClosable: true,
            status: 'success',
            duration: 5000,
            position: 'top-right',
          });
        } else {
          toast({
            title: res.data?.message,
            description: 'Failed to login',
            isClosable: true,
            status: 'error',
            duration: 5000,
            position: 'top-right',
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Failed to login',
          description:
            err?.request.status !== 409
              ? 'Failed to login'
              : JSON.parse(err?.request?.response)?.message,
          isClosable: true,
          status: 'error',
          duration: 3000,
          position: 'top-right',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Heading>Login</Heading>
      <form onSubmit={handleFormSubmit}>
        <Input
          mt={5}
          placeholder='Username'
          variant='filled'
          type='text'
          size='lg'
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
          disabled={loading}
          required
        />
        <Input
          mt={5}
          placeholder='Password'
          variant='filled'
          type='password'
          size='lg'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <Button
          type='submit'
          mt={5}
          size='lg'
          colorScheme='teal'
          width='full'
          isLoading={loading}
        >
          Login
        </Button>
      </form>
      <Text mt={5} fontSize='lg'>
        Don't have an account ?{' '}
        <Link href={Paths.register} passHref>
          <ChakraLink>Register</ChakraLink>
        </Link>
      </Text>
    </div>
  );
};
