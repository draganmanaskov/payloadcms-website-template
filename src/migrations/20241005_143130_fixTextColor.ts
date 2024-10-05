import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_pages_hero_text_color" ADD VALUE 'text-blue-500';
  ALTER TYPE "enum__pages_v_version_hero_text_color" ADD VALUE 'text-blue-500';`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_pages_hero_text_color" ADD VALUE '#text-blue-500';
  ALTER TYPE "enum__pages_v_version_hero_text_color" ADD VALUE '#text-blue-500';`)
}
