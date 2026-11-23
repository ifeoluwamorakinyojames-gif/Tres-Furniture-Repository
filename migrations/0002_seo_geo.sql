-- Apply after 0001_admin.sql. Keep existing published records intact.
ALTER TABLE products ADD COLUMN seo_title TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN meta_description TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN primary_keyword TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN specifications TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN brand TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN image_caption TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN indexable INTEGER NOT NULL DEFAULT 1;
CREATE INDEX IF NOT EXISTS idx_products_seo ON products(published,indexable,updated_at);
CREATE TABLE IF NOT EXISTS business_locations (
 id TEXT PRIMARY KEY,
 kind TEXT NOT NULL UNIQUE CHECK(kind IN ('head_office','showroom')),
 name TEXT NOT NULL,
 street_address TEXT NOT NULL DEFAULT '',
 city TEXT NOT NULL,
 region TEXT NOT NULL DEFAULT '',
 country TEXT NOT NULL DEFAULT 'NG',
 postal_code TEXT NOT NULL DEFAULT '',
 phone TEXT NOT NULL DEFAULT '',
 public_visible INTEGER NOT NULL DEFAULT 1,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT OR IGNORE INTO business_locations(id,kind,name,city,region,country,public_visible)
VALUES('lagos-head-office','head_office','RUFES Head Office','Lagos','Lagos State','NG',1);
INSERT OR IGNORE INTO business_locations(id,kind,name,street_address,city,region,country,public_visible)
VALUES('warri-showroom','showroom','RUFES Warri Showroom','First Floor, The J''s Innovations Building, Airport Road','Warri','Delta State','NG',1);
