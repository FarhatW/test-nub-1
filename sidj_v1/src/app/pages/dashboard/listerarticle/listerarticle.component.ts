import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as JsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HelperService} from '../../../@core/utils/Helper.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {TranslateService} from '@ngx-translate/core';
import {GoodService} from '../../../@core/data/services/good.service';
import {Page} from '../../../@core/data/models/shared/page';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {TranslationService} from '../../../@core/data/services/translation.service';
import {CountryService} from '../../../@core/data/services/country.service';
import {UserService} from '../../../@core/data/services/user.service';
import {Supplier} from '../../../@core/data/models/users/suppliers/supplier';
import {FilesService} from '../../../@core/data/services/files.service';
import {BatteryService} from '../../../@core/data/services/battery.service';
import {AccuService} from '../../../@core/data/services/accus.service';
import {GenderService} from '../../../@core/data/services/gender.service';
import {LanguageService} from '../../../@core/data/services/language.service';
import {environment} from "../../../../environments/environment";
import {ToasterService} from "angular2-toaster";
import {NotificationService} from "../../../@core/data/services/notification.service";
import {EnumTranslation} from "../../../@core/data/models/enums/enumTranslation";
import {Battery} from "../../../@core/data/models/batteries/battery";
import {Accu} from "../../../@core/data/models/accus/accu";
import {Good} from "../../../@core/data/models/goods/good";
import {v} from "@angular/core/src/render3";
import {User} from "../../../@core/data/models/users/user";
import {SidjGood} from "../../../@core/data/models/goods/sidjGood/sidjGood";

@Component({
  selector: 'ngx-listerarticle',
  templateUrl: './listerarticle.component.html',
  styleUrls: ['./listerarticle.component.scss'],
})
export class ListerarticleComponent implements OnInit {

  user: any;
  filter: any;
  countries: any;
  goodLanguage: EnumTranslation[];
  rowsLength: number;
  counter: number = 1;
  options = [10, 20, 50];
  optionSelected: any = 10;
  countryCount: number = 0;
  accus: Accu[];
  accusCount: number = 0;
  batteries: Battery[];
  batteryCount: number = 0;
  urlPhoto: string;


  countryColumns: any[] = [
    {
      title: 'COUNTRY CODE',
      dataKey: 'countryCode',
    },
    {
      title: 'COUNTRY NAME',
      dataKey: 'countryNameEn',
    },
    {
      title: 'CONTINENT',
      dataKey: 'continentCode',
    },
  ];

  batteryColumns: any[] = [
    {title: 'ID', dataKey: 'id'},
    {title: 'REF', dataKey: 'ref'},
  ];

  accusColumns: any[] = [
    {title: 'ID', dataKey: 'id'},
    {title: 'REF', dataKey: 'ref'},
  ];

  @ViewChild('goodTable') goodsTable: DatatableComponent;
  @ViewChild('rorow') rorow: ElementRef;
  goodSexe: EnumTranslation[];
  isFrench: boolean = false;
  goods: SidjGood[] = [];
  selected;
  isSortAscending: boolean = true;
  page = new Page();
  sortBy: string = 'id';
  id: number;
  supplier: User;
  query: any = {
    pageSize: this.page.size,
    page: this.page.pageNumber,
    isSortAscending: this.isSortAscending,
    sortBy: this.sortBy,
    supplierId: this.id,
  };
  queryforPdf: any = {
    pageSize: this.page.size,
    page: this.page.pageNumber,
    isSortAscending: this.isSortAscending,
    sortBy: this.sortBy,
    supplierId: this.id,
  };
  rows: SidjGood[] = [];
  rowsForPdf: SidjGood[] = [];
  goodsToPdf: SidjGood[] = [];
  choiceRows: SidjGood[] = [];
  rowsTransformToPdf: SidjGood[] = [];
  rowTransformToPdf: SidjGood;
  columns: any [] = [
    {title: 'id', key: 'id', isSortable: true},
    {title: 'Numéro de larticle', key: 'GoodNumber', isSortable: true},
    {title: 'Gencod', key: 'Gencod', isSortable: true},
    {title: 'Nom du produit', key: 'ProductName', isSortable: true},
    {title: 'Date de mise à jour', key: 'updatedOn', isSortable: true},
    {title: ''},
  ];

