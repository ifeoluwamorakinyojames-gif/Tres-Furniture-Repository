import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufes-home-and-lifestyle.pages.dev';
const business = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  '@id': siteUrl + '/#store',
  name: 'RUFES Strategic Ventures',
  url: siteUrl + '/',
  description: 'Furniture, chandeliers, home décor, gym and playground equipment and lifestyle products in Warri, Delta State, Nigeria.',
  image: siteUrl + '/resources/rufes-logo.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: "First Floor, The J's Innovations Building, Airport Road",
    addressLocality: 'Warri',
    addressRegion: 'Delta State',
    addressCountry: 'NG',
  },
  areaServed: [
    { '@type': 'City', name: 'Warri' },
    { '@type': 'AdministrativeArea', name: 'Delta State' },
  ],
};

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="theme-color" content="#751126" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <meta property="og:site_name" content="RUFES Strategic Ventures" />
      <meta name="geo.region" content="NG-DE" />
      <meta name="geo.placename" content="Warri, Delta State, Nigeria" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, '\\u003c') }} />
    </Head>
    <Component {...pageProps} />
  </>;
}
