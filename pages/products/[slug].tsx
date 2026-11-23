import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Header, Footer, ImageCard } from '../../components/Site';
import { products, photos } from '../../lib/catalog';
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: products.map(p => ({ params: { slug: p.slug } })),
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { slug: params?.slug },
});
export default function Product({ slug }: { slug: string }) {
  const p = products.find(x => x.slug === slug)!;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufes-home-and-lifestyle.pages.dev';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    category: p.category,
    image: photos[p.kind],
    url: siteUrl + '/products/' + p.slug + '/',
    seller: { '@type': 'Organization', name: 'RUFES Strategic Ventures' },
    brand: { '@type': 'Brand', name: 'RUFES Strategic Ventures' },
  };
  return (
    <>
      <Head>
        <title>{p.name} in Warri, Nigeria | RUFES Strategic Ventures</title>
        <link rel="canonical" href={'https://rufes-strategic-ventures-by5dpa.v2.appdeploy.ai/products/' + p.slug + '/'} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={p.name + ' in Warri | RUFES'} />
        <meta property="og:description" content={p.description} />
        <meta property="og:image" content={photos[p.kind]} />
        <meta
          name="description"
          content={
            p.description +
            ' Enquire at RUFES Strategic Ventures, Warri, for current availability and pricing.'
          }
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Header />
      <main className="wrap">
        <div className="crumb">
          <Link href="/">Home</Link> /{' '}
          <Link href="/collections">Collections</Link> / {p.name}
        </div>
        <div className="detailGrid">
          <ImageCard kind={p.kind} alt={p.name + ' illustrative photograph'} />
          <div>
            <span className="eyebrow">{p.category}</span>
            <h1>{p.name} in Warri</h1>
            <p>{p.description}</p>
            <div className="note">
              Catalogue preview: the image is illustrative, not a verified
              photograph of RUFES inventory. Exact specifications and
              stock must be confirmed with the showroom. Request a quotation for pricing.
            </div>
            <p>
              <strong>Quotation:</strong> Available on request
            </p>
            <p>
              <strong>Availability:</strong> Please confirm
            </p>
            <Link className="btn" href={{ pathname: '/contact', query: { product: p.name } }}>
              Request a quotation →
            </Link>
          </div>
        </div>
        <section style={{ marginTop: 50 }}>
          <h2>Product details and buying guidance</h2>
          <p>{p.name} is part of the {p.category.toLowerCase()} range presented by RUFES Strategic Ventures in Warri, Delta State. The displayed photograph is an illustration, not a confirmed in-stock item. Ask our showroom for actual photographs, available models, measurements, finishes and a quotation before making a decision.</p>
          <h3>What should I check before ordering?</h3>
          <p>Confirm the dimensions and fit for your intended space, product materials and finish, care or operating requirements, delivery arrangements and whether installation is needed. Any technical specification must be confirmed for the exact model offered.</p>
          <h3>Where can I view related items?</h3>
          <p><Link href={'/collections/' + p.kind}>Explore the {p.category} collection →</Link> or <Link href="/showroom">find the Warri showroom →</Link>.</p>
          <h2>Frequently asked questions</h2>
          <h3>Where can I enquire about {p.name.toLowerCase()} in Warri?</h3>
          <p>
            Contact RUFES Strategic Ventures or visit the Airport Road showroom
            in Warri to ask about current products.
          </p>
          <h3>Is this item available now?</h3>
          <p>
            Please contact the showroom to confirm current availability,
            specifications and price.
          </p>
        </section>
        <section><h2>Related RUFES collections and services</h2><p><Link href="/collections">Browse all product categories →</Link> · <Link href="/services">Installation and delivery services →</Link> · <Link href="/blog">Product buying guides →</Link></p></section>
      </main>
      <Footer />
    </>
  );
}
