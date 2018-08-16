import {NbMenuItem} from "@nebular/theme";

export const MENU_ITEMS_EN: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: 'dashboard',
    home: true,
  },
  {
    title: 'Supplier',
    icon: 'nb-compose',
    roles: ['AGENTS', 'SUPADM'],
    children: [
      {
        title: 'Add a Supplier',
        link: 'suppliers/new',
        roles: ['AGENTS'],
      },

      {
        title: 'Suppliers List',
        link: 'suppliers/list',
        roles: ['AGENTS', 'SUPADM'],
      },
    ],
  },
  {
    title: 'Admin',
    icon: 'nb-compose',
    roles: ['SUPADM'],
    children: [
      {
        title: 'Admin list',
        link: 'admin/list',
        roles: ['SUPADM'],
      },
      {
        title: 'Add admin EPSE',
        link: 'admin/epse/new',
        roles: ['SUPADM'],
      },
      {
        title: 'Add admin SIDJ',
        link: 'admin/sidj/new',
        roles: ['SUPADM'],
      },
    ],
  },
  {
    title: 'Agent',
    icon: 'nb-compose',
    roles: ['ADSIDJ', 'SUPADM'],
    children: [

      {
        title: 'Add a new Agent',
        link: 'agents/new',
        roles: ['ADSIDJ'],
      },
      {
        title: 'Agent List',
        link: 'agents/list',
        roles: ['ADSIDJ', 'SUPADM'],
      },
    ],
  },
  {
    title: 'Accus & Batteries',
    icon: 'nb-gear',
    roles: ['ADSIDJ', 'SUPADM'],
    children: [
      {
        title: 'Accus & Batteries',
        link: 'accusbatteries/'
      },
    ],
  },
  {
    title: 'Product',
    icon: 'fa fa-barcode',
    roles: ['BASERL'],
    children: [
      {
        title: 'Product List',
        link: '',
        roles: ['SUPPLI']
      },
      {
        title: 'All product',
        link: 'goods/list',
        roles: ['SUPADM']

      },
      {
        title: 'Add',
        link: 'goods/form/new',
        roles: ['BASERL']
      },

      {
        title: 'Mass imports',
        roles: ['BASERL'],
        children: [
          {
            title: 'Excel Import ',
            link: 'goods/excel-import',
            roles: ['BASERL'],
          },
          {
            title: 'Import Product Pictures',
            link: 'goods/pics-manager',
            roles: ['BASERL'],
          }
        ]
      },
    ],
  },
  {
    title: 'EPSE',
    roles: ['ADEPSE'],
    icon: 'icon ion-md-filing',
    children: [
      {
        title: 'Main',
        link: 'epse/main',
        roles: ['ADEPSE']
      },
    ]
  }
];
