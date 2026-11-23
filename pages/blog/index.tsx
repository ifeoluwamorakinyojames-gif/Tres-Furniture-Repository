import Head from 'next/head';
import Link from 'next/link';
import { Header, Footer, ImageCard } from '../../components/Site';
import { articles } from '../../lib/content';

export default function Blog() {
  return <>
    <Head><title>Furniture, Lighting & Home Lifestyle Guides | RUFES Blog</title><meta name="description" content="Read RUFES guides about furniture, lighting, décor and home gym planning in Warri." /><link rel="canonical" href="https://rufes-home-and-lifestyle.pages.dev/blog/" /></Head>
    <Header />
    <main className="wrap"><h1>RUFES inspiration & guides</h1><p>Helpful articles on furniture, lighting, home styling and recreation. These introductory guides are not product availability announcements.</p><div className="grid">{articles.map(article => <article className="product" key={article.slug}><Link href={'/blog/' + article.slug}><ImageCard kind={article.kind} alt={article.title + ' illustrative image'} /></Link><div className="details"><h2>{article.title}</h2><p>{article.body.slice(0,150)}…</p><Link href={'/blog/' + article.slug}>Read article →</Link></div></article>)}</div></main>
    <Footer />
  </>;
}
