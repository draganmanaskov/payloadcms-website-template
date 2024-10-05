import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_text_color" AS ENUM('', 'text-white', 'text-black', 'text-red-500', 'text-green-500', '#text-blue-500');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_archive_type" AS ENUM('standart', 'carousel');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_text_color" AS ENUM('', 'text-white', 'text-black', 'text-red-500', 'text-green-500', '#text-blue-500');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_archive_type" AS ENUM('standart', 'carousel');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_users_shipping_profiles_country" AS ENUM('Macedonia');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_archive_type" AS ENUM('standart', 'carousel');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_blocks_archive_type" AS ENUM('standart', 'carousel');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_orders_status" AS ENUM('pending', 'confirmed', 'shipped', 'delivered', 'canceled', 'refunded', 'returned');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_orders_currency_code" AS ENUM('MKD');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_orders_items_status" AS ENUM('notPriented', 'printed', 'canceled', 'leftover', 'returned');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_orders_country" AS ENUM('Macedonia');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "users_shipping_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone_number" varchar NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"country" "enum_users_shipping_profiles_country" DEFAULT 'Macedonia' NOT NULL,
  	"city" varchar NOT NULL,
  	"state" varchar NOT NULL,
  	"zip_code" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"status" "enum_orders_items_status" DEFAULT 'notPriented',
  	"quantity" numeric DEFAULT 1 NOT NULL,
  	"price" numeric DEFAULT 1 NOT NULL,
  	"total" numeric DEFAULT 1 NOT NULL,
  	"sku" varchar NOT NULL,
  	"product_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order_number" varchar NOT NULL,
  	"status" "enum_orders_status" DEFAULT 'pending' NOT NULL,
  	"customer_id" integer,
  	"sub_total" numeric DEFAULT 0,
  	"shipping" numeric DEFAULT 0,
  	"total" numeric DEFAULT 0,
  	"currencyCode" "enum_orders_currency_code" DEFAULT 'MKD' NOT NULL,
  	"email" varchar NOT NULL,
  	"phone_number" varchar NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"country" "enum_orders_country" DEFAULT 'Macedonia' NOT NULL,
  	"city" varchar NOT NULL,
  	"state" varchar NOT NULL,
  	"zip_code" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "filter" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "filter_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"designs_id" integer
  );
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_posts_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_posts_fk";
  
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_posts_fk";
  
  ALTER TABLE "_products_v_rels" DROP CONSTRAINT "_products_v_rels_posts_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_posts_fk";
  
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'products';
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'products';
  ALTER TABLE "products_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'products';
  ALTER TABLE "_products_v_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'products';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "type" "enum_pages_blocks_archive_type" DEFAULT 'standart';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "populated_docs_total" numeric;
  ALTER TABLE "pages" ADD COLUMN "hero_textColor" "enum_pages_hero_text_color";
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "type" "enum__pages_v_blocks_archive_type" DEFAULT 'standart';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "populated_docs_total" numeric;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_textColor" "enum__pages_v_version_hero_text_color";
  ALTER TABLE "products_blocks_archive" ADD COLUMN "type" "enum_products_blocks_archive_type" DEFAULT 'standart';
  ALTER TABLE "products_blocks_archive" ADD COLUMN "populated_docs_total" numeric;
  ALTER TABLE "products_rels" ADD COLUMN "designs_id" integer;
  ALTER TABLE "_products_v_blocks_archive" ADD COLUMN "type" "enum__products_v_blocks_archive_type" DEFAULT 'standart';
  ALTER TABLE "_products_v_blocks_archive" ADD COLUMN "populated_docs_total" numeric;
  ALTER TABLE "_products_v_rels" ADD COLUMN "designs_id" integer;
  DO $$ BEGIN
   ALTER TABLE "users_shipping_profiles" ADD CONSTRAINT "users_shipping_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "filter_rels" ADD CONSTRAINT "filter_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."filter"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "filter_rels" ADD CONSTRAINT "filter_rels_designs_fk" FOREIGN KEY ("designs_id") REFERENCES "public"."designs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_shipping_profiles_order_idx" ON "users_shipping_profiles" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_shipping_profiles_parent_id_idx" ON "users_shipping_profiles" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "orders_items_order_idx" ON "orders_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "orders_items_parent_id_idx" ON "orders_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "filter_rels_order_idx" ON "filter_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "filter_rels_parent_idx" ON "filter_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "filter_rels_path_idx" ON "filter_rels" USING btree ("path");
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_designs_fk" FOREIGN KEY ("designs_id") REFERENCES "public"."designs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_designs_fk" FOREIGN KEY ("designs_id") REFERENCES "public"."designs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "posts_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "posts_id";
  ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "posts_id";
  ALTER TABLE "_products_v_rels" DROP COLUMN IF EXISTS "posts_id";
  ALTER TABLE "redirects_rels" DROP COLUMN IF EXISTS "posts_id";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_pages_blocks_archive_relation_to" ADD VALUE 'posts';
  ALTER TYPE "enum__pages_v_blocks_archive_relation_to" ADD VALUE 'posts';
  ALTER TYPE "enum_products_blocks_archive_relation_to" ADD VALUE 'posts';
  ALTER TYPE "enum__products_v_blocks_archive_relation_to" ADD VALUE 'posts';
  DROP TABLE "users_shipping_profiles";
  DROP TABLE "orders_items";
  DROP TABLE "orders";
  DROP TABLE "filter";
  DROP TABLE "filter_rels";
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_designs_fk";
  
  ALTER TABLE "_products_v_rels" DROP CONSTRAINT "_products_v_rels_designs_fk";
  
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'posts';
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'posts';
  ALTER TABLE "products_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'posts';
  ALTER TABLE "_products_v_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'posts';
  ALTER TABLE "pages_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "products_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_products_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN "posts_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "populated_docs_total";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_textColor";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "populated_docs_total";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_textColor";
  ALTER TABLE "products_blocks_archive" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "products_blocks_archive" DROP COLUMN IF EXISTS "populated_docs_total";
  ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "designs_id";
  ALTER TABLE "_products_v_blocks_archive" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "_products_v_blocks_archive" DROP COLUMN IF EXISTS "populated_docs_total";
  ALTER TABLE "_products_v_rels" DROP COLUMN IF EXISTS "designs_id";`)
}
