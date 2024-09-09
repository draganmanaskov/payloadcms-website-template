import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_products_currency_code" AS ENUM('MKD');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "users_cart_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"sku" varchar,
  	"quantity" numeric
  );
  
  ALTER TABLE "products" ADD COLUMN "price" numeric;
  ALTER TABLE "products" ADD COLUMN "currencyCode" "enum_products_currency_code" DEFAULT 'MKD';
  DO $$ BEGIN
   ALTER TABLE "users_cart_items" ADD CONSTRAINT "users_cart_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_cart_items" ADD CONSTRAINT "users_cart_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_cart_items_order_idx" ON "users_cart_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_cart_items_parent_id_idx" ON "users_cart_items" USING btree ("_parent_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "users_cart_items";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "price";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "currencyCode";`)
}
