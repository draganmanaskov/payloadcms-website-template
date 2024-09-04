import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'customer');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  ALTER TABLE "categories" ADD COLUMN "slug" varchar;
  ALTER TABLE "categories" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "products" ADD COLUMN "published_on" timestamp(3) with time zone;
  ALTER TABLE "products" ADD COLUMN "price_j_s_o_n" varchar;
  ALTER TABLE "products" ADD COLUMN "enable_paywall" boolean;
  DO $$ BEGIN
   ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "users_roles";
  DROP TABLE "products_rels";
  DROP INDEX IF EXISTS "categories_slug_idx";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "slug_lock";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "published_on";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "price_j_s_o_n";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "enable_paywall";`)
}
