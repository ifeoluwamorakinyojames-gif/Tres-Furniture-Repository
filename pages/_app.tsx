import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return <><Head><link rel="icon" type="image/svg+xml" href="/favicon.svg" /><meta name="theme-color" content="#751126" /><meta name="robots" content="index,follow,max-image-preview:large" /><meta property="og:site_name" content="RUFES Strategic Ventures" /><meta name="geo.region" content="NG-DE" /><meta name="geo.placename" content="Warri, Delta State, Nigeria" /></Head><Component {...pageProps} /></>;
}
