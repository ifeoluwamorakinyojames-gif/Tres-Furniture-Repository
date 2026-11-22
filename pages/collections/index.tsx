import Head from 'next/head';
import { Header, Footer, CategoryCard } from '../../components/Site';
import { categories } from '../../lib/catalog';
export default function Collections() {
  return (
    <>
      <Head>
        <title>Product Collections in Warri | RUFES</title>
        <meta
          name="description"
          content="Browse furniture, chandeliers, gym equipment, home décor, playground equipment and Christmas decorations in Warri at RUFES."
        />
      </Head>
      <Header />
      <main className="wrap">
        <h1>Explore our collections</h1>
        <p>
          Browse RUFES product departments and contact our Warri showroom for
          current selections.
        </p>
        <div className="grid">
          {categories.map(c => (
            <CategoryCard key={c.slug} c={c} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
