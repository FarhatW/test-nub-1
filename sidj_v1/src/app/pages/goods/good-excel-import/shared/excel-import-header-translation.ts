const fr_headers = {
  reference: 'Référence',
  name: 'Libellé',
  gencod: 'Gencod                  EAN 13 ou                UPC 12',
  customsReference: 'Référence douanière',
  countryCode: 'Origine',
  description: 'Description technique \n' +
  'et\n' +
  ' commerciale',
  currency: 'Devise',
  fobGrossPrice: 'fob prix brut',
  fobNetPrice: 'fob prix net',
  ddpGrossPrice: 'ddp prix brut',
  ddpNetPrice: 'ddp prix net',
  exWorksGrossPrice: 'exworks prix brut',
  exWorksNetPrice: 'exworks prix net',
  paymentTerms: 'conditions paiement',
  dateOfValidity: 'Date \n' + 'validité \n' + 'offre',
  departurePlace: 'lieu de chargement',
  isExclusivityJc: 'Exclusivité\n' + 'JouéClub \n' + '(O, N)',
  isSpecialBoxJc: 'Boite \n' + 'JouéClub \n' + '(O, N)',
  availabilityProduct: 'Date \n' + 'disponibilité',
  minimumQuantity: 'quantité minimum',

  outerColisage: 'Quantités colisage \n' + 'ou \n' + 'outer carton',
  innerColisage: 'Quantités sous colisage \n' + 'ou\n' + ' inner carton',
  itemsQuantity20: 'nombre de produit pour un 20\'',
  itemsQuantity40: 'nombre de produit pour un 40\'',
  colisageGrossWeight: 'poids brut outer carton (kg)',
  colisageNetWeight: 'poids net outer carton (kg)',
  outerCartonDimension: 'dimensions outer colis',

  productDimension: 'Dimensions \n' + 'hors emballage \n' + '(L  x  l  x  h) (cm)',
  boxDimension: 'Dimensions de la boite \n' + '(L  x  l  x  h) (cm)',
  colors: 'liste coloris',
  models: 'Liste modèles\n' + '/\n' + 'versions',
  packagingLanguage: 'Langue \n' + 'du \n' + 'boitage',
  manualLanguage: 'Langue \n' + 'de la \n' + 'notice',
  productLanguage: 'Langue \n' + 'du \n' + 'produit',
  ageNum: 'Qte Age minimum',
  ageType: 'Type Age minimum',
  productNetWeight: 'Poids net \n' + 'produit \n' + '(Kg)\n' + '(sans boite)',
  productGrossWeight: 'Poids brut \n' + 'produit \n' + '(Kg)\n' + '(avec boîte) ',

  accuId: 'Accus ID',
  accuQty: 'Qtés accus',
  accuGrossWeight: 'Poids brut accus',
  isAccuIncluded: 'Accus \n' + 'inclus \n' + '(O, N)',

  isChargerIncluded: 'Chargeur \n' + 'inclus \n' +  '(O, N)',
  chargerType: 'Chargeur',

  batteryQty: 'Qtés piles',
  isBatteryIncluded: 'Piles \n' + 'incluses \n' + '(O, N)',
  batteryId: 'Piles ID',

  battery2Qty: 'Qtés autres piles',
  isBattery2Included: 'Autres piles \n' + 'incluses \n' + '(O, N)',
  batteryId2: 'Autres piles ID',

  isBattery3Included: 'Piles suppl.\n' + 'incluses \n' + '(O, N)',
  batteryId3: 'Piles Suppl. ID',
  battery3Qty: 'Qtés piles suppl.',

  deeeContribution: 'DEEE (HT)',
  functionTryMe: 'fonction try me',
  isDummyProduct: 'prototype image (o, n)',
  engineType: 'Type \n' + 'moteur',
  showImage: 'nom fichier image',
  vatRate: 'Taux \n' + 'de \n' + 'TVA',
  isExclusivitySpecialist: 'Exclusivité \n' + 'Spécialiste \n' + '(O, N)',
  productSexe: 'Sexe \n' + '(G, F, M)',
  shipmentTime: 'délai approvisionnement après commande',

  comments: 'Commentaire \n' + 'fournisseur',

  grossPrice: 'Prix \n' + 'Tarif brut \n' + '(HT, hors DEEE)',
  netPrice: 'Prix Net spéciaux sur produits spécifiques (HT, hors DEEE)',

  supplierName: 'Fournisseur',
  brand: 'Marque',
  range: 'Gamme Produit Héros \n' + 'ou \n' + 'licence',
  continent: 'Continent',

  boxVolume: 'Volume \n' + 'de la boite \n' + '(M³)',
  multipleColors: 'Plusieurs \n' + 'coloris \n' + '(O, N)',
  whichColor: 'Liste coloris',
  multipleModels: 'Plusieurs modèles\n' + '/\n' + 'versions \n' + '(O, N)',
  diameter: 'Diamètre'

};

