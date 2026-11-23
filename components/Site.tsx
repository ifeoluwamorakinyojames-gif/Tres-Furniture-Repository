import Link from 'next/link';
import { products, categories, photos } from '../lib/catalog';
import { useSiteImages } from './useSiteImages';
export function Header() {
  return (
    <header>
      <nav className="nav">
        <Link href="/" className="logo brandLogo" aria-label="RUFES Strategic Ventures home">
          <img src="/resources/rufes-logo.jpg" alt="Original RUFES Strategic Ventures logo" width="64" height="64" />
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
          <Link href="/showroom">Showroom</Link>
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
          <Link href="/" className="footerBrand"><img src="/resources/rufes-logo.jpg" alt="RUFES Strategic Ventures logo" width="72" height="72" /><span><b>RUFES Strategic Ventures</b><small>Furniture · Décor · Fitness · Recreation</small></span></Link>
        </div>
        <div>
          First Floor, The J's Innovations Building, Airport Road, Warri, Delta State, Nigeria
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
