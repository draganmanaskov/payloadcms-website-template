import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_hero_links_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_cta_links_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_pages_v_version_hero_links_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_pages_v_blocks_cta_links_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "products_blocks_cta_links_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_products_v_blocks_cta_links_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "header_nav_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "footer_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "footer_nav_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DROP INDEX IF EXISTS "products_slug_idx";
  DROP INDEX IF EXISTS "_products_v_version_version_slug_idx";
  ALTER TABLE "pages_blocks_content_columns_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "name" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_name" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "products_blocks_content_columns_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products" ADD COLUMN "name" varchar;
  ALTER TABLE "products" ADD COLUMN "slug" varchar;
  ALTER TABLE "_products_v_blocks_content_columns_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_name" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_slug" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links_locales" ADD CONSTRAINT "pages_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_links_locales" ADD CONSTRAINT "pages_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links_locales" ADD CONSTRAINT "_pages_v_version_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_links_locales" ADD CONSTRAINT "_pages_v_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_links_locales" ADD CONSTRAINT "products_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_cta_links_locales" ADD CONSTRAINT "_products_v_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_nav_items_locales" ADD CONSTRAINT "footer_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "products_blocks_cta_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "products_blocks_content_columns" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "products_locales" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "_products_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_products_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_products_v_locales" DROP COLUMN IF EXISTS "version_slug";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "footer_nav_items" DROP COLUMN IF EXISTS "link_label";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_hero_links_locales";
  DROP TABLE "pages_blocks_cta_links_locales";
  DROP TABLE "_pages_v_version_hero_links_locales";
  DROP TABLE "_pages_v_blocks_cta_links_locales";
  DROP TABLE "products_blocks_cta_links_locales";
  DROP TABLE "_products_v_blocks_cta_links_locales";
  DROP TABLE "header_nav_items_locales";
  DROP TABLE "footer_nav_items_locales";
  DROP INDEX IF EXISTS "products_slug_idx";
  DROP INDEX IF EXISTS "_products_v_version_version_slug_idx";
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "products_blocks_cta_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_content_columns" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "slug" varchar;
  ALTER TABLE "_products_v_blocks_cta_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_content_columns" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_locales" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_label" varchar NOT NULL;
  CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products_locales" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_slug_idx" ON "_products_v_locales" USING btree ("version_slug");
  ALTER TABLE "pages_blocks_content_columns_locales" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_content_columns_locales" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_name";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "products_blocks_content_columns_locales" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "_products_v_blocks_content_columns_locales" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_name";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_slug";`)
}
