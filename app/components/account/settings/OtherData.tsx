import React from 'react';
import { SetState } from '@/utils/reactTypes';
import { Flex, Textarea } from '@chakra-ui/react';
import { UploadImage } from './UploadImage';
import { Socials } from './Socials';

interface Props {
  bio: string;
  banner: string;
  setBio: SetState<string>;
  setBanner: SetState<string>;
  loading: boolean;
}

export const OtherData: React.FC<Props> = ({
  bio,
  banner,
  setBio,
  setBanner,
  loading,
}) => {
  return (
    <div>
      <Textarea
        size='lg'
        mt={5}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        variant='filled'
        placeholder='Bio'
        disabled={loading}
      />
      <Flex mt={5} mb={5} alignItems='center'>
        {banner.trim().length !== 0 && (
          <img src={banner} alt='banner' className='w-1/2 mr-2' />
        )}
        <UploadImage
          title='Edit banner'
          image={banner}
          setImage={setBanner}
          disabled={loading}
          removeImage
        />
      </Flex>
    </div>
  );
};
