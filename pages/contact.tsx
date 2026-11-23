import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header, Footer } from '../components/Site';
export default function Contact() {
  const router = useRouter();
  const product = typeof router.query.product === 'string' ? router.query.product.slice(0, 120) : '';
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
        <h1>Request a quotation</h1>
        {product && <div className="note"><strong>Product enquiry:</strong> {product}</div>}
        <p>
          Interested in a product? Contact our showroom for a personalized quotation and to confirm availability,
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
