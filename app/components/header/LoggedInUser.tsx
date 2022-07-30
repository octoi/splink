import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { UserType } from '@/utils/types';
import { logoutUser } from '@/utils/user.util';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  userData: UserType;
}

export const LoggedInUser: React.FC<Props> = ({ userData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  const router = useRouter();

  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar src={userData.profile} name={userData.name} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => router.push(`/${userData.username}`)}>
            Profile
          </MenuItem>
          <MenuItem onClick={() => router.push(Paths.new)}>New post</MenuItem>
          <MenuItem onClick={() => router.push(Paths.settings)}>
            Settings
          </MenuItem>
          <MenuItem onClick={onOpen}>
            <Button colorScheme='red' variant='link'>
              Logout
            </Button>
          </MenuItem>
        </MenuList>
      </Menu>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You want to logout.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  logoutUser();
                  onClose();
                  router.push(Paths.login);
                }}
                ml={3}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
