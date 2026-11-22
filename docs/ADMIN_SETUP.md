# RUFES admin backend setup
Status: database schema and role model committed; NOT yet connected to the live static website.

## Architecture
- Next.js static export serves the storefront.
- Supabase Auth manages staff sign-in.
- Supabase Postgres with Row Level Security enforces product and role access.
- Supabase Storage will hold images (bucket and policies must be configured).
- Storefront must be updated to fetch published products from Supabase; current lib/catalog.ts is static.
- Admin pages and secure staff-invitation flow are not yet implemented.

## Setup
1. Create a Supabase project owned by RUFES.
2. Run supabase/schema.sql in SQL editor.
3. Configure allowed origins, email authentication, MFA, and password reset.
4. Create the first owner via Supabase Auth; use SQL editor to insert their profile with role owner and active true. Never create a public owner-registration endpoint.
5. Create staff accounts via owner-controlled invitation process, with inactive default and owner activation.
6. Configure a private administrative storage policy and a public-read published-product image bucket.
7. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY as deployment variables (anon key is public; NEVER put service_role in client code).
8. Implement /admin login, product editor, inventory, staff management, image uploader, audit trail, and dynamic storefront queries before launch.
9. Test unauthenticated access, staff attempts to publish/delete/change roles, and owner workflows.

Do not treat GitHub static export as an API server. Backend operations must run on Supabase or another actual server.
