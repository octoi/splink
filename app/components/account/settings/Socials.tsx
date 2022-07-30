import React, { useState, useEffect } from 'react';
import { SetState } from '@/utils/reactTypes';
import { FiPlus } from 'react-icons/fi';
import { Button, Grid, IconButton } from '@chakra-ui/react';
import { SocialEdit } from './SocialEdit';
import { UserSocial } from '@/utils/types';

interface Props {
  socials: UserSocial[];
  setSocials: SetState<UserSocial[]>;
  loading: boolean;
}

export const Socials: React.FC<Props> = ({ socials, setSocials, loading }) => {
  return (
    <div>
      <h2 className='text-2xl font-medium'>Socials</h2>
      <Grid mt={5} templateColumns='repeat(2, 1fr)' gap={2}>
        {socials.map((userSocial, idx) => (
          <SocialEdit
            key={idx}
            socials={socials}
            setSocials={setSocials}
            loading={loading}
            social={userSocial}
            socialIdx={idx}
          >
            <Button
              background={userSocial.bgColor}
              textColor={userSocial.textColor}
              _hover={{
                opacity: '0.7',
              }}
              width='full'
            >
              {userSocial.title}
            </Button>
          </SocialEdit>
        ))}
        <SocialEdit
          socials={socials}
          setSocials={setSocials}
          loading={loading}
          title='New social'
        >
          <IconButton w='full' aria-label='Add social' icon={<FiPlus />} />
        </SocialEdit>
      </Grid>
    </div>
  );
};
