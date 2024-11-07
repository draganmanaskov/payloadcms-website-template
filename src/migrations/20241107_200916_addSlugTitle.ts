import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" RENAME COLUMN "name" TO "slug_title";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_name" TO "version_slug_title";
  ALTER TABLE "products" RENAME COLUMN "name" TO "slug_title";
  ALTER TABLE "_products_v" RENAME COLUMN "version_name" TO "version_slug_title";
  DROP INDEX IF EXISTS "categories_slug_idx";
  DROP INDEX IF EXISTS "designs_slug_idx";
  DROP INDEX IF EXISTS "tags_slug_idx";
  ALTER TABLE "posts" ADD COLUMN "slug_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_slug_title" varchar;
  ALTER TABLE "categories" ADD COLUMN "slug_title" varchar NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "designs" ADD COLUMN "slug_title" varchar NOT NULL;
  ALTER TABLE "designs" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "tags" ADD COLUMN "slug_title" varchar NOT NULL;
  ALTER TABLE "tags" ADD COLUMN "slug" varchar NOT NULL;
  CREATE INDEX IF NOT EXISTS "pages_slug_title_idx" ON "pages" USING btree ("slug_title");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_title_idx" ON "_pages_v" USING btree ("version_slug_title");
  CREATE INDEX IF NOT EXISTS "posts_slug_title_idx" ON "posts" USING btree ("slug_title");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_title_idx" ON "_posts_v" USING btree ("version_slug_title");
  CREATE INDEX IF NOT EXISTS "categories_slug_title_idx" ON "categories" USING btree ("slug_title");
  CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "products_slug_title_idx" ON "products" USING btree ("slug_title");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_slug_title_idx" ON "_products_v" USING btree ("version_slug_title");
  CREATE INDEX IF NOT EXISTS "designs_slug_title_idx" ON "designs" USING btree ("slug_title");
  CREATE INDEX IF NOT EXISTS "designs_slug_idx" ON "designs" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "tags_slug_title_idx" ON "tags" USING btree ("slug_title");
  CREATE INDEX IF NOT EXISTS "tags_slug_idx" ON "tags" USING btree ("slug");
  ALTER TABLE "categories_locales" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "designs_locales" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "tags_locales" DROP COLUMN IF EXISTS "slug";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" RENAME COLUMN "slug_title" TO "name";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_slug_title" TO "version_name";
  ALTER TABLE "products" RENAME COLUMN "slug_title" TO "name";
  ALTER TABLE "_products_v" RENAME COLUMN "version_slug_title" TO "version_name";
  DROP INDEX IF EXISTS "pages_slug_title_idx";
  DROP INDEX IF EXISTS "_pages_v_version_version_slug_title_idx";
  DROP INDEX IF EXISTS "posts_slug_title_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_slug_title_idx";
  DROP INDEX IF EXISTS "categories_slug_title_idx";
  DROP INDEX IF EXISTS "categories_slug_idx";
  DROP INDEX IF EXISTS "products_slug_title_idx";
  DROP INDEX IF EXISTS "_products_v_version_version_slug_title_idx";
  DROP INDEX IF EXISTS "designs_slug_title_idx";
  DROP INDEX IF EXISTS "designs_slug_idx";
  DROP INDEX IF EXISTS "tags_slug_title_idx";
  DROP INDEX IF EXISTS "tags_slug_idx";
  ALTER TABLE "categories_locales" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "designs_locales" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "tags_locales" ADD COLUMN "slug" varchar NOT NULL;
  CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories_locales" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "designs_slug_idx" ON "designs_locales" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "tags_slug_idx" ON "tags_locales" USING btree ("slug");
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "slug_title";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_slug_title";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "slug_title";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "designs" DROP COLUMN IF EXISTS "slug_title";
  ALTER TABLE "designs" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "tags" DROP COLUMN IF EXISTS "slug_title";
  ALTER TABLE "tags" DROP COLUMN IF EXISTS "slug";`)
}
