import * as migration_20241105_182927_initalMigration from './20241105_182927_initalMigration';

export const migrations = [
  {
    up: migration_20241105_182927_initalMigration.up,
    down: migration_20241105_182927_initalMigration.down,
    name: '20241105_182927_initalMigration'
  },
];
