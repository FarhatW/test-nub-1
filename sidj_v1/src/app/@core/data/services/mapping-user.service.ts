import {Injectable, Input} from '@angular/core';
import {SaveSupplier} from '../models/users/suppliers/saveSupplier';
import {SaveAgent} from '../models/users/agents/saveAgent';
import {SaveSidjGood} from '../models/goods/sidjGood/saveSidjGood';
import {SidjGood} from '../models/goods/sidjGood/sidjGood';
import {SavePerson} from '../models/users/person/savePerson';
import {LanguageService} from "./language.service";
import {CountryService} from "./country.service";
import {GenderService} from "./gender.service";

@Injectable()
export class MappingUserService {

  constructor( private languageService: LanguageService,
               private countriesService: CountryService,
               private genderService: GenderService) {



  }

  setNewSupplier(roles: string[], isHomePage: boolean, isSupplier: boolean, id: string, isProfile: boolean): SaveSupplier {

    return {
      id: 0,

      tva: '',
      photo: '',
      agentId: !isHomePage && !isSupplier ? +id : null,
      isConfirmedAccount: isHomePage || isProfile,

      lastName: '',
      firstName: '',

      mail: '',
      password: '',

      contact: {
        company: '',
        address1: '',
        address2: '',
        city: '',
        zipCode: '',
        country: null,
        fax: '',
        phone: '',
      },

      roles: roles,
      createdBy: '',
      createdOn: '',
      updatedBy: '',
      updatedOn: '',
      isEnabled: true,
    };
  }

  setSupplier(v: any): SaveSupplier {

    return {
      id: v.id,
      tva: v.tva,
      photo: v.photo,


      lastName: v.lastName,
      firstName: v.firstName,
      mail: v.mail,
      password: v.password,
      roles: v.roles.map(x => x.id),

      contact: {
        company: v.contact.company,
        address1: v.contact.address1,
        address2: v.contact.address2,
        city: v.contact.city,
        zipCode: v.contact.zipCode,
        country: v.contact.country,
        fax: v.contact.fax,
        phone: v.contact.phone,
      },
      agentId: v.agentId,
      isConfirmedAccount: v.isConfirmedAccount,
      createdBy: v.createdBy,
      createdOn: v.createdOn,
      updatedBy: v.updatedBy,
      updatedOn: v.updatedOn,
      isEnabled: v.isEnabled,
    };
  }

  setAgent(v: any): SaveAgent {

    return {
      id: v.id,

      lastName: v.lastName,
      firstName: v.firstName,
      mail: v.mail,
      password: v.password,
      roles: v.roles.map(x => x.id),
      // roles: ['AGENTS'],

      contact: {
        company: v.contact.company,
        address1: v.contact.address1,
        address2: v.contact.address2,
        city: v.contact.city,
        zipCode: v.contact.zipCode,
        country: v.contact.country,
        fax: v.contact.fax,
        phone: v.contact.phone,
      },
      createdBy: v.createdBy,
      createdOn: v.createdOn,
      updatedBy: v.updatedBy,
      updatedOn: v.updatedOn,
      isEnabled: v.isEnabled,
    };
  }

  setPerson(v: any): SavePerson {

    return {
      id: v.id,

      lastName: v.lastName,
      firstName: v.firstName,
      mail: v.mail,
      password: v.password,
      roles:  v.roles.map(x => x.id),

      contact: {
        company: v.contact.company,
        address1: v.contact.address1,
        address2: v.contact.address2,
        city: v.contact.city,
        zipCode: v.contact.zipCode,
        country: v.contact.country,
        fax: v.contact.fax,
        phone: v.contact.phone,
      },
      createdBy: v.createdBy,
      createdOn: v.createdOn,
      updatedBy: v.updatedBy,
      updatedOn: v.updatedOn,
      isEnabled: v.isEnabled,
    };
  }

