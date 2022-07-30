import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setUser } from '@/utils/user.util';
import { UserSocial, UserType } from '@/utils/types';
import { Biodata } from './Biodata';
import { OtherData } from './OtherData';
import { Socials } from './Socials';
import { Button, Heading, useToast } from '@chakra-ui/react';
import { getToken } from '@/utils/session';

interface Props {
  userData: UserType;
}

export const SettingsForm: React.FC<Props> = ({ userData }) => {
  const router = useRouter();
  const toast = useToast();

  const [name, setName] = useState(userData.name);
  const [username, setUsername] = useState(userData.username);
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState(userData.profile);

  const [bio, setBio] = useState(userData.bio || '');
  const [banner, setBanner] = useState(userData.banner || '');
  const [socials, setSocials] = useState<UserSocial[]>(
    JSON.parse(userData.socials || '[]')
  );

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    let requestData: any = {
      name,
      username,
      profile,
      password,
      bio: bio.trim().length !== 0 ? bio : null,
      banner: banner.trim().length !== 0 ? banner : null,
      socials: socials.length !== 0 ? JSON.stringify(socials) : null,
    };

    if (password.length === 0) {
      delete requestData.password;
    }

    axios
      .post('/api/account/update', requestData, {
        headers: {
          Authorization: 'Bearer ' + getToken(),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          router.push(`/${username}`);

          toast({
            title: 'Enjoy your new change',
            description: 'Profile updated successfully',
            isClosable: true,
            status: 'success',
            duration: 3000,
            position: 'top-right',
          });
        } else {
          toast({
            title: `${res.data?.message}`,
            description: 'Failed to update profile',
            isClosable: true,
            status: 'error',
            duration: 3000,
            position: 'top-right',
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Failed to update',
          description:
            err?.request.status !== 409
              ? 'Failed to update'
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
      <Heading>Settings</Heading>
      <Biodata
        name={name}
        username={username}
        password={password}
        profile={profile}
        setName={setName}
        setUsername={setUsername}
        setPassword={setPassword}
        setProfile={setProfile}
        loading={loading}
      />
      <OtherData
        bio={bio}
        banner={banner}
        setBio={setBio}
        setBanner={setBanner}
        loading={loading}
      />
      <Socials socials={socials} setSocials={setSocials} loading={loading} />
      <Button
        size='lg'
        mt={5}
        colorScheme='teal'
        w='full'
        disabled={
          name.trim().length === 0 || username.trim().length === 0 || loading
        }
        isLoading={loading}
        onClick={handleFormSubmit}
      >
        Update Profile
      </Button>
    </div>
  );
};