  isAdmin: false;
  queryAccusBatteries: {
    pageSize: 0,
  };

  constructor(private service: SmartTableService,
              private router: Router,
              public translate: TranslateService,
              public goodService: GoodService,
              private localStorageService: LocalStorageService,
              private helperService: HelperService,
              private cookieService: CookieService,
              private translationService: TranslationService,
              private route: ActivatedRoute,
              private countriesService: CountryService,
              private batteryService: BatteryService,
              private accusService: AccuService,
              private supplierService: UserService,
              private filesService: FilesService,
              private toasterService: ToasterService,
              private notificationService: NotificationService,
              private sexeService: GenderService,
              private goodLanguageService: LanguageService) {

    this.translationService.getLanguage().subscribe(language => {
      if (language === undefined) {
        language = this.cookieService.get('Langue') === 'fr';
      }
      this.isFrench = language
    });
    const token = String(this.localStorageService.get('Token'));
    const user = this.helperService.getDecodedAccessToken(token);
    this.user = user;
    this.route.data.subscribe(x => {
      this.isAdmin = x.isAdmin;
    });
    this.page.size = 10;
    this.query.pageSize = 10;
    this.query.page = 0;
    this.page.totalElements = 0;
    this.page.pageNumber = 0;
    this.page.totalPages = 0;
    this.query.supplierId = this.user.nameid;
    route.params.subscribe(p => {
      this.id = +p['id'] || 0
    });
    this.setPage({offset: 0, pageSize: 10});
    this.setPageForPdf();
    this.urlPhoto = environment.apiPicture
  }

  ngOnInit() {
    this.id ? this.query.supplierId = this.id : null;
    this.goodsTable.messages.emptyMessage = (this.isFrench ? 'Liste des produits du fournisseur' : 'List of products');
    this.goodsTable.messages.selectedMessage = 'produits sélectionné';
    this.goodsTable.messages.totalMessage = (this.isFrench ? 'produit(s) au total' : 'total item(s)');

    if (this.id === 0) {
      this.supplierService.getUser(this.user.nameid).subscribe(s => {
        this.supplier = s;
      });
    } else {
      this.supplierService.getUser(this.id).subscribe(s => {
        this.supplier = s;
      });
    }
    this.countriesService.getAll().subscribe(c => {
      this.countries = c.items;
    });

    this.sexeService.getAll().subscribe(sex => {
      this.goodSexe = sex;
    });

    this.batteryService.getAll(this.queryAccusBatteries).subscribe(b => {
      this.batteries = b.items;
      this.batteryService.setCurrentBatteries(this.batteries);
    });

    this.accusService.getAll(this.queryAccusBatteries).subscribe(ac => {
      this.accus = ac.items;
      this.accusService.setCurrentAccu(this.accus);
    });

    this.goodLanguageService.getAll().subscribe(language => {
      this.goodLanguage = language;
    });

    this.setPageForPdf();

  }

  setPage(pageInfo) {
    this.query.page = pageInfo.offset + 1;
    this.query.pageSize = this.page.size;
    this.query.UserId = this.user.nameid;
    this.query.supplierId = this.id;
    this.goodService.getAll(this.query).subscribe(pagedData => {
      this.rows = pagedData.items;
      this.page.totalElements = pagedData.totalItems;
      this.page.pageNumber = 0;
    });
  }

  setPageForPdf() {
    this.queryforPdf.page = 0;
    this.queryforPdf.pageSize = 0;
    this.query.UserId = this.user.nameid;
    this.query.supplierId = this.id;
    this.goodService.getAll(this.queryforPdf).subscribe(pagedData => {
      console.log('rowsForPdf', pagedData);
      this.rowsForPdf = pagedData.items;
      this.getAllProductToPdf(false)
    });
  }

