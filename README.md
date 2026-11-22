# RUFES Strategic Ventures — Website

Next.js + TypeScript website for RUFES Strategic Ventures, Warri, Delta State, Nigeria. Furniture, chandeliers, home décor, gym equipment, playground equipment and lifestyle products.

## Development

```bash
npm install
npm run dev
npm run build
```

## Project structure

- `pages/products/[slug].tsx` — individually addressable product details and structured data
- `pages/collections/[slug].tsx` — category landing pages
- `pages/services/[slug].tsx` — installation and other services
- `pages/blog/[slug].tsx` — buying guides and informational content
- `lib/catalog.ts` — catalogue data and product imagery references
- `lib/content.ts` — service and article content
- `components/Site.tsx` — shared navigation, header and footer
- `public/sitemap.xml` and `public/robots.txt` — search engine discovery

## SEO, GEO and AEO

Product, collection, service and blog pages use descriptive headings, metadata, internal links and structured data. Location content targets Warri and Delta State where relevant. Keep details accurate; do not publish invented prices, stock, reviews or specifications. Verify live URLs, canonical URLs, sitemap and Search Console ownership after changing the deployment domain. Google indexing and ranking are not guaranteed.

## Deployment notes

This source was imported from the existing RUFES AppDeploy website. **The original logo binary file is not yet present in this GitHub repository.** Upload the authentic image to `public/resources/rufes-logo.jpg` before deployment; the site references that path. The current sample catalogue images are illustrative and should be replaced with verified product photography.

Existing preview: https://rufes-strategic-ventures-by5dpa.v2.appdeploy.ai/
