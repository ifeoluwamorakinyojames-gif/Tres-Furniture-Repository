import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Header, Footer } from '../components/Site';
export default function Contact() {
  const router = useRouter();
  const product = typeof router.query.product === 'string' ? router.query.product.slice(0, 120) : '';
  const [status,setStatus]=useState('');
  const [busy,setBusy]=useState(false);
  const submit=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();setBusy(true);setStatus('');
    const form=e.currentTarget;
    const values=Object.fromEntries(new FormData(form).entries());
    try{
      const response=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,product})});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||'Unable to send');
      setStatus('Thank you. Your quotation request has been received.');form.reset();
    }catch(error){setStatus('Your request was not submitted. '+String(error));}finally{setBusy(false);}
  };
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
        <form className="adminPanel enquiryForm" onSubmit={submit}>
          <h2>Send your quotation request</h2>
          <label>Your name<input name="name" maxLength={120} required /></label>
          <label>Email address<input name="email" type="email" maxLength={180} required /></label>
          <label>Phone (optional)<input name="phone" type="tel" maxLength={40} /></label>
          <label>What would you like to know?<textarea name="message" maxLength={1500} rows={5} required placeholder="Describe the product, dimensions, quantity or installation requirements." /></label>
          <label className="enquiryHoneypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <button className="btn" type="submit" disabled={busy}>{busy?'Sending…':'Send quotation request'}</button>
          {status&&<p role="status">{status}</p>}
        </form>
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
