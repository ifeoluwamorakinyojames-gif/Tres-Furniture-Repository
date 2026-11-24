import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState, useEffect } from 'react';
import { Header, Footer } from '../components/Site';
export default function Contact() {
  const router = useRouter();
  const product = typeof router.query.product === 'string' ? router.query.product.slice(0, 120) : '';
  const [branch,setBranch]=useState('');
  useEffect(()=>{if(router.query.branch==='Lagos HQ'||router.query.branch==='Warri / Effurun')setBranch(router.query.branch);},[router.query.branch]);
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
        <title>Contact RUFES Strategic Ventures | Lagos Headquarters &amp; Warri Branch</title>
        <meta
          name="description"
          content="Contact RUFES Strategic Ventures in Lagos and Warri about furniture, lighting, gym equipment, home décor, Christmas products and playground equipment."
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
          <label>Preferred showroom<select name="branch" required value={branch} onChange={e=>setBranch(e.target.value)}><option value="">Select a showroom</option><option>Lagos HQ</option><option>Warri / Effurun</option></select></label>
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
            <div><h3>Lagos — Headquarters</h3><p>Shop I265, Road 5, Ikota Shopping Complex, Lagos, Nigeria</p><p><a href="https://www.google.com/maps/search/?api=1&query=Shop%20I265%2C%20Road%205%2C%20Ikota%20Shopping%20Complex%2C%20Lagos%2C%20Nigeria">Get directions</a></p><h3>Warri / Effurun Branch</h3><p>62 Airport Road, Effurun, near Ugboroke Junction, Delta State, Nigeria</p><p><a href="https://www.google.com/maps/search/?api=1&query=62%20Airport%20Road%2C%20Effurun%2C%20near%20Ugboroke%20Junction%2C%20Delta%20State%2C%20Nigeria">Get directions</a></p><p><a href="tel:+2348075415120">Call 08075415120</a> · <a href="https://wa.me/2348075415120">WhatsApp</a></p></div>
            
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
