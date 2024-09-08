import * as migration_20240831_094937_initial from './20240831_094937_initial';
import * as migration_20240901_110908_add_products from './20240901_110908_add_products';
import * as migration_20240908_181045_test1 from './20240908_181045_test1';

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
    up: migration_20240908_181045_test1.up,
    down: migration_20240908_181045_test1.down,
    name: '20240908_181045_test1'
  },
];
