import type { NextPage } from 'next';
import { useState } from 'react';
import { Header } from '@/components/header';
import { Layout } from '@/components/Layout';
import { Input } from '@chakra-ui/react';
import { HomePageContent } from '@/components/home';

const HomePage: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout disableHeader>
      <Header>
        <Input
          placeholder='🔍 Search . . .'
          mx={3}
          variant='filled'
          type='text'
          size='lg'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
      </Header>
      <HomePageContent searchQuery={searchQuery.trim().toLowerCase()} />
    </Layout>
  );
};

export default HomePage;
