import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import MotionEnhancements from '../components/MotionEnhancements';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufes-home-and-lifestyle.pages.dev';
const business = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': siteUrl + '/#store',
  name: 'RUFES Strategic Ventures',
  url: siteUrl + '/',
  description: 'RUFES Strategic Ventures offers furniture, chandeliers, home décor, gym and playground equipment and lifestyle products in Nigeria. Head office in Lagos and showroom in Warri, Delta State.',
  logo: siteUrl + '/resources/RUFES_Strategic_Ventures_Logo.jpg',
  image: siteUrl + '/resources/RUFES_Strategic_Ventures_Logo.jpg',
  location: [
    { '@type':'Place', name:'RUFES Head Office, Lagos', address:{'@type':'PostalAddress',addressLocality:'Lagos',addressRegion:'Lagos State',addressCountry:'NG'} },
    { '@type':'Store', name:'RUFES Warri Showroom', address:{'@type':'PostalAddress',streetAddress:"First Floor, The J's Innovations Building, Airport Road",addressLocality:'Warri',addressRegion:'Delta State',addressCountry:'NG'} },
  ],
  areaServed: [
    { '@type': 'City', name: 'Lagos' },
    { '@type': 'City', name: 'Warri' },
    { '@type': 'AdministrativeArea', name: 'Delta State' },
  ],
};

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <link rel="icon" type="image/svg+xml" sizes="any" href="/favicon.svg" />
      <link rel="preload" as="image" href="/resources/RUFES_Strategic_Ventures_Logo.jpg" />
      <meta name="theme-color" content="#751126" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <meta property="og:site_name" content="RUFES Strategic Ventures" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, '\\u003c') }} />
    </Head>
    <MotionEnhancements />
    <Component {...pageProps} />
  </>;
}
