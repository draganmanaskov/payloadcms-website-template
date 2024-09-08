import * as migration_20240831_094937_initial from './20240831_094937_initial';
import * as migration_20240901_110908_add_products from './20240901_110908_add_products';
import * as migration_20240904_105344_updates from './20240904_105344_updates';
import * as migration_20240908_164621_Inventories from './20240908_164621_Inventories';
import * as migration_20240908_172825_removePosts from './20240908_172825_removePosts';

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
    name: '20240908_172825_removePosts'
  },
];
