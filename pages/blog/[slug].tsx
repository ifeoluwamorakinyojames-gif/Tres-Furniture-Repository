import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Header, Footer, ImageCard } from '../../components/Site';
import { articles } from '../../lib/content';

export const getStaticPaths: GetStaticPaths = async () => ({ paths: articles.map(article => ({ params: { slug: article.slug } })), fallback: false });
export const getStaticProps: GetStaticProps = async ({ params }) => ({ props: { slug: params?.slug } });

export default function Article({ slug }: { slug: string }) {
  const article = articles.find(item => item.slug === slug)!;
  const url = 'https://rufes-strategic-ventures-by5dpa.v2.appdeploy.ai/blog/' + article.slug + '/';
  return <>
    <Head><title>{article.title} | RUFES Blog</title><meta name="description" content={article.body.slice(0,155)} /><link rel="canonical" href={url} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title, articleBody: article.body, author: { '@type': 'Organization', name: 'RUFES Strategic Ventures' }, publisher: { '@type': 'Organization', name: 'RUFES Strategic Ventures' }, mainEntityOfPage: url }) }} /></Head>
    <Header /><main className="wrap"><div className="crumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / {article.title}</div><span className="eyebrow">RUFES Guides</span><h1>{article.title}</h1><ImageCard kind={article.kind} alt={article.title + ' illustrative photograph'} /><p>{article.body}</p><h2>What to do next</h2><p>Use these ideas to plan your space and compare suitable options. Ask RUFES about actual product models, dimensions, materials, installation support and pricing before purchasing. Product specifications and availability should always be confirmed with the showroom.</p><p><Link href="/services">Explore RUFES installation and delivery services →</Link> · <Link href="/showroom">Visit our Warri showroom →</Link></p><Link className="btn" href="/collections">Explore RUFES collections →</Link></main><Footer />
  </>;
}
