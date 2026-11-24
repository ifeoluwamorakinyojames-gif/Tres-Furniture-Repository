import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Header, Footer, ProductCard } from '../../components/Site';
import { categories, products } from '../../lib/catalog';
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: categories.map(c => ({ params: { slug: c.slug } })),
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { slug: params?.slug },
});
export default function Category({ slug }: { slug: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufes-home-and-lifestyle.pages.dev';
  const c = categories.find(x => x.slug === slug)!;
  const list = products.filter(p => p.kind === slug);
  return (
    <>
      <Head>
        <title>{c.name} in Lagos & Warri, Nigeria | RUFES Strategic Ventures</title>
        <link rel="canonical" href={siteUrl + '/collections/' + c.slug + '/'} />
        <meta property="og:title" content={c.name + ' in Lagos and Warri | RUFES Strategic Ventures'} />
        <meta property="og:description" content={c.description + '. Explore RUFES catalogue and enquire about current products in Lagos and Warri.'} />
        <meta
          name="description"
          content={
            'Explore ' +
            c.name.toLowerCase() +
            ' in Lagos and Warri. Browse RUFES catalogue examples and enquire about current products, prices and availability.'
          }
        />
      </Head>
      <Header />
      <main className="wrap">
        <div className="crumb">
          <Link href="/">Home</Link> /{' '}
          <Link href="/collections">Collections</Link> / {c.name}
        </div>
        <h1>{c.name} in Lagos and Warri</h1>
        <p>
          {c.description}. Explore our selection and contact RUFES Strategic
          Ventures to confirm products currently available at our Lagos headquarters or Airport Road showroom in Effurun.
        </p>
        {list.length ? (
          <div className="grid">
            {list.map(p => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        ) : (
          <div className="empty">
            Our online catalogue for this department is being prepared. Please
            contact the showroom to ask about current products.
          </div>
        )}
        <h2>Explore {c.name.toLowerCase()} in Lagos and Warri</h2>
        <p>RUFES Strategic Ventures helps customers explore {c.name.toLowerCase()} for homes, businesses and other spaces. The catalogue is illustrative; request real product photographs and confirm exact sizes, colours, materials, installation requirements and stock with the showroom before ordering.</p>
        <h3>Prices, delivery and availability</h3><p>Request a quotation with your preferred model, dimensions, quantity and delivery location in Lagos or Warri. Our team can confirm current stock and applicable delivery or installation charges.</p><h3>What to consider when choosing</h3>
        <p>Start with the intended use, the available space, practical maintenance and your preferred style. Check dimensions and suitability for the installation location. For equipment and electrical items, request model-specific technical details and qualified installation guidance.</p>
        <h2>Shopping for {c.name.toLowerCase()} in Lagos and Warri?</h2>
        <p>
          Visit our Lagos or Warri showroom or send an enquiry for product photographs,
          dimensions, pricing and availability. Product details are confirmed by
          our team.
        </p>
        <p><Link href="/services">Explore installation and delivery services →</Link> · <Link href="/blog">Read buying guides →</Link></p>
        <Link className="btn" href="/contact">
          Contact RUFES →
        </Link>
      </main>
      <Footer />
    </>
  );
}
