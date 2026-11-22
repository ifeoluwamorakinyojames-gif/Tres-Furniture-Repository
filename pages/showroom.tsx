import Head from 'next/head';
import Link from 'next/link';
import { Header, Footer } from '../components/Site';
export default function Showroom() {
  return (
    <>
      <Head>
        <title>RUFES Showroom on Airport Road, Warri | Visit Us</title>
        <meta
          name="description"
          content="Find RUFES Strategic Ventures showroom on Airport Road, Warri, Delta State. Explore furniture, lighting, décor and recreation products."
        />
      </Head>
      <Header />
      <main className="wrap">
        <h1>Visit our Warri showroom</h1>
        <p>
          <strong>RUFES Strategic Ventures</strong>
        </p>
        <p>First Floor, The J's Innovations Building, Airport Road, Warri, Delta State, Nigeria</p>
        <div className="note">
          The showroom is on the first floor. Use The J's Innovations on Airport Road as your landmark; confirm the exact entrance before visiting.
        </div>
        <p><a className="btn" href="https://www.google.com/maps/search/?api=1&query=The+J%27s+Innovations+Airport+Road+Warri" target="_blank" rel="noopener noreferrer">View landmark on Google Maps →</a></p>
        <h2>Explore our collections in person</h2>
        <p>
          Ask about furniture, chandeliers, interior décor, playground
          equipment, gym equipment and seasonal decorations.
        </p>
        <Link className="btn" href="/contact">
          Contact the showroom →
        </Link>
      </main>
      <Footer />
    </>
  );
}
