import React from 'react';
import Head from 'next/head';
import { ReactComponent } from '@/utils/reactTypes';
import { Header } from './header';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  banner?: string;
}

export const Layout: ReactComponent<Props> = ({
  children,
  title,
  description,
  image,
  banner,
}) => {
  title = title || 'Splink';
  description = description || 'Copy & share internet 🔗.';
  image = image || '/splink.svg';

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='icon' href={image} />
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={banner ? banner : image} />
        <meta property='og:type' content='website' />
      </Head>
      <Header />
      {children}
    </>
  );
};
