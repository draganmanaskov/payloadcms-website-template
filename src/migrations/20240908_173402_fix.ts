import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relationTo" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relationTo" DROP DEFAULT;
  ALTER TABLE "products_blocks_archive" ALTER COLUMN "relationTo" DROP DEFAULT;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_pages_blocks_archive_relation_to" ADD VALUE 'products';
  ALTER TYPE "enum__pages_v_blocks_archive_relation_to" ADD VALUE 'products';
  ALTER TYPE "enum_products_blocks_archive_relation_to" ADD VALUE 'products';
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'products';
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'products';
  ALTER TABLE "products_blocks_archive" ALTER COLUMN "relationTo" SET DEFAULT 'products';`)
}
