// Generate an XML sitemap from the same catalogue used by the website.
// Run after the Next.js static export. Set NEXT_PUBLIC_SITE_URL to the canonical domain.
const fs = require('node:fs');
const path = require('node:path');
const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rufes-strategic-ventures-by5dpa.v2.appdeploy.ai').replace(/\\/$/, '');
const pages = ['/', '/about/', '/contact/', '/showroom/', '/collections/', '/services/', '/blog/', '/gallery/', '/faqs/', '/privacy/', '/terms/'];
const collect = (source, pattern, prefix) => {
  const text = fs.readFileSync(path.join(process.cwd(), source), 'utf8');
  for (const match of text.matchAll(pattern)) pages.push(prefix + match[1] + '/');
};
collect('lib/catalog.ts', /slug:\\s*'([^']+)'/g, '/collections/');
// The catalogue contains both products and categories; split the sections to avoid incorrect routes.
const catalog = fs.readFileSync('lib/catalog.ts', 'utf8');
const products = catalog.split('export const categories')[0];
const categories = catalog.split('export const categories')[1]?.split('export const photos')[0] || '';
const slugs = text => [...text.matchAll(/slug:\\s*'([^']+)'/g)].map(x => x[1]);
const all = [...new Set([...pages.filter(x => !x.startsWith('/collections/') || slugs(categories).some(s => x === '/collections/' + s + '/')), ...slugs(products).map(s => '/products/' + s + '/')])];
const content = fs.readFileSync('lib/content.ts', 'utf8');
for (const s of [...content.matchAll(/slug:\\s*'([^']+)'/g)].map(x => x[1])) {
  const route = s.startsWith('how-') || s.startsWith('choosing-') || s.startsWith('planning-') ? '/blog/' : '/services/';
  all.push(route + s + '/');
}
const xml = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n' + [...new Set(all)].map(p => '  <url><loc>' + base + p + '</loc></url>').join('\\n') + '\\n</urlset>\\n';
fs.writeFileSync('public/sitemap.xml', xml);
fs.writeFileSync('public/robots.txt', 'User-agent: *\\nAllow: /\\nSitemap: ' + base + '/sitemap.xml\\n');
console.log('Generated sitemap for', base, 'with', new Set(all).size, 'URLs');
