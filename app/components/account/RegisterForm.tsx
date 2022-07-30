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

export const RegisterForm: React.FC = () => {
  const toast = useToast();
  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // check if username is a valid by not containing special characters
  const validUsername = () => {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(username)) {
      toast({
        title: 'Please use an username without symbols',
        description: 'You can use letters or numbers',
        isClosable: true,
        status: 'error',
        duration: 5000,
        position: 'top-right',
      });

      setUsername('');
      setLoading(false);

      return false;
    }

    return true;
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    if (!validUsername()) {
      return;
    }

    axios
      .post('/api/account/register', {
        name,
        username,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          router.push('/');

          toast({
            title: `Welcome ${name} to splink 🥳`,
            description: 'Registered account successfully',
            isClosable: true,
            status: 'success',
            duration: 5000,
            position: 'top-right',
          });
        } else {
          toast({
            title: res.data?.message,
            description: 'Failed to register data',
            isClosable: true,
            status: 'error',
            duration: 5000,
            position: 'top-right',
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Failed to register account',
          description:
            err?.request.status !== 409
              ? 'Failed to register account'
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
      <Heading>Register</Heading>
      <form onSubmit={handleFormSubmit}>
        <Input
          mt={5}
          placeholder='Name'
          variant='filled'
          size='lg'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          mt={5}
          placeholder='Username'
          variant='filled'
          type='text'
          size='lg'
          value={username}
          onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
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
          Register Account
        </Button>
      </form>
      <Text mt={5} fontSize='lg'>
        Already have an account ?{' '}
        <Link href={Paths.login} passHref>
          <ChakraLink>Login</ChakraLink>
        </Link>
      </Text>
    </div>
  );
};
