import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_cnt_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_cnt_columns_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_cnt_columns_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_social_proof_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_cnt_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_cnt_columns_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_cnt_columns_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_social_proof_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_cnt_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_cnt_columns_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_cnt_columns_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_cnt_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_cnt_columns_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_cnt_columns_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_inventories_options_relation_to" AS ENUM('colors', 'sizes');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_discounts_discount_type" AS ENUM('percentage', 'fixed', 'free_shipping');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_filter_blocks_filter_archive_type" AS ENUM('singleSelect', 'multiSelect', 'breadcrumbs');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TYPE "enum_pages_blocks_archive_type" ADD VALUE 'fade';
  ALTER TYPE "enum__pages_v_blocks_archive_type" ADD VALUE 'fade';
  ALTER TYPE "enum_products_blocks_archive_type" ADD VALUE 'fade';
  ALTER TYPE "enum__products_v_blocks_archive_type" ADD VALUE 'fade';
  CREATE TABLE IF NOT EXISTS "pages_blocks_cnt_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_cnt_columns_size" DEFAULT 'oneThird',
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_cnt_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_cnt_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cnt_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_cnt_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cnt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_social_proof_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_social_proof_columns_size" DEFAULT 'oneThird',
  	"icons" varchar,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_social_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cnt_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_cnt_columns_size" DEFAULT 'oneThird',
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_cnt_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_cnt_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cnt_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_pages_v_blocks_cnt_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cnt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_social_proof_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_social_proof_columns_size" DEFAULT 'oneThird',
  	"icons" varchar,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_social_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cnt_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_products_blocks_cnt_columns_size" DEFAULT 'oneThird',
  	"enable_link" boolean,
  	"link_type" "enum_products_blocks_cnt_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_products_blocks_cnt_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cnt_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "products_blocks_cnt_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cnt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_cnt_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__products_v_blocks_cnt_columns_size" DEFAULT 'oneThird',
  	"enable_link" boolean,
  	"link_type" "enum__products_v_blocks_cnt_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__products_v_blocks_cnt_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_cnt_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_products_v_blocks_cnt_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_cnt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "inventories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"colors_id" integer,
  	"sizes_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "colors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "colors_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "colors_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "sizes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "sizes_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "sizes_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "discounts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"discountType" "enum_discounts_discount_type" NOT NULL,
  	"value" numeric NOT NULL,
  	"code" varchar NOT NULL,
  	"usage_limit" numeric,
  	"minimum_purchase" numeric,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"is_active" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "discounts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "filter_locales" (
  	"categories_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "filter_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DROP TABLE "pages_blocks_content_columns";
  DROP TABLE "pages_blocks_content_columns_locales";
  DROP TABLE "pages_blocks_content";
  DROP TABLE "_pages_v_blocks_content_columns";
  DROP TABLE "_pages_v_blocks_content_columns_locales";
  DROP TABLE "_pages_v_blocks_content";
  DROP TABLE "products_blocks_content_columns";
  DROP TABLE "products_blocks_content_columns_locales";
  DROP TABLE "products_blocks_content";
  DROP TABLE "_products_v_blocks_content_columns";
  DROP TABLE "_products_v_blocks_content_columns_locales";
  DROP TABLE "_products_v_blocks_content";
  DROP TABLE "inventories_color";
  DROP TABLE "inventories_size";
  DROP TABLE "inventories_capacity";
  ALTER TABLE "inventories_options" DROP CONSTRAINT "inventories_options_parent_fk";
  
  DROP INDEX IF EXISTS "_products_v_autosave_idx";
  DROP INDEX IF EXISTS "inventories_options_parent_idx";
  DROP INDEX IF EXISTS "inventories_options_order_idx";
  ALTER TABLE "inventories_options" ALTER COLUMN "id" SET DATA TYPE varchar;
  ALTER TABLE "pages" ADD COLUMN "promotion_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "promotion_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "promotion_end_date" timestamp(3) with time zone;
  ALTER TABLE "_pages_v" ADD COLUMN "version_promotion_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_promotion_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_promotion_end_date" timestamp(3) with time zone;
  ALTER TABLE "products" ADD COLUMN "discounted_price" numeric;
  ALTER TABLE "products" ADD COLUMN "discount_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_discounted_price" numeric;
  ALTER TABLE "_products_v" ADD COLUMN "version_discount_id" integer;
  ALTER TABLE "inventories_options" ADD COLUMN "_order" integer NOT NULL;
  ALTER TABLE "inventories_options" ADD COLUMN "_parent_id" integer NOT NULL;
  ALTER TABLE "inventories_options" ADD COLUMN "relationTo" "enum_inventories_options_relation_to" DEFAULT 'colors' NOT NULL;
  ALTER TABLE "filter_blocks_filter_archive" ADD COLUMN "type" "enum_filter_blocks_filter_archive_type" DEFAULT 'singleSelect';
  ALTER TABLE "filter" ADD COLUMN "categories_slug" varchar;
  ALTER TABLE "filter" ADD COLUMN "categories_active" boolean;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cnt_columns" ADD CONSTRAINT "pages_blocks_cnt_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cnt"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cnt_columns_locales" ADD CONSTRAINT "pages_blocks_cnt_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cnt_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cnt" ADD CONSTRAINT "pages_blocks_cnt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_social_proof_columns" ADD CONSTRAINT "pages_blocks_social_proof_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_social_proof"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_social_proof" ADD CONSTRAINT "pages_blocks_social_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cnt_columns" ADD CONSTRAINT "_pages_v_blocks_cnt_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cnt"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cnt_columns_locales" ADD CONSTRAINT "_pages_v_blocks_cnt_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cnt_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cnt" ADD CONSTRAINT "_pages_v_blocks_cnt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_social_proof_columns" ADD CONSTRAINT "_pages_v_blocks_social_proof_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_social_proof"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_social_proof" ADD CONSTRAINT "_pages_v_blocks_social_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cnt_columns" ADD CONSTRAINT "products_blocks_cnt_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cnt"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cnt_columns_locales" ADD CONSTRAINT "products_blocks_cnt_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cnt_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cnt" ADD CONSTRAINT "products_blocks_cnt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_cnt_columns" ADD CONSTRAINT "_products_v_blocks_cnt_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_cnt"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_cnt_columns_locales" ADD CONSTRAINT "_products_v_blocks_cnt_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_cnt_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_cnt" ADD CONSTRAINT "_products_v_blocks_cnt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inventories_rels" ADD CONSTRAINT "inventories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inventories_rels" ADD CONSTRAINT "inventories_rels_colors_fk" FOREIGN KEY ("colors_id") REFERENCES "public"."colors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inventories_rels" ADD CONSTRAINT "inventories_rels_sizes_fk" FOREIGN KEY ("sizes_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "colors_locales" ADD CONSTRAINT "colors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."colors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "sizes_locales" ADD CONSTRAINT "sizes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "discounts_rels" ADD CONSTRAINT "discounts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."discounts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "discounts_rels" ADD CONSTRAINT "discounts_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "filter_locales" ADD CONSTRAINT "filter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."filter"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_cnt_columns_order_idx" ON "pages_blocks_cnt_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cnt_columns_parent_id_idx" ON "pages_blocks_cnt_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cnt_order_idx" ON "pages_blocks_cnt" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cnt_parent_id_idx" ON "pages_blocks_cnt" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cnt_path_idx" ON "pages_blocks_cnt" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_social_proof_columns_order_idx" ON "pages_blocks_social_proof_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_social_proof_columns_parent_id_idx" ON "pages_blocks_social_proof_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_social_proof_order_idx" ON "pages_blocks_social_proof" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_social_proof_parent_id_idx" ON "pages_blocks_social_proof" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_social_proof_path_idx" ON "pages_blocks_social_proof" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cnt_columns_order_idx" ON "_pages_v_blocks_cnt_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cnt_columns_parent_id_idx" ON "_pages_v_blocks_cnt_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cnt_order_idx" ON "_pages_v_blocks_cnt" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cnt_parent_id_idx" ON "_pages_v_blocks_cnt" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cnt_path_idx" ON "_pages_v_blocks_cnt" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_social_proof_columns_order_idx" ON "_pages_v_blocks_social_proof_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_social_proof_columns_parent_id_idx" ON "_pages_v_blocks_social_proof_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_social_proof_order_idx" ON "_pages_v_blocks_social_proof" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_social_proof_parent_id_idx" ON "_pages_v_blocks_social_proof" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_social_proof_path_idx" ON "_pages_v_blocks_social_proof" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_cnt_columns_order_idx" ON "products_blocks_cnt_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_cnt_columns_parent_id_idx" ON "products_blocks_cnt_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cnt_order_idx" ON "products_blocks_cnt" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_cnt_parent_id_idx" ON "products_blocks_cnt" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cnt_path_idx" ON "products_blocks_cnt" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_cnt_columns_order_idx" ON "_products_v_blocks_cnt_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_cnt_columns_parent_id_idx" ON "_products_v_blocks_cnt_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_cnt_order_idx" ON "_products_v_blocks_cnt" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_cnt_parent_id_idx" ON "_products_v_blocks_cnt" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_cnt_path_idx" ON "_products_v_blocks_cnt" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "inventories_rels_order_idx" ON "inventories_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "inventories_rels_parent_idx" ON "inventories_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "inventories_rels_path_idx" ON "inventories_rels" USING btree ("path");
  CREATE UNIQUE INDEX IF NOT EXISTS "colors_value_idx" ON "colors" USING btree ("value");
  CREATE UNIQUE INDEX IF NOT EXISTS "colors_code_idx" ON "colors" USING btree ("code");
  CREATE INDEX IF NOT EXISTS "colors_created_at_idx" ON "colors" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "colors_title_idx" ON "colors_locales" USING btree ("title");
  CREATE UNIQUE INDEX IF NOT EXISTS "sizes_value_idx" ON "sizes" USING btree ("value");
  CREATE UNIQUE INDEX IF NOT EXISTS "sizes_code_idx" ON "sizes" USING btree ("code");
  CREATE INDEX IF NOT EXISTS "sizes_created_at_idx" ON "sizes" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "sizes_title_idx" ON "sizes_locales" USING btree ("title");
  CREATE UNIQUE INDEX IF NOT EXISTS "discounts_code_idx" ON "discounts" USING btree ("code");
  CREATE INDEX IF NOT EXISTS "discounts_created_at_idx" ON "discounts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "discounts_rels_order_idx" ON "discounts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "discounts_rels_parent_idx" ON "discounts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "discounts_rels_path_idx" ON "discounts_rels" USING btree ("path");
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_discount_id_discounts_id_fk" FOREIGN KEY ("discount_id") REFERENCES "public"."discounts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_discount_id_discounts_id_fk" FOREIGN KEY ("version_discount_id") REFERENCES "public"."discounts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inventories_options" ADD CONSTRAINT "inventories_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "inventories_options_parent_id_idx" ON "inventories_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "inventories_options_order_idx" ON "inventories_options" USING btree ("_order");
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "autosave";
  ALTER TABLE "inventories_options" DROP COLUMN IF EXISTS "order";
  ALTER TABLE "inventories_options" DROP COLUMN IF EXISTS "parent_id";
  ALTER TABLE "inventories_options" DROP COLUMN IF EXISTS "value";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
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
   CREATE TYPE "public"."enum_inventories_options" AS ENUM('color', 'size', 'capacity');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_inventories_color" AS ENUM('white', 'black', 'red');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_inventories_size" AS ENUM('small', 'medium', 'large');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_inventories_capacity" AS ENUM('one-litre', 'two-litre', 'three-litre');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_content_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_pages_v_blocks_content_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_products_blocks_content_columns_size" DEFAULT 'oneThird',
  	"enable_link" boolean,
  	"link_type" "enum_products_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_products_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "products_blocks_content_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__products_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"enable_link" boolean,
  	"link_type" "enum__products_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__products_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_products_v_blocks_content_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "inventories_color" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_inventories_color",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "inventories_size" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_inventories_size",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "inventories_capacity" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_inventories_capacity",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  DROP TABLE "pages_blocks_cnt_columns";
  DROP TABLE "pages_blocks_cnt_columns_locales";
  DROP TABLE "pages_blocks_cnt";
  DROP TABLE "pages_blocks_social_proof_columns";
  DROP TABLE "pages_blocks_social_proof";
  DROP TABLE "_pages_v_blocks_cnt_columns";
  DROP TABLE "_pages_v_blocks_cnt_columns_locales";
  DROP TABLE "_pages_v_blocks_cnt";
  DROP TABLE "_pages_v_blocks_social_proof_columns";
  DROP TABLE "_pages_v_blocks_social_proof";
  DROP TABLE "products_blocks_cnt_columns";
  DROP TABLE "products_blocks_cnt_columns_locales";
  DROP TABLE "products_blocks_cnt";
  DROP TABLE "_products_v_blocks_cnt_columns";
  DROP TABLE "_products_v_blocks_cnt_columns_locales";
  DROP TABLE "_products_v_blocks_cnt";
  DROP TABLE "inventories_rels";
  DROP TABLE "colors";
  DROP TABLE "colors_locales";
  DROP TABLE "sizes";
  DROP TABLE "sizes_locales";
  DROP TABLE "discounts";
  DROP TABLE "discounts_rels";
  DROP TABLE "filter_locales";
  ALTER TABLE "products" DROP CONSTRAINT "products_discount_id_discounts_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_discount_id_discounts_id_fk";
  
  ALTER TABLE "inventories_options" DROP CONSTRAINT "inventories_options_parent_id_fk";
  
  DROP INDEX IF EXISTS "inventories_options_parent_id_idx";
  DROP INDEX IF EXISTS "inventories_options_order_idx";
  ALTER TABLE "inventories_options" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "_products_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "inventories_options" ADD COLUMN "order" integer NOT NULL;
  ALTER TABLE "inventories_options" ADD COLUMN "parent_id" integer NOT NULL;
  ALTER TABLE "inventories_options" ADD COLUMN "value" "enum_inventories_options";
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_columns_locales" ADD CONSTRAINT "pages_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_columns_locales" ADD CONSTRAINT "_pages_v_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_content_columns" ADD CONSTRAINT "products_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_content_columns_locales" ADD CONSTRAINT "products_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_content" ADD CONSTRAINT "products_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_content_columns" ADD CONSTRAINT "_products_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_content_columns_locales" ADD CONSTRAINT "_products_v_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_blocks_content" ADD CONSTRAINT "_products_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inventories_color" ADD CONSTRAINT "inventories_color_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inventories_size" ADD CONSTRAINT "inventories_size_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inventories_capacity" ADD CONSTRAINT "inventories_capacity_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_columns_order_idx" ON "products_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_columns_parent_id_idx" ON "products_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_order_idx" ON "products_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_parent_id_idx" ON "products_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_path_idx" ON "products_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_content_columns_order_idx" ON "_products_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_content_columns_parent_id_idx" ON "_products_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_content_order_idx" ON "_products_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_content_parent_id_idx" ON "_products_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_blocks_content_path_idx" ON "_products_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "inventories_color_order_idx" ON "inventories_color" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "inventories_color_parent_idx" ON "inventories_color" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "inventories_size_order_idx" ON "inventories_size" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "inventories_size_parent_idx" ON "inventories_size" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "inventories_capacity_order_idx" ON "inventories_capacity" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "inventories_capacity_parent_idx" ON "inventories_capacity" USING btree ("parent_id");
  DO $$ BEGIN
   ALTER TABLE "inventories_options" ADD CONSTRAINT "inventories_options_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "inventories_options_parent_idx" ON "inventories_options" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "inventories_options_order_idx" ON "inventories_options" USING btree ("order");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "promotion_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "promotion_description";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "promotion_end_date";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_promotion_title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_promotion_description";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_promotion_end_date";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "discounted_price";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "discount_id";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_discounted_price";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_discount_id";
  ALTER TABLE "inventories_options" DROP COLUMN IF EXISTS "_order";
  ALTER TABLE "inventories_options" DROP COLUMN IF EXISTS "_parent_id";
  ALTER TABLE "inventories_options" DROP COLUMN IF EXISTS "relationTo";
  ALTER TABLE "filter_blocks_filter_archive" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "filter" DROP COLUMN IF EXISTS "categories_slug";
  ALTER TABLE "filter" DROP COLUMN IF EXISTS "categories_active";`)
}
