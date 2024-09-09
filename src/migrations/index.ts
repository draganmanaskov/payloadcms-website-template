import * as migration_20240831_094937_initial from './20240831_094937_initial';
import * as migration_20240901_110908_add_products from './20240901_110908_add_products';
import * as migration_20240904_105344_updates from './20240904_105344_updates';
import * as migration_20240908_182047_test1 from './20240908_182047_test1';
import * as migration_20240908_185147_test1 from './20240908_185147_test1';
import * as migration_20240909_100701_archiveProducts from './20240909_100701_archiveProducts';
import * as migration_20240909_182820_productsUpdate from './20240909_182820_productsUpdate';

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
    up: migration_20240908_182047_test1.up,
    down: migration_20240908_182047_test1.down,
    name: '20240908_182047_test1',
  },
  {
    up: migration_20240908_185147_test1.up,
    down: migration_20240908_185147_test1.down,
    name: '20240908_185147_test1',
  },
  {
    up: migration_20240909_100701_archiveProducts.up,
    down: migration_20240909_100701_archiveProducts.down,
    name: '20240909_100701_archiveProducts',
  },
  {
    up: migration_20240909_182820_productsUpdate.up,
    down: migration_20240909_182820_productsUpdate.down,
    name: '20240909_182820_productsUpdate'
  },
];
