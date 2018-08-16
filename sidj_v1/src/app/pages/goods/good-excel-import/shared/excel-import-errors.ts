// Product Excel Errors
const errorsFR = {
  goodsNumber: 'Erreur sur la référence Produit.',
  productName: 'Le nom du produit est obligatoire.',
  gencod: 'Erreur sur le Gencod',
  customsReference: 'Erreur sur la ref douaniere',
  countryCode: 'Vérifiez que le code Pays existe dans la liste.',
  productDescription: 'Erreur sur la description.',
  currency: 'La devise rentrée n\'existe pas.',

  fobGrossPrice: 'Erreur FOB prix brut. ex: 15.55',
  fobNetPrice: 'Erreur FOB prix net ex: 15.55',
  ddpGrossPrice: 'erreur DDP prix brut. ex: 15.55',
  ddpNetPrice: 'erreur DDP prix net. ex: 15.55 ',
  exWorksGrossPrice: 'EXWORKS prix brut. ex: 15.55',
  exWorksNetPrice: 'EXWORKS prix net. ex: 15.55',

  netPrices: 'Au moins un champs de prix net à remplir',

  paymentTerms: 'Erreur sur les termes du paiement.',
  dateOfValidity: 'Erreur sur la date de validité du prix.',
  departurePlace: 'Erreur sur le lieu de chargement.',
  isExclusivityJc: 'Erreur sur l\'exclusivité JOUECLUB.',
  isSpecialBoxJc: 'Erreur sur la boite spéciale JOUECLUB.',
  availabilityProduct: 'Erreur sur la date de disponibilité du produit.',
  minimumQuantity: 'Erreur sur la quantité minimum.',

supplierId: 'Veuillez sélectionner un fournisseur',

  outerColisage: 'erreur outer colis',
  innerColisage: 'erreur inner colis',
  itemsQuantity20: 'erreur qte20',
  itemsQuantity40: 'erreur qte40',
  outCartonCbm: 'erreur outCarton',
  colisageGrossWeight: 'erreur colissage poids brut',
  colisageNetWeight: 'erreur colissage poids net',
  outerCartonDimension: 'erreur colissage dimension',

  productDimension: 'erreur produit dimension',
  boxDimension: 'erreur boite dimension',
  whichColor: 'erreur couleur',
  whichModels: 'erreur modeles',
  packagingLanguage: 'Veuillez entrer un langage de la liste.',
  manualLanguage: 'Veuillez entrer un langage de la liste.',
  productLanguage: 'Veuillez entrer un langage de la liste.',
  age: 'erreur age',
  productNetWeight: 'erreur poids net produit',
  productGrossWeight: 'erreur poids brut produit',
  isAccusIncluded: 'erreur accus inclus',
  accusId: 'erreur type accus',
  accusQty: 'erreur quantité accus',
  accusGrossWeight: 'erreur poids brut de l\'accus',

  isBatteryIncluded: 'Requis si vous avez rentré un ID de pile.',
  batteryId: 'Cette ID de pile n\'existe pas.',
  batteryQty: 'La quantité doit être supérieure à 0',

  isBattery2Included: 'Requis si vous avez rentré un ID de pile.',
  batteryId2: 'Cette ID de pile n\'existe pas.',
  battery2Qty: 'La quantité doit être supérieure à 0',


  isBattery3Included: 'Requis si vous avez rentré un ID de pile.',
  batteryId3: 'Cette ID de pile n\'existe pas.',
  battery3Qty: 'La quantité doit être supérieure à 0',

  deeeContribution: 'erreur deee',
  functionTryMe: 'erreur tryme',
  isChargerIncluded: 'erreur chargeur inclus',
  chargerType: 'erreur type chargeur',
  showImage: 'erreur saveSidjGood-form-step-6',

  continent: 'erreur continent',
  vatRate: 'Erreur sur le taux de TVA.',
  isExclusivitySpecialist: 'erreur exclusivité spécialiste',
  productSexe: 'erreur sexe produit',
  shipmentTime: 'erreur de livraison',
  comment: 'erreur comments',
  engineType: 'type moteur'
};

