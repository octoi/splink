import React, { useState } from 'react';
import { SetState } from '@/utils/reactTypes';
import { AiOutlineUpload } from 'react-icons/ai';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

interface Props {
  image: string;
  setImage: SetState<string>;
  title: string;
  disabled?: boolean;
  removeImage?: boolean;
}

export const UploadImage: React.FC<Props> = ({
  image,
  setImage,
  disabled,
  title,
  removeImage,
}) => {
  const toast = useToast();
  const fileInputRef = React.useRef<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [rawImage, setRawImage] = useState<any>(undefined);
  const [previewImage, setPreviewImage] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = () => {
    setLoading(true);

    let body = new FormData();

    body.set('key', process.env.NEXT_PUBLIC_IMGBB_KEY || '');
    body.set('image', rawImage);

    axios({
      method: 'POST',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
    })
      .then((data) => {
        const urlPath = data?.data?.data;
        setImage(urlPath?.display_url);
        onClose();
      })
      .catch((err) => {
        toast({
          title: 'Failed to upload image',
          description: err?.message || '',
          position: 'top-right',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Button disabled={disabled} size='lg' variant='outline' onClick={onOpen}>
        {title}
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Image</ModalHeader>
          <ModalCloseButton disabled={loading} />
          <ModalBody>
            <img
              src={previewImage ? URL.createObjectURL(previewImage) : image}
              alt=''
              className='mb-5'
            />
            <Button
              colorScheme='blue'
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
            >
              <AiOutlineUpload className='text-xl mr-2' /> Select file
            </Button>
            <input
              type='file'
              ref={fileInputRef}
              className='hidden'
              accept='image/*'
              onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                  setRawImage(undefined);
                  setPreviewImage(undefined);
                  return;
                }

                if (e.target.files[0].type.includes('image/')) {
                  let file = e.target.files[0];
                  let reader = new FileReader();

                  reader.onloadend = (event) => {
                    let targetFile: any = event.target?.result;
                    setRawImage(targetFile.split(',').pop());
                    setPreviewImage(file);
                  };

                  if (file) reader.readAsDataURL(file);
                } else {
                  toast({
                    title: 'Unsupported file type',
                    description: 'please select an image',
                    status: 'error',
                    isClosable: true,
                    duration: 3000,
                    position: 'top-right',
                  });
                }
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant='outline'
              mr={3}
              onClick={onClose}
              disabled={loading}
            >
              Close
            </Button>
            {removeImage && (
              <Button
                variant='outline'
                colorScheme='red'
                mr={3}
                onClick={() => {
                  setRawImage(undefined);
                  setPreviewImage(undefined);
                  setImage('');
                }}
                disabled={loading}
              >
                Remove image
              </Button>
            )}
            <Button
              colorScheme='teal'
              onClick={handleUploadImage}
              isLoading={loading}
              disabled={!rawImage}
            >
              Upload image
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
