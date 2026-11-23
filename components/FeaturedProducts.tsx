import { useEffect, useState } from 'react';
import Link from 'next/link';
import { products, photos } from '../lib/catalog';
type LiveProduct={id:string;slug:string;name:string;category:string;description:string;image_key:string|null;image_alt:string};
export default function FeaturedProducts() {
  const [live,setLive]=useState<LiveProduct[]|null>(null);
  useEffect(()=>{fetch('/api/content').then(r=>r.ok?r.json():null).then(data=>{if(data?.products?.length)setLive(data.products);}).catch(()=>{});},[]);
  return <div className="grid">{live ? live.slice(0,8).map(p=><article className="product" key={p.id}><Link href={'/contact?product='+encodeURIComponent(p.name)}><img loading="lazy" src={p.image_key?'/api/media/'+p.image_key:photos.decor} alt={p.image_alt||p.name}/></Link><div className="details"><span className="muted">{p.category}</span><h3>{p.name}</h3><p className="muted">{p.description}</p><Link href={'/contact?product='+encodeURIComponent(p.name)}>Request quotation →</Link></div></article>) : products.slice(0,8).map(p=><article className="product" key={p.slug}><Link href={'/products/'+p.slug}><img loading="lazy" src={photos[p.kind]} alt={p.name+' illustrative photograph'}/></Link><div className="details"><span className="muted">{p.category}</span><h3>{p.name}</h3><p className="muted">Request a quote for current options and availability.</p><Link href={'/products/'+p.slug}>View product →</Link></div></article>)}</div>;
}
