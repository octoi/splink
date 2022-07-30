import React from 'react';
import { SetState } from '@/utils/reactTypes';
import { Avatar, Flex, Input } from '@chakra-ui/react';
import { UploadImage } from './UploadImage';

interface Props {
  name: string;
  username: string;
  password: string;
  profile: string;
  setName: SetState<string>;
  setUsername: SetState<string>;
  setPassword: SetState<string>;
  setProfile: SetState<string>;
  loading: boolean;
}

export const Biodata: React.FC<Props> = ({
  name,
  username,
  password,
  profile,
  setName,
  setUsername,
  setPassword,
  setProfile,
  loading,
}) => {
  return (
    <div>
      <Flex mt={5} alignItems='center'>
        <Avatar src={profile} size='lg' mr={5} />
        <UploadImage
          image={profile}
          setImage={setProfile}
          disabled={loading}
          title='Edit profile'
        />
      </Flex>
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
        onChange={(e) => setUsername(e.target.value.trim())}
        disabled={loading}
        required
      />
      <Input
        mt={5}
        placeholder='New password'
        variant='filled'
        type='password'
        size='lg'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
    </div>
  );
};
