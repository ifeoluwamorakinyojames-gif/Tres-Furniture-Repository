import Head from 'next/head';
import Link from 'next/link';
import { Header, Footer, CategoryCard, ProductCard } from '../components/Site';
import { categories, products, photos } from '../lib/catalog';
import { services, articles } from '../lib/content';
import HomeHeroSlider from '../components/HomeHeroSlider';
import FeaturedProducts from '../components/FeaturedProducts';
import { useSiteImages } from '../components/useSiteImages';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufes-home-and-lifestyle.pages.dev';

const groups = [
  { name: 'Furniture & interiors', text: 'Comfortable living, considered design.', image: photos.furniture, href: '/collections/furniture', tag: 'CURATED LIVING' },
  { name: 'Chandeliers & lighting', text: 'Statement pieces that transform a room.', image: photos.lighting, href: '/collections/lighting', tag: 'LIGHTING EDIT' },
  { name: 'Fitness & recreation', text: 'Explore equipment for active spaces.', image: photos.gym, href: '/collections/gym', tag: 'ACTIVE LIVING' },
];

export default function Home() {
  const siteImage=useSiteImages();
  return <>
    <Head>
      <title>Furniture, Chandeliers, Gym & Playground Equipment in Lagos &amp; Warri | RUFES</title>
      <meta name="description" content="Explore furniture, chandeliers, home décor, gym equipment, playground products, sports and Christmas decorations at RUFES Strategic Ventures in Lagos and Warri." />
      <link rel="canonical" href={siteUrl + '/'} />
      <meta property="og:title" content="RUFES Strategic Ventures | Lifestyle, Home & Recreation" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={siteUrl + '/resources/RUFES_Strategic_Ventures_Logo.jpg'} />
      <meta property="og:image:alt" content="RUFES Strategic Ventures logo" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context':'https://schema.org', '@type':'Store', name:'RUFES Strategic Ventures', url:siteUrl + '/', description:'Furniture, home décor, lighting, gym and recreational products in Lagos and Warri.', telephone:'+2348075415120', address:{'@type':'PostalAddress',streetAddress:'Shop I265, Road 5, Ikota Shopping Complex',addressLocality:'Lagos',addressRegion:'Lagos',addressCountry:'NG'}, department:{'@type':'Store',name:'RUFES Warri / Effurun Branch',telephone:'+2348075415120',address:{'@type':'PostalAddress',streetAddress:'62 Airport Road, near Ugboroke Junction',addressLocality:'Effurun',addressRegion:'Delta State',addressCountry:'NG'}} }) }} />
    </Head>
    <Header />
    <HomeHeroSlider />
    <div className="promiseBar"><span>Thoughtfully curated collections</span><span>Installation & styling enquiries</span><span>Visit our Lagos &amp; Warri showrooms</span></div>
    <main className="homeMain">
      <section className="wrap">
        <div className="sectionTitle"><div><span className="sectionKicker">EXPLORE RUFES</span><h2>Explore our collections</h2></div><Link href="/collections">All collections →</Link></div>
        <div className="categoryGrid">{categories.map(c => <CategoryCard key={c.slug} c={c} />)}</div>
      </section>
      <section className="wrap editorialWrap">
        <div className="sectionTitle"><div><span className="sectionKicker">DESIGNED FOR EVERY SPACE</span><h2>Find your inspiration</h2></div></div>
        <div className="editorialGrid">{groups.map(g => <Link className="editorialCard" key={g.name} href={g.href} style={{ backgroundImage: 'linear-gradient(0deg,rgba(23,16,14,.82),transparent 72%),url(' + siteImage('editorial:'+ (g.href.split('/').pop()||'furniture'),g.image).src + ')' }}>
          <div><span>{g.tag}</span><h3>{g.name}</h3><p>{g.text}</p><strong>Explore collection →</strong></div>
        </Link>)}</div>
      </section>
      <section className="wrap">
        <div className="sectionTitle"><div><span className="sectionKicker">THE RUFES EDIT</span><h2>Featured product inspiration</h2></div><Link href="/collections">View all →</Link></div>
        <p className="muted">Illustrative catalogue images. Contact the showroom to confirm actual models, prices and stock.</p>
        <FeaturedProducts />
      </section>
      <section className="widePromo"><div className="widePromoImage" style={{backgroundImage:'url(' + siteImage('promo:lighting',photos.lighting).src + ')'}}/><div className="widePromoCopy"><span className="sectionKicker">THE LIGHTING COLLECTION</span><h2>Make a statement with light.</h2><p>From contemporary chandeliers to warm decorative lighting, explore ideas for memorable interiors.</p><Link className="btn" href="/collections/lighting">Explore lighting →</Link></div></section>
      <section className="wrap">
        <div className="sectionTitle"><div><span className="sectionKicker">MORE THAN A SHOWROOM</span><h2>Our services</h2></div><Link href="/services">All services →</Link></div>
        <div className="serviceGrid">{services.map((s,i)=><Link href={'/services/'+s.slug} key={s.slug} className="serviceTile"><span className="serviceNumber">0{i+1}</span><h3>{s.name}</h3><p>{s.description}</p><strong>Learn more →</strong></Link>)}</div>
      </section>
      <section className="wrap">
        <div className="sectionTitle"><div><span className="sectionKicker">IDEAS & INSPIRATION</span><h2>From the RUFES journal</h2></div><Link href="/blog">All articles →</Link></div>
        <div className="journalGrid">{articles.map(a=><Link className="journalCard" href={'/blog/'+a.slug} key={a.slug}><img src={photos[a.kind] || photos.decor} alt={a.title+' illustrative image'} loading="lazy"/><div><span className="sectionKicker">RUFES GUIDE</span><h3>{a.title}</h3><strong>Read guide →</strong></div></Link>)}</div>
      </section>
      <section className="wrap"><div className="visitBanner"><div><span className="sectionKicker">COME SEE US</span><h2>Visit the RUFES showroom</h2><div><h3>Lagos — Headquarters</h3><p>Shop I265, Road 5, Ikota Shopping Complex, Lagos, Nigeria</p><p><a href="https://www.google.com/maps/search/?api=1&query=Shop%20I265%2C%20Road%205%2C%20Ikota%20Shopping%20Complex%2C%20Lagos%2C%20Nigeria">Get directions</a></p><h3>Warri / Effurun Branch</h3><p>62 Airport Road, Effurun, near Ugboroke Junction, Delta State, Nigeria</p><p><a href="https://www.google.com/maps/search/?api=1&query=62%20Airport%20Road%2C%20Effurun%2C%20near%20Ugboroke%20Junction%2C%20Delta%20State%2C%20Nigeria">Get directions</a></p><p><a href="tel:+2348075415120">Call 08075415120</a> · <a href="https://wa.me/2348075415120">WhatsApp</a></p></div></div><Link className="btn" href="/showroom">Plan your visit →</Link></div></section>
    </main>
    <Footer />
  </>;
}
