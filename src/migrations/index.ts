import * as migration_20240831_094937_initial from './20240831_094937_initial';
import * as migration_20240901_110908_add_products from './20240901_110908_add_products';
import * as migration_20240904_105344_updates from './20240904_105344_updates';
import * as migration_20240908_182047_test1 from './20240908_182047_test1';
import * as migration_20240908_185147_test1 from './20240908_185147_test1';
import * as migration_20240909_100701_archiveProducts from './20240909_100701_archiveProducts';
import * as migration_20240909_182820_productsUpdate from './20240909_182820_productsUpdate';
import * as migration_20240910_152202_product_details from './20240910_152202_product_details';
import * as migration_20240917_085630_changes from './20240917_085630_changes';
import * as migration_20240918_162203_addDesigns from './20240918_162203_addDesigns';
import * as migration_20241005_141212_removePostRef from './20241005_141212_removePostRef';
import * as migration_20241005_143130_fixTextColor from './20241005_143130_fixTextColor';
import * as migration_20241010_195413_locali from './20241010_195413_locali';
import * as migration_20241011_190901_createTags from './20241011_190901_createTags';
import * as migration_20241011_201148_changes from './20241011_201148_changes';
import * as migration_20241012_143250_slugNameLocal from './20241012_143250_slugNameLocal';
import * as migration_20241013_161244_emailVer from './20241013_161244_emailVer';
import * as migration_20241105_175653_allChanges from './20241105_175653_allChanges';

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
    name: '20240909_182820_productsUpdate',
  },
  {
    up: migration_20240910_152202_product_details.up,
    down: migration_20240910_152202_product_details.down,
    name: '20240910_152202_product_details',
  },
  {
    up: migration_20240917_085630_changes.up,
    down: migration_20240917_085630_changes.down,
    name: '20240917_085630_changes',
  },
  {
    up: migration_20240918_162203_addDesigns.up,
    down: migration_20240918_162203_addDesigns.down,
    name: '20240918_162203_addDesigns',
  },
  {
    up: migration_20241005_141212_removePostRef.up,
    down: migration_20241005_141212_removePostRef.down,
    name: '20241005_141212_removePostRef',
  },
  {
    up: migration_20241005_143130_fixTextColor.up,
    down: migration_20241005_143130_fixTextColor.down,
    name: '20241005_143130_fixTextColor',
  },
  {
    up: migration_20241010_195413_locali.up,
    down: migration_20241010_195413_locali.down,
    name: '20241010_195413_locali',
  },
  {
    up: migration_20241011_190901_createTags.up,
    down: migration_20241011_190901_createTags.down,
    name: '20241011_190901_createTags',
  },
  {
    up: migration_20241011_201148_changes.up,
    down: migration_20241011_201148_changes.down,
    name: '20241011_201148_changes',
  },
  {
    up: migration_20241012_143250_slugNameLocal.up,
    down: migration_20241012_143250_slugNameLocal.down,
    name: '20241012_143250_slugNameLocal',
  },
  {
    up: migration_20241013_161244_emailVer.up,
    down: migration_20241013_161244_emailVer.down,
    name: '20241013_161244_emailVer',
  },
  {
    up: migration_20241105_175653_allChanges.up,
    down: migration_20241105_175653_allChanges.down,
    name: '20241105_175653_allChanges'
  },
];
