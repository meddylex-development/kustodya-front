import { NbMenuItem } from '@nebular/theme';

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
export const MENU_ITEMS_TEST: NbMenuItem[] = [
  {
    "title": "Inicio",
    // "home": true,
    "icon": "fas fa-home",
    "link": "/pages/home",
    "selected": false,
  },
  {
    "title": "Administración",
    "home": false,
    "icon": "fas fa-users",
    "link": "/pages/admin",
    "selected": false,
    "children": [
      {
          "title": "Usuarios",
          "home": false,
          "icon": "fas fa-user",
          "link": "/pages/admin/users",
          "selected": false,
      },
      {
          "title": "Perfiles",
          "home": false,
          "icon": "fas fa-chalkboard-teacher",
          "link": "/pages/admin/profiles",
          "selected": false,
      },
      {
          "title": "Parametrización",
          "home": false,
          "icon": "fas fa-border-none",
          "link": "/pages/admin/config",
          "selected": false,
      }
    ],
  },
  {
    "title": "Estructura Organizacional",
    "home": false,
    "icon": "fas fa-map-signs",
    "link": "/pages/org",
    "selected": false,
    "children": [
      {
        "title": "Empresa",
        "home": false,
        "icon": "far fa-building",
        "link": "/pages/org/company",
        "selected": false,
      },
      {
        "title": "Areas",
        "home": false,
        "icon": "fas fa-chart-area",
        "link": "/pages/org/areas",
        "selected": false,
      },
      {
        "title": "Sucursales",
        "home": false,
        "icon": "fas fa-map-marked-alt",
        "link": "/pages/org/offices",
        "selected": false,
      },
      {
        "title": "Cargos",
        "home": false,
        "icon": "fas fa-id-card-alt",
        "link": "/pages/org/positions",
        "selected": false,
      },
    ],
  }
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
