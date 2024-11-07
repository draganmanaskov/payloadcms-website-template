import * as migration_20241107_202442_initialMigration from './20241107_202442_initialMigration';

export const migrations = [
  {
    up: migration_20241107_202442_initialMigration.up,
    down: migration_20241107_202442_initialMigration.down,
    name: '20241107_202442_initialMigration'
  },
];