  setProductValue(value: SidjGood) {

    this.rowTransformToPdf = {
      id: value.id,
      supplierId: value.supplierId,
      reference: value.reference,
      name: value.name,
      gencod: value.gencod,
      customsReference: value.customsReference,
      countryCode: this.countries.find(x => x.countryCode.toLowerCase()
        === value.countryCode.toLowerCase()).countryNameEn,
      continent: this.countries.find(x => x.countryCode.toLowerCase() === value.countryCode.toLowerCase()).continent,
      description: value.description,
      currency: value.currency,
      fobGrossPrice: value.fobGrossPrice,
      fobNetPrice: value.fobNetPrice,
      ddpGrossPrice: value.ddpGrossPrice,
      ddpNetPrice: value.ddpNetPrice,
      exWorksGrossPrice: value.exWorksGrossPrice,
      exWorksNetPrice: value.exWorksNetPrice,
      ageType: value.age.toString(),
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
      colisageGrossWeight: value.colisageGrossWeight,
      colisageNetWeight: value.colisageNetWeight,
      outerCartonDimension: value.outerCartonDimension,
      productDimension: value.productDimension,
      boxDimension: value.boxDimension,
      colors: value.colors,
      models: value.colors,
      packagingLanguage: (value.packagingLanguage) ?
        this.goodLanguage.find(x => x.name.toLowerCase() === value.packagingLanguage.toLowerCase()).name : '',
      // packagingLanguage: (value.packagingLanguage) ?
      //   this.goodLanguage.find(x => x.name.toLowerCase() === value.packagingLanguage.toLowerCase()).frenchName : '',
      manualLanguage: (value.manualLanguage) ?
        this.goodLanguage.find(x => x.name.toLowerCase() === value.manualLanguage.toLowerCase()).name : '',
      // manualLanguage: (value.manualLanguage) ?
      //   this.goodLanguage.find(x => x.name.toLowerCase() === value.manualLanguage.toLowerCase()).frenchName : '',
      productLanguage: (value.productLanguage)
        ? (value.productLanguage.toLowerCase() === 'english') ? 'English' : 'French' : '',
      // productLanguageFr: (value.productLanguage)
      //   ? (value.productLanguage.toLowerCase() === 'english') ? 'Anglais' : 'Français' : '',
      age: value.age >= 12 ? value.age / 12 : value.age,
      // isYear: value.age >= 12,
      productNetWeight: value.productNetWeight,
      productGrossWeight: value.productGrossWeight,
      deeeContribution: value.deeeContribution,
      functionTryMe: value.functionTryMe,
      isChargerIncluded: value.isChargerIncluded,
      chargerType: value.chargerType,
      engineType: value.engineType,
      imageFrom: value.imageFrom,
      picture: value.picture,
      // productSexeEn: (value.gender) ?
      //   this.goodSexe.find(x => x.name === value.gender).name : '',
      gender: (value.gender) ?
        this.goodSexe.find(x => x.name === value.gender).frenchName : '',
      shipmentTime: value.shipmentTime,
      comments: value.comments,
      goodAccus: value.goodAccus,
      goodBatteries: value.goodBatteries,
      unknownAccu: value.unknownAccu,
      unknownBattery: value.unknownBattery,
      vatRate: value.vatRate,
      isExclusivitySpecialist : value.isExclusivitySpecialist,

      createdBy: value.createdBy,
      createdOn: value.createdOn,
      updatedBy: value.updatedBy,
      updatedOn: value.updatedOn,
      isEnabled: value.isEnabled

    };
    // if (value.picture) {
    //   this.filesService.getImageJPG(value.picture, this.user.nameid)
    //     .subscribe(data => {
    //       let reader = new FileReader();
    //       reader.addEventListener('load', () => {
    //         this.rowTransformToPdf.picture = reader.result;
    //     }, false);
    //
    //       if (data) {
    //         reader.readAsDataURL(data);
    //       }
    //     }, err => {
    //       this.rowTransformToPdf.picture = 'assets/images/img-placeholder.jpg';
    //     });
    // } else {
    //   this.rowTransformToPdf.picture = 'assets/images/img-placeholder.jpg';
    // }
  }


  _goodsTreatmentForPdf() {
    console.log('_goodsTreatmentForPdf', this.rowsForPdf)
    this.rowsForPdf.forEach(value => {
      this.setProductValue(value);
      this.rowsTransformToPdf.push(this.rowTransformToPdf);
    });
  }

  getRows(query) {
    this.goodService.getAll(this.query).subscribe(pagedData => {
      this.rows = pagedData.items;
      this.page.totalElements = pagedData.totalItems;
      this.page.pageNumber = query.page - 1;
    });
  }

  onOptionsSelected(event) {
    this.page.size = event;
    this.query.pageSize = event;
    this.query.page = 1;
    this.goodsTable.offset = 0;
    this.getRows(this.query);
  }

