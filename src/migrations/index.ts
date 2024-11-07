import * as migration_20241105_182927_initalMigration from './20241105_182927_initalMigration';
import * as migration_20241107_194903_removeSLugLock from './20241107_194903_removeSLugLock';

export const migrations = [
  {
    up: migration_20241105_182927_initalMigration.up,
    down: migration_20241105_182927_initalMigration.down,
    name: '20241105_182927_initalMigration',
  },
  {
    up: migration_20241107_194903_removeSLugLock.up,
    down: migration_20241107_194903_removeSLugLock.down,
    name: '20241107_194903_removeSLugLock'
  },
];
