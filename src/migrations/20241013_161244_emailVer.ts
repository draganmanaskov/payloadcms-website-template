import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_pages_blocks_archive_type" ADD VALUE 'autoScroll';
  ALTER TYPE "enum__pages_v_blocks_archive_type" ADD VALUE 'autoScroll';
  ALTER TYPE "enum_products_blocks_archive_type" ADD VALUE 'autoScroll';
  ALTER TYPE "enum__products_v_blocks_archive_type" ADD VALUE 'autoScroll';
  ALTER TABLE "users" ADD COLUMN "_verified" boolean;
  ALTER TABLE "users" ADD COLUMN "_verificationtoken" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_pages_blocks_archive_type" ADD VALUE 'carousel';
  ALTER TYPE "enum__pages_v_blocks_archive_type" ADD VALUE 'carousel';
  ALTER TYPE "enum_products_blocks_archive_type" ADD VALUE 'carousel';
  ALTER TYPE "enum__products_v_blocks_archive_type" ADD VALUE 'carousel';
  ALTER TABLE "users" DROP COLUMN IF EXISTS "_verified";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "_verificationtoken";`)
}
