import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService {
  data = [{
    libelle: 'Produit 1',
    origine: 'FRANCE',
    continent: 'EUROPE',
    ref: '0000000000123',
    imprimer: 'test',
  }, {
    libelle: 'Produit 2',
    origine: 'EUROPE',
    continent: 'EUROPE',
    ref: '0000000000456',
    imprimer: 'test',
  }, {
    libelle: 'Produit 3',
    origine: 'FRANCE',
    continent: 'EUROPE',
    ref: '0000000000789',
    imprimer: 'test',
  }, {
    libelle: 'Produit 4',
    origine: 'EUROPE',
    continent: 'EUROPE',
    ref: '0000000000321',
    imprimer: 'test',
  }, {
    libelle: 'Produit 5',
    origine: 'CHINE',
    continent: 'ASIE',
    ref: '0000000000112',
    imprimer: 'test',
  }, {
    libelle: 'Produit 6',
    origine: 'CHINE',
    continent: 'ASIE',
    ref: '0000000000113',
    imprimer: 'test',
  }, {
    libelle: 'Produit 7',
    origine: 'CHINE',
    continent: 'ASIE',
    ref: '0000000000999',
    imprimer: 'test',
  }, {
    libelle: 'Produit 8',
    origine: 'MAROC',
    continent: 'AFRIQUE',
    ref: '0000000000876',
    imprimer: 'test',
  }, {
    libelle: 'Produit 9',
    origine: 'CHINE',
    continent: 'ASIE',
    ref: '0000000000775',
    imprimer: 'test',
  }, {
    libelle: 'Produit 10',
    origine: 'EUROPE',
    continent: 'EUROPE',
    ref: '0000000000455',
    imprimer: 'test',
  }, {
    libelle: 'Produit 11',
    origine: 'EUROPE',
    continent: 'EUROPE',
    ref: '0000000000888',
    imprimer: 'test',
  }];

  getData() {
    return this.data;
  }
}
