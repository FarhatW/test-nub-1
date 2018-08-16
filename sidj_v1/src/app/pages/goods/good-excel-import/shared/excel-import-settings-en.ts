const settingsENG = {
  noDataMessage: '',
  pager: {
    display: true,
    perPage: 15,
  },

  actions: {
    add: false,
    edit: false,
    delete: false,
  },
  columns: {
    refPintel: {
      title: 'Good Number',
      type: 'string',
      sort: true,
      editable: false,
      width: '10px',
    },
    indexId: {
      title: 'Letter',
      type: 'string',
      sort: true,
      editable: false,
      width: '10px',
    },
    title: {
      title: 'Nom du Produit',
      type: 'string',
      editable: false,
      valuePrepareFunction: (value) => {
        return (value.length > 10 ? value.substring(0, 10) + '...' : value);
      },
    },
    details: {
      title: 'Description',
      type: 'string',
      editable: false,
      valuePrepareFunction: (value) => {
        return (value.length > 10 ? value.substring(0, 10) + '...' : value);
      },
    },
    price: {
      title: 'Prix',
      type: 'string',
      editable: false,
      sort: true,
    },
    pintelSheetId: {
      title: 'Fiche Pintel',
      type: 'string',
      sort: true,
      editable: false,
      width: '10px',
    },
    originId: {
      title: 'Origine',
      type: 'string',
      sort: true,
      editable: false,
      width: '10px',
    },
    supplierId: {
      title: 'ID Fournisseur',
      type: 'string',
      sort: true,
      editable: false,
      width: '10px',
    },
  },
};
