// import { Field } from 'payload/types';
// import { Option } from 'payload/dist/fields/config/types';
// import { createIcons, icons } from 'lucide';
// import { CustomSelect } from './CustomSelect';

import { Field } from 'payload'

// export function generateLucideIconOptions(): Option[] {
//   const lucideIconOptions: Option[] = [];
//   Object.keys(icons).forEach((icon) => {
//     lucideIconOptions.push({
//       label: icon,
//       value: icon,
//     });
//   });
//   return lucideIconOptions;
// }

// export const IconSelectorField: Field = {
//   name: 'lucidIcon',
//   type: 'text',
//   admin: {
//     components: {
//       Field: CustomSelect({ options: generateLucideIconOptions() }),
//     },
//   },
// };

export const IconsField: Field = {
  name: 'icons',
  type: 'text',
  admin: {
    components: {
      Field: {
        path: '@/payload/fields/IconPicker/component',
        exportName: 'IconsField',
      },
    },
  },
}
