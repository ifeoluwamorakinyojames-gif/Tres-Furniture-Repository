# RUFES admin setup — Cloudflare architecture

## Current status
- `/admin/` is a **publicly accessible UI preview**, not a secure admin system.
- It deliberately does not display real customer data, accept credentials, upload files or edit products.
- The existing storefront is a static Next.js export. A static page alone cannot securely authenticate administrators or write to a database.
- Do not add client-side-only password checks or place API tokens in `NEXT_PUBLIC_*` variables.

## Planned backend
1. **Cloudflare Access**: protect `/admin/*` and admin API routes using an authenticated identity policy. For a Pages static site, configure Access on the actual hostname and route patterns; confirm coverage of both `/admin` and `/admin/`.
2. **Cloudflare Workers**: server-side API for products, collections, homepage slides, enquiries, media, staff roles and audit history. Validate Access JWTs server-side, enforce authorization per endpoint, check inputs and apply rate limits.
3. **Cloudflare D1**: products, product variants/specifications, collections, homepage banners, enquiries, users/roles, and audit logs. Use parameterized queries and migrations.
4. **Cloudflare R2**: uploaded product photos and slideshow images. Restrict write operations to authorized Workers; validate content type, size and file signatures. Use optimized image variants, descriptive alt text and appropriate cache headers.
5. **Storefront publishing**: decide between a public read API (client-side published-product fetching) or a deploy-triggered static build for indexable product pages. For SEO, preserve server-generated HTML and sitemaps for published products.

## Proposed admin sections
- Overview
- Products: create, edit, archive, publish, photos, alt text and specifications
- Collections
- Homepage banners: ordering, captions and image upload
- Quotations: contact details, product reference and follow-up status
- Media library
- Pages, services and articles
- Settings and staff

## Before production use
- Confirm Cloudflare account ownership, domain and Access policies.
- Deploy D1 migrations and Worker routes.
- Implement owner/staff permissions on the Worker, not only the UI.
- Connect the admin frontend to the authenticated Worker API.
- Verify denied unauthenticated requests and forbidden staff operations.
- Verify image upload security, quotation privacy, backup/restore and logs.
- Test the complete Cloudflare deployment and mobile admin interface.

The older Supabase schema is historical scaffolding only. **Do not use Supabase for this project.**
