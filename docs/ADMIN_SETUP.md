# RUFES Cloudflare admin setup

## Implemented in GitHub
- `/admin/` product editor, homepage banner editor and media uploader.
- Cloudflare Pages Functions at `/api/admin/*` (protected by validated Cloudflare Access JWT).
- `/api/content` serves published D1 products and slides.
- `/api/media/<key>` serves R2 images.
- Homepage hero and featured product section fetch published data, falling back to original static content until database items exist.
- No prices or checkout.

## Required Cloudflare setup (not yet performed)
1. Deploy this repository to Cloudflare **Pages**, keeping `npm run build` and output `out`. Pages Functions in the repository's `functions/` folder must be included in the Pages deployment. Ensure build install includes dependencies.
2. Create a D1 database and apply `migrations/0001_admin.sql` using the Cloudflare dashboard SQL console or Wrangler.
3. Create an R2 bucket.
4. In Pages project > Settings > Functions > Bindings, bind D1 as `DB` and R2 as `MEDIA`, for production and preview environments as needed. Redeploy after adding bindings.
5. Set Pages environment variables `ACCESS_TEAM_DOMAIN` (e.g. `https://your-team.cloudflareaccess.com`) and `ACCESS_AUD` (Cloudflare Access application audience tag).
6. Create a Cloudflare Access self-hosted application protecting **/admin**, **/admin/**, **/admin/*** and **/api/admin/***. Restrict access to verified owner/staff identities. Test all path variants; do not assume a wildcard covers the bare path. The API independently validates the signed Access JWT, and rejects requests when not configured.
7. Check that unauthenticated requests to `/api/admin/products` return 401/403, then sign in through Access and verify add/edit/publish/upload. Never share Access credentials or service tokens in frontend code.
8. For a custom domain, configure `NEXT_PUBLIC_SITE_URL` to its canonical https URL and rebuild.

## Current limitations and production hardening
- New D1 products appear in the homepage featured grid, but **individual SEO-indexable product pages and collection pages are still generated from `lib/catalog.ts`**. A deploy-time content sync or server-rendered architecture is required to make new products fully indexable.
- The original category images, editorial sections, journal and service imagery remain static; they are not yet editable from admin.
- Uploaded images are stored without resizing; optimize on the client or add Cloudflare Images/Workers image processing before large-scale use.
- Admin supports products, banners and images only. Quotations, staff roles, audit history, article editing and media deletion are not implemented.
- The static admin HTML is not a security boundary; protect routes in Cloudflare Access. D1 and R2 data operations require validated Access JWT.
- Test Pages Functions compatibility, migrations, deployment, access policies and all CRUD flows before treating this as live. No Cloudflare resources were created or deployed by the GitHub commits.


## Additional features committed
- Site image slots: collection photos, homepage editorial images and promotional lighting image; upload in admin > Images, assign in admin > Website images.
- Public quotation form at /contact, private admin > Quotations inbox with status updates.
- D1 migration now includes `site_images` and `enquiries` tables. Apply the full migration before enabling these features.
- Public APIs: `GET /api/site-images`, `POST /api/enquiries`.
- Authenticated APIs: `GET/PUT /api/admin/site-images`, `GET/PUT /api/admin/enquiries`.
- Public enquiries endpoint needs Cloudflare WAF/rate limiting and Turnstile before production exposure to prevent spam; the form does not currently send email notifications.
- Site image changes appear via client-side fetching; SEO crawlers and social cards may still see static placeholders.
- Some original product detail, blog, services, and gallery imagery remains static and not yet fully editable.
- This repository change does **not** configure the user's Cloudflare account or confirm deployment. Check build logs and run end-to-end tests.


## SEO + GEO implementation (migration 0002)
Apply `migrations/0002_seo_geo.sql` **after** `0001_admin.sql`. The original D1 schema does not contain SEO fields until this migration runs.

- Admin product editor now includes SEO title, meta description, primary keyword, verified specifications, brand, image caption and indexability control. Publishing a new product requires a description, SEO title, meta description, uploaded image and image alt text.
- `functions/products/[slug].ts` serves a **server-rendered HTML page** for published D1 products, with canonical URL, robots directive, Open Graph metadata, Product and BreadcrumbList JSON-LD, descriptive image and quotation link. It falls back to the original static page when the D1 record does not exist.
- `functions/sitemap.xml.ts` merges the static sitemap with published, indexable D1 product URLs and modification dates. It needs to be verified on the deployed Cloudflare Pages site, including static asset fallback and caching.
- Homepage published products link to their individual product pages, not just the contact page.
- `business_locations` includes Lagos head office (city only; no street address asserted) and Warri showroom (previously supplied showroom address). The admin has an Office locations section and `/api/locations` exposes public business location records.
- Global Organization JSON-LD identifies Lagos head office and Warri showroom. **Lagos street address and phone are not known and must be verified before adding them.**
- `SITE_URL` is the optional server-side canonical origin for Cloudflare Pages Functions. Set it to the actual HTTPS production domain. Also set `NEXT_PUBLIC_SITE_URL` for the static Next.js build. Both must agree.
- GEO here means **Generative Engine Optimization**, not a guarantee of AI citations. Structured data, factual pages and consistent entity information improve machine readability but do not guarantee search rankings, indexing or inclusion in AI-generated answers.

### Verification required before claiming production-ready
1. Install and build dependencies; deploy Cloudflare Pages with Pages Functions enabled.
2. Bind D1 and R2 and configure Access authentication. Apply migrations 0001 then 0002.
3. Add a product in admin, upload a real photo, supply accurate title, description, brand, alt text and specifications, then publish.
4. Fetch `/products/<slug>/` **without JavaScript**; verify status 200, canonical, JSON-LD, title, description and image.
5. Fetch `/sitemap.xml` and verify the product URL and correct domain. Check robots.txt.
6. Unpublish or set noindex and verify the page's robots directive and sitemap behavior. Check Cloudflare cache invalidation.
7. Test Google Search Console URL Inspection and Rich Results Test. Request indexing only after the page is public and verified.
8. Configure anti-spam/rate limiting for public quotation submissions.
9. Verify Cloudflare Access protects both admin UI and APIs. Do not treat the static UI as a security boundary.
10. Confirm the Lagos head office's exact public address and phone before displaying them.

### Known limitations
- Collection, blog, service and gallery uploads do not all have fully dynamic server-rendered SEO pages yet.
- Uploaded photos use opaque storage keys. Descriptive alt text and captions are available; SEO-friendly filenames and automatic image resizing are not yet implemented.
- Existing static product pages may conflict with D1 slugs; avoid reusing slugs until tested.
- Live build, deployment, D1 migration, Cloudflare settings, Search Console and indexing have **not** been verified.
