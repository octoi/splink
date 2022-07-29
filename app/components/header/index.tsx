import React from 'react';
import { Avatar, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';

export const Header: React.FC = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex justifyContent='space-between' alignItems='center' p={5}>
      <Avatar src='/splink.svg' border='none' />
      <IconButton
        aria-label='toggle theme'
        icon={colorMode == 'dark' ? <FiSun /> : <FiMoon />}
        onClick={toggleColorMode}
        variant='ghost'
        size='lg'
      />
    </Flex>
  );
};
