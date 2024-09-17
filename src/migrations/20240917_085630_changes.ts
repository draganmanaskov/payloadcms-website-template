import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users_cart_items" ALTER COLUMN "product_id" SET NOT NULL;
  ALTER TABLE "users_cart_items" ALTER COLUMN "sku" SET NOT NULL;
  ALTER TABLE "users_cart_items" ALTER COLUMN "quantity" SET NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users_cart_items" ALTER COLUMN "product_id" DROP NOT NULL;
  ALTER TABLE "users_cart_items" ALTER COLUMN "sku" DROP NOT NULL;
  ALTER TABLE "users_cart_items" ALTER COLUMN "quantity" DROP NOT NULL;`)
}
