import Head from 'next/head';
import Link from 'next/link';
import { Header, Footer, ImageCard } from '../../components/Site';
import { services } from '../../lib/content';

export default function Services() {
  return <>
    <Head>
      <title>Installation, Interior Styling & Delivery Services in Warri | RUFES</title>
      <meta name="description" content="Explore RUFES furniture installation, chandelier installation, gym and playground setup, interior styling and delivery services in Warri." />
      <link rel="canonical" href="https://rufes-home-and-lifestyle.pages.dev/services/" />
    </Head>
    <Header />
    <main className="wrap">
      <h1>Our services in Warri</h1>
      <p>Explore the services offered by RUFES Strategic Ventures. Contact the showroom to confirm availability, service coverage, scheduling and quotations.</p>
      <div className="grid">
        {services.map(service => <article className="product" key={service.slug}>
          <Link href={'/services/' + service.slug}><ImageCard kind={service.kind} alt={service.name + ' illustrative image'} /></Link>
          <div className="details"><h2>{service.name}</h2><p>{service.description}</p><Link href={'/services/' + service.slug}>Learn more →</Link></div>
        </article>)}
      </div>
    </main>
    <Footer />
  </>;
}
