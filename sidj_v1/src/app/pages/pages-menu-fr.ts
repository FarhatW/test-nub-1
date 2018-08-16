import {NbMenuItem} from '@nebular/theme';

// TODO: redirect to profile edit form

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: 'nb-home',
    link: 'dashboard',
    home: true,
  },
  // {
  //   title: 'Mon Profil',
  //   icon: 'nb-person',
  //   link: '',
  // },
  {
    title: 'Fournisseur',
    icon: 'nb-compose',
    roles: ['AGENTS', 'ADSIDJ', 'SUPADM'],

    children: [
      {
        title: 'Ajouter un Fournisseur',
        link: 'suppliers/new',
        roles: ['AGENTS'],
      },

      {
        title: 'Afficher les fournisseurs',
        link: 'suppliers/list',
        roles: ['AGENTS', 'ADSIDJ', 'SUPADM'],
      },
    ],
  },
  {
    title: 'Admin',
    icon: 'nb-compose',
    roles: ['SUPADM'],
    children: [
      {
        title: 'Liste des admin',
        link: 'agents/new',
        roles: ['SUPADM'],
      },
      {
        title: 'Ajouter un Adminstrateur EPSE',
        link: 'admin/epse/new',
        roles: ['SUPADM'],
      },
      {
        title: 'Ajouter un Adminstrateur SIDJ',
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
        title: 'Ajouter un Agent',
        link: 'agents/new',
        roles: ['ADSIDJ'],
      },
      {
        title: 'Afficher les agents',
        link: 'agents/list',
        roles: ['ADSIDJ', 'SUPADM'],
      },
    ],
  },
  {
    title: 'Piles & Batteries',
    icon: 'nb-gear',
    roles: ['ADSIDJ', 'SUPADM'],
    children: [
      {
        title: 'Liste',
        link: 'accusbatteries/'
      },
    ],
  },
  {
    title: 'Produit',
    icon: 'fa fa-barcode',
    roles: ['SUPPLI', 'ADSIDJ', 'AGENTS', 'SUPADM'],
    children: [
      {
        title: 'Liste des produits',
        link: '',
        roles: ['SUPPLI']

      },
      {
        title: 'Liste de tous produits',
        link: 'goods/list',
        roles: ['SUPADM']

      },
      {
        title: 'Création ligne produit',
        link: 'goods/form/new',
        roles: ['SUPPLI', 'ADSIDJ', 'AGENTS', 'SUPADM']
      },
      {
        title: 'Création produit en masse',
        roles: ['SUPPLI', 'ADSIDJ', 'AGENTS', 'SUPADM'],
        children: [
          {
            title: 'Import Excel',
            link: 'goods/excel-import',
            roles: ['SUPPLI', 'ADSIDJ', 'AGENTS', 'SUPADM']

          },
          {
            title: 'Import Images',
            link: 'goods/pics-manager',
            roles: ['SUPPLI', 'ADSIDJ', 'AGENTS', 'SUPADM']

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
