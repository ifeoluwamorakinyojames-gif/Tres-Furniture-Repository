import Head from 'next/head';
import Link from 'next/link';
import { Header, Footer } from '../components/Site';
export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact RUFES Strategic Ventures | Warri Showroom</title>
        <meta
          name="description"
          content="Contact RUFES Strategic Ventures in Warri about furniture, lighting, gym equipment, home décor, Christmas products and playground equipment."
        />
      </Head>
      <Header />
      <main className="wrap">
        <h1>Contact RUFES</h1>
        <p>
          Interested in a product? Get in touch to confirm availability,
          dimensions, price and showroom visiting details.
        </p>
        <div className="banner">
          <div>
            <h2>Visit our showroom</h2>
            <p>First Floor, The J's Innovations Building, Airport Road, Warri, Delta State, Nigeria</p>
            <p>
              Official contact information and WhatsApp links will be added
              after verification.
            </p>
          </div>
          <Link className="btn" href="/collections">
            Browse collections
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