  setNewAgent(roles: string[]): SaveAgent {

    return {
      id: 0,
      lastName: '',
      firstName: '',
      mail: '',
      password: '',
      contact: {
        company: '',
        address1: '',
        address2: '',
        city: '',
        zipCode: '',
        country: null,
        fax: '',
        phone: '',
      },
      roles: roles,
      createdBy: '',
      createdOn: '',
      updatedBy: '',
      updatedOn: '',
      isEnabled: true,
    };
  }

  setGoodSave(g: SidjGood): SaveSidjGood {
    return {
      id: g.id,
      reference: g.reference,
      name: g.name,
      gencod: g.gencod,
      customsReference: g.customsReference,
      description: g.description,
      currency: g.currency,
      dateOfValidity: g.dateOfValidity,
      isExclusivityJc: g.isExclusivityJc,
      isSpecialBoxJc: g.isSpecialBoxJc,
      availabilityProduct: g.availabilityProduct,
      outerColisage: g.outerColisage,
      innerColisage: g.innerColisage,
      productDimension: g.productDimension,
      boxDimension: g.boxDimension,
      colors: g.colors,
      models: g.models,
      packagingLanguage: g.packagingLanguage,
      manualLanguage: g.manualLanguage,
      productLanguage: g.productLanguage,
      age: g.age,
      ageType: g.ageType,
      productNetWeight: g.productNetWeight,
      productGrossWeight: g.productGrossWeight,
      deeeContribution: g.deeeContribution,
      isChargerIncluded: g.isChargerIncluded,
      chargerType: g.chargerType,
      engineType: g.engineType,
      continent: g.continent,
      vatRate: g.vatRate,
      isExclusivitySpecialist: g.isExclusivitySpecialist,
      gender: g.gencod,
      shipmentTime: g.shipmentTime,
      comments: g.comments,
      countryCode: g.countryCode,
      goodAccus: g.goodAccus,
      goodBatteries: g.goodBatteries,
      unknownAccu: g.unknownAccu,
      unknownBattery: g.unknownBattery,
      supplierId: g.supplierId,
      fobGrossPrice: g.fobGrossPrice,
      fobNetPrice: g.fobNetPrice,
      ddpGrossPrice: g.ddpGrossPrice,
      ddpNetPrice: g.ddpNetPrice,
      exWorksGrossPrice: g.exWorksGrossPrice,
      exWorksNetPrice: g.exWorksNetPrice,
      paymentTerms: g.paymentTerms,
      departurePlace: g.departurePlace,
      minimumQuantity: g.minimumQuantity,
      itemsQuantity20: g.itemsQuantity20,
      itemsQuantity40: g.itemsQuantity40,
      outCartonCbm: g.outCartonCbm,
      colisageGrossWeight: g.colisageGrossWeight,
      colisageNetWeight: g.colisageNetWeight,
      outerCartonDimension: g.outerCartonDimension,
      functionTryMe: g.functionTryMe,
      picture: g.picture,
      imageFrom: g.imageFrom,
      updatedOn: g.updatedOn,
      createdOn: g.createdOn,
      createdBy: g.createdBy,
      isEnabled: g.isEnabled,
      updatedBy: g.updatedBy,
    }
  }

