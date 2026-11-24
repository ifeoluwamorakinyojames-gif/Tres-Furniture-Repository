import Link from 'next/link';
import { products, categories, photos } from '../lib/catalog';
import { useSiteImages } from './useSiteImages';
export function Header() {
  return (
    <header>
      <nav className="nav">
        <Link href="/" className="logo brandLogo" aria-label="RUFES Strategic Ventures home">
          <img src="/resources/RUFES_Strategic_Ventures_Logo.jpg" alt="Original RUFES Strategic Ventures logo" width="64" height="64" loading="eager" fetchPriority="high" decoding="async" />
          <span>RUFES<small>STRATEGIC VENTURES</small></span>
        </Link>
        <div className="links">
          <Link href="/">Home</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/services">Services</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/search">Search</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/about">About</Link>
          <Link href="/showroom">Locations</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footerInner">
        <div>
          <Link href="/" className="footerBrand"><img src="/resources/RUFES_Strategic_Ventures_Logo.jpg" alt="RUFES Strategic Ventures logo" width="72" height="72" /><span><b>RUFES Strategic Ventures</b><small>Furniture · Décor · Fitness · Recreation</small></span></Link>
        </div>
        <div>
          <div><h3>Lagos — Headquarters</h3><p>Shop I265, Road 5, Ikota Shopping Complex, Lagos, Nigeria</p><p><a href="https://www.google.com/maps/search/?api=1&query=Shop%20I265%2C%20Road%205%2C%20Ikota%20Shopping%20Complex%2C%20Lagos%2C%20Nigeria">Get directions</a></p><h3>Warri / Effurun Branch</h3><p>62 Airport Road, Effurun, near Ugboroke Junction, Delta State, Nigeria</p><p><a href="https://www.google.com/maps/search/?api=1&query=62%20Airport%20Road%2C%20Effurun%2C%20near%20Ugboroke%20Junction%2C%20Delta%20State%2C%20Nigeria">Get directions</a></p><p><a href="tel:+2348075415120">Call 08075415120</a> · <a href="https://wa.me/2348075415120">WhatsApp</a></p></div>
          <br />
          Contact the showroom to confirm product availability.
          <p className="footerLinks"><Link href="/about">About</Link> · <Link href="/services">Services</Link> · <Link href="/blog">Blog</Link> · <Link href="/gallery">Gallery</Link> · <Link href="/faqs">FAQs</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Website terms</Link></p>
        </div>
      </div>
    </footer>
  );
}
export function ImageCard({ kind, alt }: { kind: string; alt: string }) {
  const image = useSiteImages()('category:' + kind, photos[kind] || photos.decor);
  return <img src={image.src} alt={image.alt || alt} loading="lazy" />;
}
export function ProductCard({ p }: { p: (typeof products)[number] }) {
  return (
    <article className="product">
      <Link href={'/products/' + p.slug}>
        <ImageCard
          kind={p.kind}
          alt={p.name + ' — illustrative category photograph'}
        />
      </Link>
      <div className="details">
        <span className="muted">{p.category}</span>
        <h3>{p.name}</h3>
        <p className="muted">Request a quote for current options and availability.</p>
        <Link href={'/products/' + p.slug}>View product →</Link>
      </div>
    </article>
  );
}
export function CategoryCard({ c }: { c: (typeof categories)[number] }) {
  return (
    <Link className="tile" href={'/collections/' + c.slug}>
      <ImageCard kind={c.slug} alt={c.name + ' collection illustration'} />
      <div>
        <strong>{c.name}</strong>
        <span className="muted">{c.description}</span>
      </div>
    </Link>
  );
}
