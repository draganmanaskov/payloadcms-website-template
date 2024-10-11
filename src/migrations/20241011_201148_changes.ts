import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_cta_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_content_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_archive_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_archive_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_pages_v_blocks_cta_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_pages_v_blocks_content_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_archive_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_pages_v_blocks_archive_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "media_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "products_blocks_cta_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "products_blocks_content_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_archive_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "products_blocks_archive_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "products_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "products_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_products_v_blocks_cta_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_products_v_blocks_content_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_archive_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_products_v_blocks_archive_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_products_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DROP INDEX IF EXISTS "products_slug_idx";
  DROP INDEX IF EXISTS "_products_v_version_version_slug_idx";
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_columns_locales" ADD CONSTRAINT "pages_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_archive_locales" ADD CONSTRAINT "pages_blocks_archive_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_archive"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_columns_locales" ADD CONSTRAINT "_pages_v_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_archive_locales" ADD CONSTRAINT "_pages_v_blocks_archive_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_archive"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_locales" ADD CONSTRAINT "products_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_content_columns_locales" ADD CONSTRAINT "products_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_archive_locales" ADD CONSTRAINT "products_blocks_archive_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_archive"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_cta_locales" ADD CONSTRAINT "_products_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_content_columns_locales" ADD CONSTRAINT "_products_v_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_archive_locales" ADD CONSTRAINT "_products_v_blocks_archive_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_archive"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products_locales" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_slug_idx" ON "_products_v_locales" USING btree ("version_slug");
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "intro_content";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "intro_content";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "alt";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "caption";
  ALTER TABLE "products_blocks_cta" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "products_blocks_content_columns" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "products_blocks_archive" DROP COLUMN IF EXISTS "intro_content";
  ALTER TABLE "products_slider" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_slider" DROP COLUMN IF EXISTS "caption";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "price_j_s_o_n";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "enable_paywall";
  ALTER TABLE "_products_v_blocks_cta" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "_products_v_blocks_content_columns" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "_products_v_blocks_archive" DROP COLUMN IF EXISTS "intro_content";
  ALTER TABLE "_products_v_version_slider" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_products_v_version_slider" DROP COLUMN IF EXISTS "caption";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_slug";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_price_j_s_o_n";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_enable_paywall";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_cta_locales";
  DROP TABLE "pages_blocks_content_columns_locales";
  DROP TABLE "pages_blocks_archive_locales";
  DROP TABLE "_pages_v_blocks_cta_locales";
  DROP TABLE "_pages_v_blocks_content_columns_locales";
  DROP TABLE "_pages_v_blocks_archive_locales";
  DROP TABLE "media_locales";
  DROP TABLE "media_rels";
  DROP TABLE "products_blocks_cta_locales";
  DROP TABLE "products_blocks_content_columns_locales";
  DROP TABLE "products_blocks_archive_locales";
  DROP TABLE "products_locales";
  DROP TABLE "_products_v_blocks_cta_locales";
  DROP TABLE "_products_v_blocks_content_columns_locales";
  DROP TABLE "_products_v_blocks_archive_locales";
  DROP TABLE "_products_v_locales";
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "media" ADD COLUMN "caption" jsonb;
  ALTER TABLE "products_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "products_blocks_content_columns" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "products_blocks_archive" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "products_slider" ADD COLUMN "title" varchar;
  ALTER TABLE "products_slider" ADD COLUMN "caption" varchar;
  ALTER TABLE "products" ADD COLUMN "title" varchar;
  ALTER TABLE "products" ADD COLUMN "slug" varchar;
  ALTER TABLE "products" ADD COLUMN "price_j_s_o_n" varchar;
  ALTER TABLE "products" ADD COLUMN "enable_paywall" boolean;
  ALTER TABLE "_products_v_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_products_v_blocks_content_columns" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_products_v_blocks_archive" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "_products_v_version_slider" ADD COLUMN "title" varchar;
  ALTER TABLE "_products_v_version_slider" ADD COLUMN "caption" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_price_j_s_o_n" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_enable_paywall" boolean;
  CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");`)
}