const en_headers = {
  goodsNumber: 'reference',
  productName: 'product name',
  gencod: 'gencod ean 13 or upc 12',
  customsReference: 'customs reference',
  countryCode: 'origin country code',
  productDescription: 'technical and commercial description',
  currency: 'currency',
  fobGrossPrice: 'fob gross price',
  fobNetPrice: 'fob net price',
  ddpGrossPrice: 'ddp gross price',
  ddpNetPrice: 'ddp net price',
  exWorksGrossPrice: 'exworks gross price',
  exWorksNetPrice: 'exworks net price',
  paymentTerms: 'payment terms',
  dateOfValidity: 'price validity',
  departurePlace: 'departure place',

  isExclusivityJc: 'joueclub exclusivity (y, n)',
  isSpecialBoxJc: 'joueclub box (y, n)',
  isExclusivitySpecialist: 'specialist exclusivity (y, n)',

  availabilityProduct: 'product availability date',
  minimumQuantity: 'minimum order quantity',

  outerColisage: 'qty per outer carton',
  innerColisage: 'qty per inner carton',
  itemsQuantity20: 'qty per container 20\'',
  itemsQuantity40: 'qty per container 40\'',
  colisageGrossWeight: 'packing gross weight (kg)',
  colisageNetWeight: 'packing net weight (kg)',
  outerCartonDimension: 'outer packing dimensions',

  productDimension: 'product dimensions (lxlxh) (cm)',
  boxDimension: 'box dimensions (lxlxh) (cm)',
  whichColor: 'available colors',
  whichModels: 'other models',
  packagingLanguage: 'packaging language',
  manualLanguage: 'manual language',
  productLanguage: 'product language',
  ageNum: 'minimum age',
  ageType: 'age type',
  productNetWeight: 'product net weight (kg) (w/o the box)',
  productGrossWeight: 'product gross weight (kg) (w/ the box)',

  batteryQty: 'battery qty',
  isBatteryIncluded: 'battery included',
  batteryId: 'battery id',

  battery2Qty: '2nd battery qty',
  isBattery2Included: 'battery 2nd included',
  batteryId2: 'battery id 2nd',

  isBattery3Included: 'battery 3rd included',
  batteryId3: 'battery id 3rd',
  battery3Qty: '3rd battery qty',

  accusId: 'accu id',
  accusQty: 'accu(s) qty',
  accusGrossWeight: 'accu gross weight',
  isAccusIncluded: 'accu(s) included',

  isChargerIncluded: 'charger included (y, n)',
  chargerType: 'charger',

  deeeContribution: 'deee',
  functionTryMe: 'try me feature',
  isDummyProduct: 'dummy picture (y, n)',
  engineType: 'engine type',

  showImage: 'picture file name',
  vatRate: 'vat',
  productSexe: 'gender (m, f, x)',
  shipmentTime: 'shipment time',

  comment: 'comments',
};

export {fr_headers, en_headers}

