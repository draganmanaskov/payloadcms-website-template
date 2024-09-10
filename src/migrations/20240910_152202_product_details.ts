import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_media_block_position" AS ENUM('default', 'fullscreen');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_archive_relation_to" AS ENUM('posts', 'products');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_version_currency_code" AS ENUM('MKD');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__products_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__products_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__products_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__products_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__products_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"position" "enum__products_v_blocks_media_block_position" DEFAULT 'default',
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populateBy" "enum__products_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relationTo" "enum__products_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_version_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_published_on" timestamp(3) with time zone,
  	"version_featured_image_id" integer,
  	"version_inventory_id" integer,
  	"version_price_j_s_o_n" varchar,
  	"version_enable_paywall" boolean,
  	"version_price" numeric,
  	"version_currencyCode" "enum__products_v_version_currency_code" DEFAULT 'MKD',
  	"version_skip_sync" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"categories_id" integer,
  	"posts_id" integer,
  	"products_id" integer
  );
  
  ALTER TABLE "products_blocks_cta_links" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "products_blocks_media_block" ALTER COLUMN "media_id" DROP NOT NULL;
  ALTER TABLE "products_slider" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "products" ADD COLUMN "_status" "enum_products_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_cta_links" ADD CONSTRAINT "_products_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_cta" ADD CONSTRAINT "_products_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_content_columns" ADD CONSTRAINT "_products_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_content" ADD CONSTRAINT "_products_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_media_block" ADD CONSTRAINT "_products_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_media_block" ADD CONSTRAINT "_products_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_archive" ADD CONSTRAINT "_products_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_version_slider" ADD CONSTRAINT "_products_v_version_slider_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_version_slider" ADD CONSTRAINT "_products_v_version_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_inventory_id_inventories_id_fk" FOREIGN KEY ("version_inventory_id") REFERENCES "public"."inventories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_cta_links_order_idx" ON "_products_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_cta_links_parent_id_idx" ON "_products_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_cta_order_idx" ON "_products_v_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_cta_parent_id_idx" ON "_products_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_cta_path_idx" ON "_products_v_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_content_columns_order_idx" ON "_products_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_content_columns_parent_id_idx" ON "_products_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_content_order_idx" ON "_products_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_content_parent_id_idx" ON "_products_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_content_path_idx" ON "_products_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_media_block_order_idx" ON "_products_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_media_block_parent_id_idx" ON "_products_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_media_block_path_idx" ON "_products_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_archive_order_idx" ON "_products_v_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_archive_parent_id_idx" ON "_products_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_archive_path_idx" ON "_products_v_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_products_v_version_slider_order_idx" ON "_products_v_version_slider" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_version_slider_parent_id_idx" ON "_products_v_version_slider" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "products__status_idx" ON "products" USING btree ("_status");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "_products_v_blocks_cta_links";
  DROP TABLE "_products_v_blocks_cta";
  DROP TABLE "_products_v_blocks_content_columns";
  DROP TABLE "_products_v_blocks_content";
  DROP TABLE "_products_v_blocks_media_block";
  DROP TABLE "_products_v_blocks_archive";
  DROP TABLE "_products_v_version_slider";
  DROP TABLE "_products_v";
  DROP TABLE "_products_v_rels";
  DROP INDEX IF EXISTS "products__status_idx";
  ALTER TABLE "products_blocks_cta_links" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "products_blocks_media_block" ALTER COLUMN "media_id" SET NOT NULL;
  ALTER TABLE "products_slider" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "products" DROP COLUMN IF EXISTS "_status";`)
}