  setProductValue(value: SidjGood, isFrench: boolean) {
   const gender =  this.genderService.getCurrentGenders();
   console.log('setProductValue', gender);
    return {
      id: value.id,
      supplierId: value.supplierId,
      reference: value.reference,
      name: value.name,
      gencod: value.gencod,
      customsReference: value.customsReference,
      description: value.description,
      currency: value.currency,
      fobGrossPrice: value.fobGrossPrice,
      fobNetPrice: value.fobNetPrice,
      ddpGrossPrice: value.ddpGrossPrice,
      ddpNetPrice: value.ddpNetPrice,
      exWorksGrossPrice: value.exWorksGrossPrice,
      exWorksNetPrice: value.exWorksNetPrice,
      paymentTerms: value.paymentTerms,
      dateOfValidity: (value.dateOfValidity !== '0001-01-01')
        ? value.dateOfValidity.toString().substring(0, 10) : null,
      departurePlace: value.departurePlace,
      isExclusivityJc: value.isExclusivityJc,
      isSpecialBoxJc: value.isSpecialBoxJc,
      availabilityProduct: value.availabilityProduct.toString().substring(0, 10),
      minimumQuantity: value.minimumQuantity,
      innerColisage: (value.innerColisage) ? value.innerColisage : 0,
      outerColisage: (value.outerColisage) ? value.outerColisage : 0,
      itemsQuantity20: (value.itemsQuantity20) ? value.itemsQuantity20 : 0,
      itemsQuantity40: (value.itemsQuantity40) ? value.itemsQuantity40 : 0,
      outCartonCbm: value.outCartonCbm,
      colisageGrossWeight: (value.colisageGrossWeight) ? value.colisageGrossWeight : 0,
      colisageNetWeight: (value.colisageNetWeight) ? value.colisageNetWeight : 0,
      outerCartonDimension: value.outerCartonDimension,
      productDimension: value.productDimension,
      boxDimension: value.boxDimension,
      colors: value.colors,
      models: value.models,
      age: value.age,
      ageType: value.ageType,
      productNetWeight: value.productNetWeight,
      productGrossWeight: value.productGrossWeight,
      deeeContribution: value.deeeContribution,
      functionTryMe: value.functionTryMe,
      isChargerIncluded: value.isChargerIncluded,
      chargerType: value.chargerType,
      engineType: value.engineType,
      imageFrom: value.imageFrom,
      picture: value.picture,
      shipmentTime: value.shipmentTime,
      comments: value.comments,
      goodAccus: value.goodAccus,
      goodBatteries: value.goodBatteries,
      unknownAccu: value.unknownAccu,
      unknownBattery: value.unknownBattery,
      createdOn: value.createdOn.toString().substring(0, 10),
      updatedOn: value.updatedOn.toString().substring(0, 10),

      countryCode:
        (value.countryCode) ?
          (isFrench) ?
            this.countriesService.getCurrentCountries()
              .find(x => x.countryCode.toLowerCase() === value.countryCode.toLowerCase()).countryNameFr
            : this.countriesService.getCurrentCountries()
              .find(x => x.countryCode.toLowerCase() === value.countryCode.toLowerCase()).countryNameEn
          : '',

      packagingLanguage:
        (value.packagingLanguage) ?
          (isFrench) ?
            this.languageService.getCurrentLanguages()
              .find(x => x.name.toLowerCase() === value.packagingLanguage.toLowerCase()).frenchName
            : this.languageService.getCurrentLanguages()
              .find(x => x.name.toLowerCase() === value.packagingLanguage.toLowerCase()).name
          : '',

      manualLanguage:
        (value.manualLanguage) ?
          (isFrench) ?
            this.languageService.getCurrentLanguages()
              .find(x => x.name.toLowerCase() === value.manualLanguage.toLowerCase()).frenchName
            : this.languageService.getCurrentLanguages()
              .find(x => x.name.toLowerCase() === value.manualLanguage.toLowerCase()).name
          : '',


      productLanguage:
        (value.productLanguage) ?
          (isFrench) ?
            (value.productLanguage.toLowerCase() === 'english') ? 'Anglais' : 'Français'
            : (value.productLanguage.toLowerCase() === 'english') ? 'English' : 'French'
          : '',

      gender:
        (value.gender) ?
          (isFrench) ?
            gender.find(x => x.name === value.gender).frenchName
            : gender.find(x => x.name === value.gender).name
          : '',

      continent: value.continent,
      vatRate: value.vatRate,
      isExclusivitySpecialist: value.isExclusivitySpecialist,
      createdBy: value.createdBy,
      updatedBy: value.updatedBy,
      isEnabled: value.isEnabled,
    };
  }
}
