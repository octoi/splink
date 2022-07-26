import React from 'react';
import Head from 'next/head';
import { ReactComponent } from '@/utils/reactTypes';
import { Header } from './header';
import { Footer } from './Footer';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  banner?: string;
  disableHeader?: boolean;
}

export const Layout: ReactComponent<Props> = ({
  children,
  title,
  description,
  image,
  banner,
  disableHeader,
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
      {!disableHeader && <Header />}
      {children}
      <Footer />
    </>
  );
};
