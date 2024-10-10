import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_filter_blocks_filter_archive_populate_by" AS ENUM('collection', 'selection');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_filter_blocks_filter_archive_relation_to" AS ENUM('designs', 'categories');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "categories_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "categories_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "designs_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "designs_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "designs_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "filter_blocks_filter_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"populateBy" "enum_filter_blocks_filter_archive_populate_by" DEFAULT 'collection',
  	"relationTo" "enum_filter_blocks_filter_archive_relation_to" DEFAULT 'designs',
  	"limit" numeric DEFAULT 10,
  	"populated_docs_total" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "filter_blocks_filter_archive_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "filter_blocks_filter_archive_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DROP INDEX IF EXISTS "categories_slug_idx";
  DROP INDEX IF EXISTS "designs_title_idx";
  DROP INDEX IF EXISTS "designs_slug_idx";
  ALTER TABLE "pages_locales" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "designs" ADD COLUMN "parent_id" integer;
  ALTER TABLE "filter_rels" ADD COLUMN "categories_id" integer;
  DO $$ BEGIN
   ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designs_breadcrumbs" ADD CONSTRAINT "designs_breadcrumbs_doc_id_designs_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."designs"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designs_breadcrumbs" ADD CONSTRAINT "designs_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designs_locales" ADD CONSTRAINT "designs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "filter_blocks_filter_archive" ADD CONSTRAINT "filter_blocks_filter_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."filter"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "filter_blocks_filter_archive_locales" ADD CONSTRAINT "filter_blocks_filter_archive_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."filter_blocks_filter_archive"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "categories_title_idx" ON "categories_locales" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories_locales" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "designs_breadcrumbs_order_idx" ON "designs_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "designs_breadcrumbs_parent_id_idx" ON "designs_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "designs_breadcrumbs_locale_idx" ON "designs_breadcrumbs" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "designs_title_idx" ON "designs_locales" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "designs_slug_idx" ON "designs_locales" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "filter_blocks_filter_archive_order_idx" ON "filter_blocks_filter_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "filter_blocks_filter_archive_parent_id_idx" ON "filter_blocks_filter_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "filter_blocks_filter_archive_path_idx" ON "filter_blocks_filter_archive" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "designs" ADD CONSTRAINT "designs_parent_id_designs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."designs"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "filter_rels" ADD CONSTRAINT "filter_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_rich_text";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_rich_text";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "designs" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "designs" DROP COLUMN IF EXISTS "slug";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "categories_locales";
  DROP TABLE "designs_breadcrumbs";
  DROP TABLE "designs_locales";
  DROP TABLE "filter_blocks_filter_archive";
  DROP TABLE "filter_blocks_filter_archive_locales";
  ALTER TABLE "designs" DROP CONSTRAINT "designs_parent_id_designs_id_fk";
  
  ALTER TABLE "filter_rels" DROP CONSTRAINT "filter_rels_categories_fk";
  
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "slug" varchar;
  ALTER TABLE "designs" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "designs" ADD COLUMN "slug" varchar;
  CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE UNIQUE INDEX IF NOT EXISTS "designs_title_idx" ON "designs" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "designs_slug_idx" ON "designs" USING btree ("slug");
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_rich_text";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_hero_rich_text";
  ALTER TABLE "designs" DROP COLUMN IF EXISTS "parent_id";
  ALTER TABLE "filter_rels" DROP COLUMN IF EXISTS "categories_id";`)
}
