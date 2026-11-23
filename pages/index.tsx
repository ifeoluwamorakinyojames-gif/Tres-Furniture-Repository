import Head from 'next/head';
import Link from 'next/link';
import { Header, Footer, CategoryCard, ProductCard } from '../components/Site';
import { categories, products, photos } from '../lib/catalog';
import { services, articles } from '../lib/content';
import HomeHeroSlider from '../components/HomeHeroSlider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufes-home-and-lifestyle.pages.dev';

const groups = [
  { name: 'Furniture & interiors', text: 'Comfortable living, considered design.', image: photos.furniture, href: '/collections/furniture', tag: 'CURATED LIVING' },
  { name: 'Chandeliers & lighting', text: 'Statement pieces that transform a room.', image: photos.lighting, href: '/collections/lighting', tag: 'LIGHTING EDIT' },
  { name: 'Fitness & recreation', text: 'Explore equipment for active spaces.', image: photos.gym, href: '/collections/gym', tag: 'ACTIVE LIVING' },
];

export default function Home() {
  return <>
    <Head>
      <title>Furniture, Chandeliers, Gym & Playground Equipment in Warri | RUFES</title>
      <meta name="description" content="Explore furniture, chandeliers, home décor, gym equipment, playground products, sports and Christmas decorations at RUFES Strategic Ventures in Warri." />
      <link rel="canonical" href={siteUrl + '/'} />
      <meta property="og:title" content="RUFES Strategic Ventures | Lifestyle, Home & Recreation" />
      <meta property="og:type" content="website" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context':'https://schema.org', '@type':'Store', name:'RUFES Strategic Ventures', url:siteUrl + '/', description:'Furniture, home décor, lighting, gym and recreational products in Warri.', address:{'@type':'PostalAddress',streetAddress:"First Floor, The J's Innovations Building, Airport Road",addressLocality:'Warri',addressRegion:'Delta State',addressCountry:'NG'} }) }} />
    </Head>
    <Header />
    <HomeHeroSlider />
    <div className="promiseBar"><span>Thoughtfully curated collections</span><span>Installation & styling enquiries</span><span>Visit our Warri showroom</span></div>
    <main className="homeMain">
      <section className="wrap">
        <div className="sectionTitle"><div><span className="sectionKicker">EXPLORE RUFES</span><h2>Explore our collections</h2></div><Link href="/collections">All collections →</Link></div>
        <div className="categoryGrid">{categories.map(c => <CategoryCard key={c.slug} c={c} />)}</div>
      </section>
      <section className="wrap editorialWrap">
        <div className="sectionTitle"><div><span className="sectionKicker">DESIGNED FOR EVERY SPACE</span><h2>Find your inspiration</h2></div></div>
        <div className="editorialGrid">{groups.map(g => <Link className="editorialCard" key={g.name} href={g.href} style={{ backgroundImage: 'linear-gradient(0deg,rgba(23,16,14,.82),transparent 72%),url(' + g.image + ')' }}>
          <div><span>{g.tag}</span><h3>{g.name}</h3><p>{g.text}</p><strong>Explore collection →</strong></div>
        </Link>)}</div>
      </section>
      <section className="wrap">
        <div className="sectionTitle"><div><span className="sectionKicker">THE RUFES EDIT</span><h2>Featured product inspiration</h2></div><Link href="/collections">View all →</Link></div>
        <p className="muted">Illustrative catalogue images. Contact the showroom to confirm actual models, prices and stock.</p>
        <div className="grid">{products.slice(0,8).map(p=><ProductCard key={p.slug} p={p}/>)}</div>
      </section>
      <section className="widePromo"><div className="widePromoImage" style={{backgroundImage:'url(' + photos.lighting + ')'}}/><div className="widePromoCopy"><span className="sectionKicker">THE LIGHTING COLLECTION</span><h2>Make a statement with light.</h2><p>From contemporary chandeliers to warm decorative lighting, explore ideas for memorable interiors.</p><Link className="btn" href="/collections/lighting">Explore lighting →</Link></div></section>
      <section className="wrap">
        <div className="sectionTitle"><div><span className="sectionKicker">MORE THAN A SHOWROOM</span><h2>Our services</h2></div><Link href="/services">All services →</Link></div>
        <div className="serviceGrid">{services.map((s,i)=><Link href={'/services/'+s.slug} key={s.slug} className="serviceTile"><span className="serviceNumber">0{i+1}</span><h3>{s.name}</h3><p>{s.description}</p><strong>Learn more →</strong></Link>)}</div>
      </section>
      <section className="wrap">
        <div className="sectionTitle"><div><span className="sectionKicker">IDEAS & INSPIRATION</span><h2>From the RUFES journal</h2></div><Link href="/blog">All articles →</Link></div>
        <div className="journalGrid">{articles.map(a=><Link className="journalCard" href={'/blog/'+a.slug} key={a.slug}><img src={photos[a.kind] || photos.decor} alt={a.title+' illustrative image'} loading="lazy"/><div><span className="sectionKicker">RUFES GUIDE</span><h3>{a.title}</h3><strong>Read guide →</strong></div></Link>)}</div>
      </section>
      <section className="wrap"><div className="visitBanner"><div><span className="sectionKicker">COME SEE US</span><h2>Visit the RUFES showroom</h2><p>First Floor, The J's Innovations Building, Airport Road, Warri, Delta State, Nigeria — near KI Ultimate.</p></div><Link className="btn" href="/showroom">Plan your visit →</Link></div></section>
    </main>
    <Footer />
  </>;
}
