import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_blocks_archive_relation_to" AS ENUM('posts', 'products');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TYPE "enum_pages_blocks_archive_relation_to" ADD VALUE 'products';
  ALTER TYPE "enum__pages_v_blocks_archive_relation_to" ADD VALUE 'products';
  CREATE TABLE IF NOT EXISTS "products_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populateBy" "enum_products_blocks_archive_populate_by" DEFAULT 'collection',
  	"relationTo" "enum_products_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "products_rels" ADD COLUMN "posts_id" integer;
  DO $$ BEGIN
   ALTER TABLE "products_blocks_archive" ADD CONSTRAINT "products_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_blocks_archive_order_idx" ON "products_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_archive_parent_id_idx" ON "products_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_archive_path_idx" ON "products_blocks_archive" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "products_blocks_archive";
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_products_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_products_fk";
  
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_posts_fk";
  
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "posts_id";`)
}
