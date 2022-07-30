import React, { useState } from 'react';
import { UserSocial } from '@/utils/types';
import { ReactComponent, SetState } from '@/utils/reactTypes';
import {
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  socials: UserSocial[];
  setSocials: SetState<UserSocial[]>;
  loading: boolean;
  social?: UserSocial;
  socialIdx?: number;
  title?: string;
}

export const SocialEdit: ReactComponent<Props> = ({
  socials,
  setSocials,
  loading,
  social,
  socialIdx,
  children,
  title,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [socialTitle, setSocialTitle] = useState(social?.title || '');
  const [socialLink, setSocialLink] = useState(social?.link || '');
  const [socialBgColor, setSocialBgColor] = useState(
    social?.bgColor || '#000000'
  );
  const [socialTextColor, setSocialTextColor] = useState(
    social?.textColor || '#ffffff'
  );

  const closeModal = () => {
    setSocialTitle(social?.title || '');
    setSocialLink(social?.link || '');
    setSocialBgColor(social?.bgColor || '#000');
    setSocialTextColor(social?.textColor || '#ffffff');
    onClose();
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    let newSocial: UserSocial = {
      title: socialTitle,
      link: socialLink,
      bgColor: socialBgColor,
      textColor: socialTextColor,
    };

    let allSocials = [...socials];

    if (social && socialIdx !== undefined) {
      allSocials[socialIdx] = newSocial;
    } else {
      allSocials.push(newSocial);
    }

    closeModal();
    setSocials(allSocials);
  };

  const deleteSocial = () => {
    if (socialIdx === undefined) return;

    let allSocials = [...socials];
    allSocials.splice(socialIdx, 1);
    setSocials(allSocials);

    closeModal();
  };

  return (
    <>
      <div className='w-full' onClick={onOpen}>
        {children}
      </div>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={closeModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title || 'Edit social'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleFormSubmit}>
            <ModalBody>
              <Center
                py={5}
                className='border-2 border-dashed'
                overflowX='hidden'
              >
                <Button
                  background={socialBgColor}
                  textColor={socialTextColor}
                  size='lg'
                  _hover={{
                    opacity: '0.7',
                  }}
                >
                  {socialTitle || 'hello world'}
                </Button>
              </Center>
              <Input
                mt={5}
                placeholder='Title'
                variant='filled'
                size='lg'
                type='text'
                value={socialTitle}
                onChange={(e) => setSocialTitle(e.target.value)}
                disabled={loading}
                required
              />
              <Input
                mt={5}
                placeholder='Link'
                variant='filled'
                size='lg'
                type='url'
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
                disabled={loading}
                required
              />
              <Input
                mt={5}
                placeholder='Link'
                variant='filled'
                size='lg'
                type='color'
                value={socialBgColor}
                onChange={(e) => setSocialBgColor(e.target.value)}
                disabled={loading}
                required
              />
              <Input
                mt={5}
                placeholder='Link'
                variant='filled'
                size='lg'
                type='color'
                value={socialTextColor}
                onChange={(e) => setSocialTextColor(e.target.value)}
                disabled={loading}
                required
              />
            </ModalBody>

            <ModalFooter>
              <Button mr={2} variant='outline' onClick={closeModal}>
                cancel
              </Button>
              {socialIdx !== undefined && (
                <Button
                  mr={2}
                  colorScheme='red'
                  variant='outline'
                  onClick={deleteSocial}
                >
                  delete
                </Button>
              )}
              <Button
                type='submit'
                colorScheme='teal'
                disabled={
                  socialTitle.trim().length === 0 ||
                  socialLink.trim().length === 0
                }
              >
                {title || 'Edit social'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
