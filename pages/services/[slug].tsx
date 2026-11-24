import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Header, Footer, ImageCard } from '../../components/Site';
import { services } from '../../lib/content';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: services.map(service => ({ params: { slug: service.slug } })),
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => ({ props: { slug: params?.slug } });

export default function ServiceDetail({ slug }: { slug: string }) {
  const service = services.find(item => item.slug === slug)!;
  const url = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rufes-home-and-lifestyle.pages.dev') + '/services/' + service.slug + '/';
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: service.name, description: service.description, areaServed: ['Warri, Delta State, Nigeria', 'Lagos, Nigeria'].map(name => ({ '@type': 'Place', name })), provider: { '@type': 'Organization', name: 'RUFES Strategic Ventures' }, url };
  return <>
    <Head>
      <title>{service.name} in Lagos and Warri | RUFES Strategic Ventures</title>
      <meta name="description" content={service.description + ' Contact RUFES Strategic Ventures in Lagos and Warri for enquiries.'} />
      <link rel="canonical" href={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
    <Header />
    <main className="wrap">
      <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / {service.name}</div>
      <div className="detailGrid">
        <ImageCard kind={service.kind} alt={service.name + ' illustrative category photograph'} />
        <div>
          <span className="eyebrow">RUFES Services · Lagos & Warri</span>
          <h1>{service.name} in Lagos and Warri</h1>
          <p>{service.description}</p>
          <p>Service availability, quotation, scope and timing must be confirmed directly with RUFES.</p>
          <Link className="btn" href="/contact">Enquire about this service →</Link>
        </div>
      </div>
      <section><h2>How this service works</h2><p>Tell RUFES what you need installed or delivered, the product type and model (if known), the project location and preferred timeframe. The team can discuss the scope, site requirements and whether the service can be arranged. A quotation, timing and service availability must be confirmed before work is booked.</p><h3>Information to prepare for an enquiry</h3><p>Provide clear product photographs, dimensions where available, the site address and any access constraints. For lighting and playground equipment, the installation must follow relevant technical and safety requirements.</p><h2>Frequently asked questions</h2><h3>Can I request a quotation?</h3><p>Yes. Contact the showroom with your requirements to discuss whether the service is available and request a quotation.</p><h3>Is this service available in Lagos and Warri?</h3><p>Contact RUFES to confirm the service area and any travel or delivery arrangements.</p></section>
      <p><Link href="/collections">Browse related product collections →</Link> · <Link href="/blog">Read RUFES buying guides →</Link> · <Link href="/showroom">Visit the showroom →</Link></p>
    </main>
    <Footer />
  </>;
}
