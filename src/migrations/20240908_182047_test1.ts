import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."_locales" AS ENUM('en', 'mk');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
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
   CREATE TYPE "public"."enum_products_blocks_media_block_position" AS ENUM('default', 'fullscreen');
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
  
  CREATE TABLE IF NOT EXISTS "pages_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "pages_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_pages_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "posts_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "posts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "_posts_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_products_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_products_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_products_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_products_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_products_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"position" "enum_products_blocks_media_block_position" DEFAULT 'default',
  	"media_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "inventories_options" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_inventories_options",
  	"id" serial PRIMARY KEY NOT NULL
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
  
  CREATE TABLE IF NOT EXISTS "inventories_skus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sku" varchar NOT NULL,
  	"quantity" numeric DEFAULT 0,
  	"color" varchar,
  	"size" varchar,
  	"capacity" varchar,
  	"price" numeric DEFAULT 0,
  	"units_sold" numeric DEFAULT 0
  );
  
  CREATE TABLE IF NOT EXISTS "inventories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"base_sku" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_checkbox_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_country_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_email_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_message_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_number_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_select_options_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_select_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_state_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_text_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_blocks_textarea_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "forms_emails_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "forms_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_posts_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_posts_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "categories_breadcrumbs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "products" ADD COLUMN "slug" varchar;
  ALTER TABLE "products" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "products" ADD COLUMN "featured_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "inventory_id" integer;
  ALTER TABLE "products" ADD COLUMN "skip_sync" boolean;
  ALTER TABLE "products_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "products_rels" ADD COLUMN "products_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_links" ADD CONSTRAINT "products_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta" ADD CONSTRAINT "products_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_content_columns" ADD CONSTRAINT "products_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_content" ADD CONSTRAINT "products_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_media_block" ADD CONSTRAINT "products_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_media_block" ADD CONSTRAINT "products_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_slider" ADD CONSTRAINT "products_slider_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_slider" ADD CONSTRAINT "products_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inventories_options" ADD CONSTRAINT "inventories_options_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "inventories_skus" ADD CONSTRAINT "inventories_skus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_links_order_idx" ON "products_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_links_parent_id_idx" ON "products_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_order_idx" ON "products_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_parent_id_idx" ON "products_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_path_idx" ON "products_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_columns_order_idx" ON "products_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_columns_parent_id_idx" ON "products_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_order_idx" ON "products_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_parent_id_idx" ON "products_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_path_idx" ON "products_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_block_order_idx" ON "products_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_block_parent_id_idx" ON "products_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_block_path_idx" ON "products_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_slider_order_idx" ON "products_slider" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_slider_parent_id_idx" ON "products_slider" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "inventories_options_order_idx" ON "inventories_options" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "inventories_options_parent_idx" ON "inventories_options" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "inventories_color_order_idx" ON "inventories_color" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "inventories_color_parent_idx" ON "inventories_color" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "inventories_size_order_idx" ON "inventories_size" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "inventories_size_parent_idx" ON "inventories_size" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "inventories_capacity_order_idx" ON "inventories_capacity" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "inventories_capacity_parent_idx" ON "inventories_capacity" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "inventories_skus_order_idx" ON "inventories_skus" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "inventories_skus_parent_id_idx" ON "inventories_skus" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "inventories_title_idx" ON "inventories" USING btree ("title");
  CREATE UNIQUE INDEX IF NOT EXISTS "inventories_base_sku_idx" ON "inventories" USING btree ("base_sku");
  CREATE INDEX IF NOT EXISTS "inventories_created_at_idx" ON "inventories" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_inventory_id_inventories_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "public"."inventories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "categories_breadcrumbs_locale_idx" ON "categories_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "relationTo";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "posts_id";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "relationTo";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_description";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "posts_id";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_title";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_description";
  ALTER TABLE "forms_blocks_checkbox" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_country" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_email" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_message" DROP COLUMN IF EXISTS "message";
  ALTER TABLE "forms_blocks_number" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_select_options" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN IF EXISTS "default_value";
  ALTER TABLE "forms_blocks_state" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN IF EXISTS "default_value";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN IF EXISTS "default_value";
  ALTER TABLE "forms_emails" DROP COLUMN IF EXISTS "subject";
  ALTER TABLE "forms_emails" DROP COLUMN IF EXISTS "message";
  ALTER TABLE "forms" DROP COLUMN IF EXISTS "submit_button_label";
  ALTER TABLE "forms" DROP COLUMN IF EXISTS "confirmation_message";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DROP TABLE "pages_locales";
  DROP TABLE "_pages_v_locales";
  DROP TABLE "posts_locales";
  DROP TABLE "_posts_v_locales";
  DROP TABLE "products_blocks_cta_links";
  DROP TABLE "products_blocks_cta";
  DROP TABLE "products_blocks_content_columns";
  DROP TABLE "products_blocks_content";
  DROP TABLE "products_blocks_media_block";
  DROP TABLE "products_slider";
  DROP TABLE "inventories_options";
  DROP TABLE "inventories_color";
  DROP TABLE "inventories_size";
  DROP TABLE "inventories_capacity";
  DROP TABLE "inventories_skus";
  DROP TABLE "inventories";
  DROP TABLE "forms_blocks_checkbox_locales";
  DROP TABLE "forms_blocks_country_locales";
  DROP TABLE "forms_blocks_email_locales";
  DROP TABLE "forms_blocks_message_locales";
  DROP TABLE "forms_blocks_number_locales";
  DROP TABLE "forms_blocks_select_options_locales";
  DROP TABLE "forms_blocks_select_locales";
  DROP TABLE "forms_blocks_state_locales";
  DROP TABLE "forms_blocks_text_locales";
  DROP TABLE "forms_blocks_textarea_locales";
  DROP TABLE "forms_emails_locales";
  DROP TABLE "forms_locales";
  ALTER TABLE "products" DROP CONSTRAINT "products_featured_image_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_inventory_id_inventories_id_fk";
  
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_pages_fk";
  
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_products_fk";
  
  DROP INDEX IF EXISTS "categories_breadcrumbs_locale_idx";
  DROP INDEX IF EXISTS "products_slug_idx";
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "relationTo" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts';
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pages_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "relationTo" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts';
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_country" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_email" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_message" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms_blocks_number" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select_options" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_state" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN "subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL;
  ALTER TABLE "forms_emails" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms" ADD COLUMN "submit_button_label" varchar;
  ALTER TABLE "forms" ADD COLUMN "confirmation_message" jsonb;
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "categories_breadcrumbs" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "slug_lock";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "featured_image_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "inventory_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "skip_sync";
  ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "pages_id";
  ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "products_id";`)
}
