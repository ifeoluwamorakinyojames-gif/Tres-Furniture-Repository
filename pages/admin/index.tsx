import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const sections = [
  { key: 'overview', label: 'Overview', icon: '◫' },
  { key: 'products', label: 'Products', icon: '▦' },
  { key: 'collections', label: 'Collections', icon: '◈' },
  { key: 'banners', label: 'Homepage banners', icon: '▣' },
  { key: 'enquiries', label: 'Quotations', icon: '✉' },
  { key: 'media', label: 'Media library', icon: '▧' },
  { key: 'content', label: 'Pages & articles', icon: '▤' },
  { key: 'settings', label: 'Settings & staff', icon: '⚙' },
] as const;
type Section = typeof sections[number]['key'];

export default function Admin() {
  const [active, setActive] = useState<Section>('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const section = sections.find(item => item.key === active)!;
  return <>
    <Head>
      <title>RUFES Admin Workspace | Setup Preview</title>
      <meta name="robots" content="noindex,nofollow,noarchive" />
      <meta name="description" content="RUFES administrative workspace setup preview." />
    </Head>
    <div className="adminShell">
      <aside className={'adminSidebar' + (menuOpen ? ' adminSidebarOpen' : '')}>
        <div className="adminIdentity"><span className="adminMark">R</span><div><strong>RUFES</strong><small>Management workspace</small></div></div>
        <div className="adminSidebarCaption">WORKSPACE</div>
        <nav aria-label="Admin sections">
          {sections.map(item => <button key={item.key} type="button" className={'adminNavItem' + (active === item.key ? ' selected' : '')} onClick={() => {setActive(item.key);setMenuOpen(false);}} aria-current={active === item.key ? 'page' : undefined}><span aria-hidden="true">{item.icon}</span>{item.label}</button>)}
        </nav>
        <div className="adminSidebarBottom"><Link href="/">← View website</Link><small>Cloudflare backend integration pending</small></div>
      </aside>
      <div className="adminWorkspace">
        <header className="adminTopbar"><button className="adminMenuToggle" type="button" onClick={() => setMenuOpen(value => !value)} aria-expanded={menuOpen} aria-label="Toggle admin navigation">☰</button><span>RUFES / {section.label}</span><Link href="/">View storefront ↗</Link></header>
        <main className="adminContent">
          <div className="adminHeading"><div><span className="adminEyebrow">RUFES STRATEGIC VENTURES</span><h1>{section.label}</h1><p>Manage the RUFES showroom and enquiry-first product catalogue.</p></div><span className="adminSetupTag">Setup preview</span></div>
          <div className="adminNotice"><strong>Backend connection required.</strong> This page is a design and navigation preview, not a working administration system. Product editing, uploads, login and quotation records will become available only after authenticated Cloudflare Workers, D1 and R2 are connected. Do not enter sensitive information here.</div>
          {active === 'overview' ? <>
            <div className="adminStatGrid">
              {[['Products','—','Awaiting D1 connection'],['Collections','—','Awaiting D1 connection'],['Quotation requests','—','Awaiting Workers API'],['Uploaded images','—','Awaiting R2 connection']].map(([label,value,desc]) => <div className="adminStat" key={label}><span>{label}</span><strong>{value}</strong><small>{desc}</small></div>)}
            </div>
            <div className="adminPanel"><h2>Welcome to your showroom workspace</h2><p>From this dashboard you will be able to add and update products, manage homepage slides, upload optimized images, review quotation requests and publish website content without changing GitHub files.</p><div className="adminQuickActions"><button onClick={() => setActive('products')}>Products →</button><button onClick={() => setActive('banners')}>Homepage banners →</button><button onClick={() => setActive('enquiries')}>Quotations →</button></div></div>
          </> : <div className="adminPanel adminEmptyPanel"><span className="adminEmptyIcon" aria-hidden="true">{section.icon}</span><h2>{section.label} management</h2><p>{active === 'products' ? 'Create product pages with names, categories, descriptions, specifications, image alt text, publication status and quotation-only calls to action.' : active === 'banners' ? 'Upload and reorder homepage slideshow images, headings, links and accessibility descriptions.' : active === 'media' ? 'Upload, optimize and organize product images in Cloudflare R2.' : active === 'enquiries' ? 'Review customer quotation requests and track responses securely.' : active === 'settings' ? 'Configure the showroom profile and owner-approved staff access.' : active === 'collections' ? 'Organize product categories and their landing pages.' : 'Create and update services, articles and website sections.'}</p><span className="adminComingSoon">Available after secure backend setup</span></div>}
        </main>
      </div>
    </div>
  </>;
}
