import * as migration_20240831_094937_initial from './20240831_094937_initial';
import * as migration_20240901_110908_add_products from './20240901_110908_add_products';
import * as migration_20240904_105344_updates from './20240904_105344_updates';
import * as migration_20240908_164621_Inventories from './20240908_164621_Inventories';
import * as migration_20240908_172825_removePosts from './20240908_172825_removePosts';
import * as migration_20240908_173402_fix from './20240908_173402_fix';
import * as migration_20240908_173841_fix2 from './20240908_173841_fix2';
import * as migration_20240908_174220_archive from './20240908_174220_archive';
import * as migration_20240908_174805_archiveF from './20240908_174805_archiveF';
import * as migration_20240908_175934_removeProd from './20240908_175934_removeProd';

export const migrations = [
  {
    up: migration_20240831_094937_initial.up,
    down: migration_20240831_094937_initial.down,
    name: '20240831_094937_initial',
  },
  {
    up: migration_20240901_110908_add_products.up,
    down: migration_20240901_110908_add_products.down,
    name: '20240901_110908_add_products',
  },
  {
    up: migration_20240904_105344_updates.up,
    down: migration_20240904_105344_updates.down,
    name: '20240904_105344_updates',
  },
  {
    up: migration_20240908_164621_Inventories.up,
    down: migration_20240908_164621_Inventories.down,
    name: '20240908_164621_Inventories',
  },
  {
    up: migration_20240908_172825_removePosts.up,
    down: migration_20240908_172825_removePosts.down,
    name: '20240908_172825_removePosts',
  },
  {
    up: migration_20240908_173402_fix.up,
    down: migration_20240908_173402_fix.down,
    name: '20240908_173402_fix',
  },
  {
    up: migration_20240908_173841_fix2.up,
    down: migration_20240908_173841_fix2.down,
    name: '20240908_173841_fix2',
  },
  {
    up: migration_20240908_174220_archive.up,
    down: migration_20240908_174220_archive.down,
    name: '20240908_174220_archive',
  },
  {
    up: migration_20240908_174805_archiveF.up,
    down: migration_20240908_174805_archiveF.down,
    name: '20240908_174805_archiveF',
  },
  {
    up: migration_20240908_175934_removeProd.up,
    down: migration_20240908_175934_removeProd.down,
    name: '20240908_175934_removeProd'
  },
];