const errorsEN = {
  goodsNumber: 'Error on the product reference.',
  productName: 'Product name is required',
  gencod: 'Gencod or UPC error',
  customsReference: 'Error on customs reference',
  countryCode: 'Error on the country code.',
  productDescription: 'Error on the product description.',
  currency: 'Currency error.',

  fobGrossPrice: 'Error on the FOB gross price',
  fobNetPrice: 'Error on the FOB net price',
  ddpGrossPrice: 'Error on the DDP gross price',
  ddpNetPrice: 'Error on the DDP net price',
  exWorksGrossPrice: 'Error on the EXWORKS gross price',
  exWorksNetPrice: 'Error on the EXWORKS net price',
  netPrices: 'At least one of the net prices are required.',

  supplierId: 'Please select a supplier',

  paymentTerms: 'Payment terms error',
  dateOfValidity: 'Error on the validity date.',
  departurePlace: 'Error on the departure place.',
  isExclusivityJc: 'Error on the JC exclusivity field.',
  isSpecialBoxJc: 'Error on the JC special box field.',
  availabilityProduct: 'Error on the product availability.',
  minimumQuantity: 'Error on the minimum order quantity field.',


  outerColisage: 'Error on the outer colisage field.',
  innerColisage: 'Error on the inner colisage field.',
  itemsQuantity20: 'Error on the Product per 20\' field.',
  itemsQuantity40: 'Error on the Product per 40\' field.',
  outCartonCbm: 'Error the outer packing dimensions.',
  colisageGrossWeight: 'Error on the Packing gross weight field.',
  colisageNetWeight: 'Error on the Packing net weight field.',
  outerCartonDimension: 'Error on the outer carton dimensions.',

  productDimension: 'Error on the product dimensions field (eg: Lxlxh)',
  boxDimension: 'Error on the box dimensions field (eg: Lxlxh)',
  whichColor: 'Error on the colors field.',
  whichModels: 'Error on the models field.',
  packagingLanguage: 'Error on the packaging language field.',
  manualLanguage: 'Error on the manual language field.',
  productLanguage: 'Error on the product language field.',
  age: 'Error on the age field.',
  productNetWeight: 'Error on the product net weight field.',
  productGrossWeight: 'Error on the product gross weight field.',
  isAccusIncluded: 'Error on the included Accu field.',
  accusId: 'Error on the accu ID field.',
  accusQty: 'Error on the accu(s)  quantity field.',
  accusGrossWeight: 'Error on the accus gross weight field.',

  isBatteryIncluded: 'Error on the battery included field.',
  batteryId: 'Error on the ID battery field.',
  batteryQty: 'Error on the battery quantity field.',

  isBattery2Included: 'Error on the other batteries included field.',
  batteryId2: 'Error on the ID other batteries field.',
  battery2Qty: 'Error on the other batteries qty field.',

  isBattery3Included: 'Error on the other batteries 2 included field.',
  batteryId3: 'Error on the ID other batteries 2 field.',
  battery3Qty: 'Error on the other batteries 2 qty field.',


  deeeContribution: 'Error on the DEEE field.',
  functionTryMe: 'Error on the TryMe feature field. ',
  isChargerIncluded: 'Error on the charger included field.',
  chargerType: 'Error on the charger type field.',
  showImage: 'Error on the dummy picture field.',

  continent: 'Error on the continent.',
  vatRate: 'Error on the VAT field.',
  isExclusivitySpecialist: 'Error on the Specialist exclusivity field.',
  productSexe: 'Error on the gender. ( (F)emale, (M)ale or (X) Mixed).',
  shipmentTime: 'Error the shipment time field.',
  comment: 'Error on the comments field.',
  engineType: 'Error on the engine type field.'
};

export {errorsEN, errorsFR};