  onSort(event) {
    const sort = event.sorts[0];
    this.query.isSortAscending = sort.dir === 'asc';
    this.query.sortBy = sort.prop;
    this.getRows(this.query);
  }

  onSelect(event, good) {

   !this.goodsToPdf.find(x => x.id === good.id) ?
       this.goodsToPdf.push(good as SidjGood) : this.goodsToPdf.splice(this.goodsToPdf.indexOf(good), 1);
  }

  showDeleteModal(goodsId) {

    if (confirm(this.isFrench ? 'Êtes vous sûrs ?' : 'Are you sure?')) {
      this.goodService.delete(goodsId).subscribe(x => {
        this.getRows(this.query);
        this.router.navigate(['/dashboard'])
      });
    }
  }

  getAllProductToPdf(selected: boolean) {

    if (selected && this.goodsToPdf.length <= 0) {
      const title = this.isFrench ? 'Sélection Indéfinie' : 'Undefined Product Selection';
      const body = this.isFrench ? 'Veuillez sélectionnez des produits dans la liste pour continuer.'
        : 'Please select products you want to download as PDF to continue.'
      this.toasterService.popAsync(this.notificationService.showWarningToast(title, body));

      throw new Error('no selection');
    }

    this._goodsTreatmentForPdf();

    console.log('getAllProductToPdf', this.rowsTransformToPdf);
   // setTimeout(() => this._downloadTreatmentMultiPdf(selected), 4000);
    //setTimeout(() => this.rowsTransformToPdf = [], 4100);
  }

  _downloadTreatmentMultiPdf(selected: boolean) {

    this.counter = 1;
    const pdfs = new JsPDF();
    this.choiceRows = selected ? this.goodsToPdf : this.rowsTransformToPdf;
    this.rowsLength = this.choiceRows.length;
    this.choiceRows.forEach(item => {
      const allProducts = <HTMLScriptElement>document.getElementsByClassName(item.reference)[0];
      html2canvas(allProducts, {
        useCORS: true,
      }).then((canvas: any) => {
        pdfs.addPage(210, allProducts);
        pdfs.addImage(canvas.toDataURL('image/jpeg'),
          'JPEG', 0, 10, pdfs.internal.pageSize.width, allProducts.offsetHeight / 6);
        if (this.rowsLength === this.counter) {
          pdfs.save(`AllProducts.pdf`);
        }
        this.counter = this.counter + 1;
      });
    });
    setTimeout(function () {
      pdfs.deletePage(1);
    }, 500);
  }

  getProductToPdf(idProduct) {

    this.setProductValue(this.rowsForPdf.filter(x => x.reference === idProduct)[0]);
    this.rowsTransformToPdf.push(this.rowTransformToPdf);
    // this._goodsTreatmentForPdf();
    setTimeout(() => this._downloadTreatmentPdf(idProduct), 2000);
    setTimeout(() => this.rowsTransformToPdf = [], 2100);
  }

  _downloadTreatmentPdf(idProduct) {
    const pdf = new JsPDF();
    const product = <HTMLScriptElement>document.getElementsByClassName(idProduct)[0];
    html2canvas(product, {
      useCORS: true,
    }).then((canvas: any) => {
      pdf.addImage(canvas.toDataURL('image/jpeg'),
        'JPEG', 0, 10, pdf.internal.pageSize.width, product.offsetHeight / 6);
      pdf.save(`Product-${idProduct}.pdf`);
    });
  }

  toPDF(columns: any[], rows: any[], count: number, categoryName: string, isFrench) {
    let doc = new JsPDF('p', 'pt');

    doc.autoTable(columns, rows, {
      theme: 'grid',
      columnStyles: {
        id: {fillColor: 255},
      },
      margin: {top: 60},
      pageBreak: 'auto',
      showHeader: 'firstPage',

      addPageContent: function (data) {
        doc.text(isFrench ? 'Liste de ' + categoryName : categoryName + ' list', 40, 30);
      },
    });

    const fileName = categoryName + '_' + new Date().toDateString() + '.pdf';
    doc.save(fileName);
  }

  update(goodsId) {
    this.router.navigate(['/goods/form-edit/' + goodsId])
  }

  goToSupplierList() {
    this.router.navigate(['/suppliers/list/'])
  }
}
