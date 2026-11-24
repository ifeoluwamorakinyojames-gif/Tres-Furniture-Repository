import { useEffect, useState } from 'react';
import Link from 'next/link';
import { photos } from '../lib/catalog';

const defaultSlides = [
  { label: 'RUFES HOME & LIFESTYLE · LAGOS & WARRI', title: 'Step inside our Lagos', accent: 'and Warri showrooms.', description: 'Explore furniture, lighting and décor, then find out where to see each piece in person.', image: photos.furniture, href: '/collections/furniture', action: 'Explore furniture' },
  { label: 'THE LIGHTING EDIT', title: 'Light up every room.', accent: 'Make it remarkable.', description: 'Browse chandeliers and decorative lighting ideas, and request details from our showroom.', image: photos.lighting, href: '/collections/lighting', action: 'Explore lighting' },
  { label: 'FITNESS & RECREATION', title: 'Spaces made for life.', accent: 'Play, move, enjoy.', description: 'Explore gym equipment, playground solutions and recreation essentials for your space.', image: photos.gym, href: '/collections/gym', action: 'Explore fitness' },
  { label: 'DETAILS THAT MATTER', title: 'The finishing touch.', accent: 'Uniquely yours.', description: 'Find decorative pieces, flowers and lifestyle accessories across our curated catalogue.', image: photos.decor, href: '/collections/decor', action: 'Explore décor' },
];

export default function HomeHeroSlider() {
  const [active, setActive] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
  useEffect(() => {
    fetch('/api/content').then(r => r.ok ? r.json() : null).then(data => {
      if (data?.banners?.length) setSlides([defaultSlides[0], ...data.banners.map((b: {label:string;title:string;accent:string;description:string;image_key:string;href:string;action_label:string}) => ({label:b.label,title:b.title,accent:b.accent,description:b.description,image:b.image_key ? '/api/media/'+b.image_key : photos.decor,href:b.href,action:b.action_label}))]);
    }).catch(() => {});
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
      {slides.map((slide, index) => index !== active ? null : (
        <div key={index} className={'rufesSlide' + (index === active ? ' isActive' : '')} aria-hidden={index !== active} style={{ backgroundImage: 'linear-gradient(90deg,rgba(23,16,14,.88) 0%,rgba(23,16,14,.57) 49%,rgba(23,16,14,.13) 100%),url("' + slide.image + '")' }}>
          <div className="rufesSlideInner">
            <span className="showcaseKicker">{slide.label}</span>
            {index === 0 ? <h1>{slide.title}<br/><em>{slide.accent}</em></h1> : <h2>{slide.title}<br/><em>{slide.accent}</em></h2>}
            <p>{slide.description}</p>
            <div className="heroActions">
              <Link className="btn" href={slide.href} tabIndex={index === active ? 0 : -1}>{slide.action} →</Link>
              <Link className="outlineBtn" href="/showroom" tabIndex={index === active ? 0 : -1}>Find a showroom</Link>
            </div>
          </div>
        </div>
      ))}
      <div className="rufesSliderControls">
        <button type="button" aria-label="Previous slide" onClick={() => navigate(-1)}>‹</button>
        <div className="rufesSliderDots" aria-label="Select slide">
          {slides.map((slide, index) => <button key={slide.href} type="button" aria-label={'Show slide ' + (index + 1) + ': ' + slide.title} aria-current={index === active ? 'true' : undefined} className={index === active ? 'active' : ''} onClick={() => setActive(index)} />)}
        </div>
        <button type="button" aria-label="Next slide" onClick={() => navigate(1)}>›</button>
      </div>
      <button type="button" className="rufesSliderPause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}>{paused ? 'Play' : 'Pause'}</button>
    </section>
  );
}
