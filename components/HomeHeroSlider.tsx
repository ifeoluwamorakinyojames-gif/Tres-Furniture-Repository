import { useEffect, useState } from 'react';
import Link from 'next/link';
import { photos, categories } from '../lib/catalog';

const defaultSlides = [
  { label: 'RUFES HOME & LIFESTYLE · WARRI', title: 'Beautiful spaces.', accent: 'Inspired living.', description: 'Discover thoughtfully selected furniture and home accents for spaces that feel like yours.', image: photos.furniture, href: '/collections/furniture', action: 'Explore furniture' },
  { label: 'THE LIGHTING EDIT', title: 'Light up every room.', accent: 'Make it remarkable.', description: 'Browse chandeliers and decorative lighting ideas, and request details from our showroom.', image: photos.lighting, href: '/collections/lighting', action: 'Explore lighting' },
  { label: 'FITNESS & RECREATION', title: 'Spaces made for life.', accent: 'Play, move, enjoy.', description: 'Explore gym equipment, playground solutions and recreation essentials for your space.', image: photos.gym, href: '/collections/gym', action: 'Explore fitness' },
  { label: 'DETAILS THAT MATTER', title: 'The finishing touch.', accent: 'Uniquely yours.', description: 'Find decorative pieces, flowers and lifestyle accessories across our curated catalogue.', image: photos.decor, href: '/collections/decor', action: 'Explore décor' },
];

export default function HomeHeroSlider() {
  const [active, setActive] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
  useEffect(() => {
    let cancelled=false;
    Promise.all(['/api/content','/api/site-images'].map(url=>fetch(url).then(r=>r.ok?r.json():null).catch(()=>null))).then(([data,site])=>{
      if(cancelled)return;
      const banners=(data?.banners||[]).filter((b:any)=>b.image_key).map((b:any)=>({label:b.label,title:b.title,accent:b.accent,description:b.description,image:'/api/media/'+b.image_key,href:b.href,action:b.action_label}));
      const products=(data?.products||[]).filter((p:any)=>p.image_key).map((p:any)=>({label:p.category,title:p.name,accent:'',description:p.description,image:'/api/media/'+p.image_key,href:'/products/'+p.slug+'/',action:'View product'}));
      const assigned=(site?.images||[]).filter((p:any)=>p.image_key).map((p:any)=>({label:'RUFES HOME & LIFESTYLE',title:p.alt||'Explore our showroom',accent:'',description:'Discover our collections in Lagos and Warri.',image:'/api/media/'+p.image_key,href:p.slot.startsWith('category:')?'/collections/'+p.slot.split(':')[1]+'/':'/collections/',action:'Explore collection'}));
      const collections=categories.map(p=>({label:'RUFES HOME & LIFESTYLE',title:p.name,accent:'',description:p.description,image:photos[p.slug],href:'/collections/'+p.slug+'/',action:'Explore collection'}));
      const seen=new Set<string>();
      setSlides([...defaultSlides.slice(0,1),...products,...banners,...assigned,...defaultSlides.slice(1),...collections].filter(s=>s.image&&!seen.has(s.image)&&!!seen.add(s.image)));
      setActive(0);
    });
    return ()=>{cancelled=true;};
  }, []);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const navigate = (direction: number) => {
    setActive(current => (current + direction + slides.length) % slides.length);
  };

  return (
    <section className="rufesSlider" aria-label="Featured RUFES collections" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}>
      {slides.map((slide, index) => (
        <div key={slide.image} className={'rufesSlide' + (index === active ? ' isActive' : '')} aria-hidden={index !== active} style={{ backgroundImage: 'none', backgroundColor: '#302321' }}>
          {index === active && <img className="rufesFitImage" src={slide.image} alt={slide.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',objectPosition:'center',pointerEvents:'none'}} />}
          <div className="rufesSlideInner" style={{position:'relative',zIndex:1,textShadow:'0 2px 8px #231614',background:'linear-gradient(90deg,rgba(35,22,20,.78),rgba(35,22,20,.38) 75%,transparent)',borderRadius:8}}> 
            <span className="showcaseKicker">{slide.label}</span>
            {index === 0 ? <h1>{slide.title}<br/><em>{slide.accent}</em></h1> : <h2>{slide.title}<br/><em>{slide.accent}</em></h2>}
            <p>{slide.description}</p>
            <div className="heroActions">
              <Link className="btn" href={slide.href} tabIndex={index === active ? 0 : -1}>{slide.action} →</Link>
              <Link className="outlineBtn" href="/contact" tabIndex={index === active ? 0 : -1}>Request a quotation</Link>
            </div>
          </div>
        </div>
      ))}
      <div className="rufesSliderControls">
        <button type="button" aria-label="Previous slide" onClick={() => navigate(-1)}>‹</button>
        <div className="rufesSliderDots" aria-label="Select slide">
          {slides.map((slide, index) => Math.abs(index-active)<=2 ? <button key={slide.image} type="button" aria-label={'Show slide ' + (index + 1) + ': ' + slide.title} aria-current={index === active ? 'true' : undefined} className={index === active ? 'active' : ''} onClick={() => setActive(index)} /> : null)}
        </div>
        <button type="button" aria-label="Next slide" onClick={() => navigate(1)}>›</button>
      </div>
      <button type="button" className="rufesSliderPause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}>{paused ? 'Play' : 'Pause'}</button>
    </section>
  );
}
