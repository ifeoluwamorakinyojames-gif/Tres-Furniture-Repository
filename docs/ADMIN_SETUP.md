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
