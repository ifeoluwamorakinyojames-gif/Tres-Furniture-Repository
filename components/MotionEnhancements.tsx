import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MotionEnhancements() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let observer: IntersectionObserver | null = null;
    const setup = () => {
      observer?.disconnect();
      const elements = document.querySelectorAll<HTMLElement>('.homeMain > .wrap, .homeMain > .widePromo, .homeMain .product, .homeMain .serviceTile, .homeMain .journalCard, .homeMain .editorialCard');
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('rufesVisible');
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      elements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
        el.classList.add('rufesReveal');
        observer?.observe(el);
      });
    };
    setup();
    router.events.on('routeChangeComplete', setup);
    return () => { observer?.disconnect(); router.events.off('routeChangeComplete', setup); };
  }, [router.events]);
  return null;
}
