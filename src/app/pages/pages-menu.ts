import { NbMenuItem } from '@nebular/theme';

let id_company = null;
id_company = sessionStorage.getItem('id_company');
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Base',
    icon: 'nb-e-commerce',
    link: '/pages/base',
    home: true,
  }
  // {
  //   title: 'Modal & Overlays',
  //   icon: 'nb-layout-default',
  //   children: [
  //     {
  //       title: 'Dialog',
  //       link: '/pages/modal-overlays/dialog',
  //     },
  //     {
  //       title: 'Window',
  //       link: '/pages/modal-overlays/window',
  //     },
  //     {
  //       title: 'Popover',
  //       link: '/pages/modal-overlays/popover',
  //     },
  //     {
  //       title: 'Toastr',
  //       link: '/pages/modal-overlays/toastr',
  //     },
  //     {
  //       title: 'Tooltip',
  //       link: '/pages/modal-overlays/tooltip',
  //     },
  //   ],
  // },
];
// export const MENU_ITEMS_CONFIG: NbMenuItem[] = [];
// export const MENU_ITEMS_CONFIG: NbMenuItem[] = [{
//   title: 'Versions',
//   icon: 'fas fa-tasks',
//   link: '/pages/versions-company/' + sessionStorage.getItem('id_company'),
//   home: false,
// }, {
//   title: 'Projects',
//   icon: 'fas fa-folder-open',
//   link: '/pages/projects/',
//   home: false,
//   // queryParams: {id_company: 11},
// }, {
//   title: 'Members',
//   icon: 'fas fa-users',
//   link: '/pages/members/' + sessionStorage.getItem('id_company'),
//   home: false,
// }, {
//   title: 'Settings',
//   icon: 'fas fa-tools',
//   link: '/pages/tool-settings',
//   home: false,
// }];

// export const MENU_ITEMS_GROUPS_MODULE: NbMenuItem[] = [
//   {
//     title: 'Versions',
//     icon: 'fas fa-tasks',
//     link: '/pages/versions-company/' + sessionStorage.getItem('id_company'),
//     home: false,
//   }, {
//     title: 'Groups',
//     icon: 'fas fa-users',
//     link: '/pages/groups/' + sessionStorage.getItem('id_company'),
//     home: false,
//   }, {
//     title: 'Settings',
//     icon: 'fas fa-tools',
//     link: '/pages/tool-settings',
//     home: false,
//   },
// ];
