import Head from 'next/head';
import Link from 'next/link';
import { Header, Footer } from '../components/Site';
export default function Showroom() {
  return (
    <>
      <Head>
        <title>RUFES Showrooms in Lagos &amp; Warri | Visit Us</title>
        <meta
          name="description"
          content="Visit RUFES Strategic Ventures at our Lagos headquarters and Warri / Effurun branch. Explore furniture, lighting, décor and recreation products."
        />
      </Head>
      <Header />
      <main className="wrap">
        <h1>Visit our Lagos and Warri showrooms</h1>
        <p>
          <strong>RUFES Strategic Ventures</strong>
        </p>
        <div><h3>Lagos — Headquarters</h3><p>Shop I265, Road 5, Ikota Shopping Complex, Lagos, Nigeria</p><p><a href="https://www.google.com/maps/search/?api=1&query=Shop%20I265%2C%20Road%205%2C%20Ikota%20Shopping%20Complex%2C%20Lagos%2C%20Nigeria">Get directions</a></p><h3>Warri / Effurun Branch</h3><p>62 Airport Road, Effurun, near Ugboroke Junction, Delta State, Nigeria</p><p><a href="https://www.google.com/maps/search/?api=1&query=62%20Airport%20Road%2C%20Effurun%2C%20near%20Ugboroke%20Junction%2C%20Delta%20State%2C%20Nigeria">Get directions</a></p><p><a href="tel:+2348075415120">Call 08075415120</a> · <a href="https://wa.me/2348075415120">WhatsApp</a></p></div>
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
