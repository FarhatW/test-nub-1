import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Good} from '../../../@core/data/models/goods/good';
import {Page} from '../../../@core/data/models/shared/page';
import {MappingUserService} from '../../../@core/data/services/mapping-user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../@core/data/services/notification.service';
import {ToasterService} from 'angular2-toaster';
import {GoodService} from '../../../@core/data/services/good.service';
import {SidjGood} from '../../../@core/data/models/goods/sidjGood/sidjGood';
import {TranslationService} from '../../../@core/data/services/translation.service';
import {Subscription} from 'rxjs/Subscription';
import {LocalStorageService} from 'angular-2-local-storage';
import {HelperService} from '../../../@core/utils/Helper.service';
import {CountryService} from '../../../@core/data/services/country.service';
import {GenderService} from '../../../@core/data/services/gender.service';
import {BatteryService} from '../../../@core/data/services/battery.service';
import {AccuService} from '../../../@core/data/services/accus.service';
import {LanguageService} from '../../../@core/data/services/language.service';
import {SharedExportPdfComponent} from "../shared-export-pdf/shared-export-pdf.component";
import {Supplier} from "../../../@core/data/models/users/suppliers/supplier";
import {ActiveSuppliersModalComponent} from "../../suppliers/active-suppliers-modal/active-suppliers-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GoodViewPdfModalComponent} from "../../goods/good-view-pdf-modal/good-view-pdf-modal.component";

@Component({
  selector: 'ngx-shared-product-list',
  templateUrl: './shared-product-list.component.html',
  styleUrls: ['./shared-product-list.component.scss'],
})
export class SharedProductListComponent implements OnInit {
  @ViewChild('goodTable') goodTable: DatatableComponent;
  @Input() goodInput: Good[];
  @ViewChild('pdfcompo') pdfcompo: SharedExportPdfComponent;
  isSortAscending: boolean = true;
  sortBy: string = 'id';
  rows: Good[] = [];
  good: Good;
  page = new Page();
  search: string;
  selectedRow = [];
  selected;
  queryAccusBatteries: {
    pageSize: 0,
  };

  query: any = {
    supplierId: '',
    pageSize: this.page.size,
    page: this.page.pageNumber,
    isSortAscending: this.isSortAscending,
    sortBy: this.sortBy,
  };
  pageSize: number;
  arrayId: number[] = [];

  languageSub: Subscription;
  isFrench: boolean;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private mappingUserService: MappingUserService,
              private translationService: TranslationService,
              private goodService:  GoodService,
              private notificationService: NotificationService,
              private localStorageService: LocalStorageService,
              private helperService: HelperService,
              private countriesService: CountryService,
              private genderService: GenderService,
              private batteryService: BatteryService,
              private accuService: AccuService,
              private languageService: LanguageService,
              private toasterService: ToasterService,
              private  modalService: NgbModal
              ) {

    route.params.subscribe(p => this.query.supplierId = +p['id'] || '');
    // route.params.subscribe(p => this.query.supplierId = +p['id'] || '');
    this.languageSub = this.translationService.getLanguage().subscribe(x => this.isFrench = x);
  }
  showAddModal(good: SidjGood) {
    this.goodService.setCurrentGoods(good);
    const activeModal = this.modalService.open(GoodViewPdfModalComponent, {size: 'lg', container: ''});
    activeModal.result.then(result => {
      console.log(result);
    });
    activeModal.componentInstance.modalHeader = 'Activer ce compte';
  }
  singleSelectCheck(row: any) {
    this.good = row;
    return this.selected.indexOf(row) === -1;
  }

  onDeselect(event, good: SidjGood) {
    good.isEnabled = event.returnValue;
    const goodSave =  this.mappingUserService.setGoodSave(good);

    this.goodService.update(goodSave)
          .subscribe(res => {
            },
            err => {
              const title = 'Une erreur est survenue';
              this.toasterService.popAsync(this.notificationService.showErrorToast(title, err.body));
            },
        () => {
          const title = 'Modification effectuée';
          const body = 'Le produit ' + goodSave.id + ' a bien été ' +
            (event.returnValue ? 'activé' : 'désactivé');
          this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
        },
      );
  }

  ngOnInit() {
    this.setPage({offset: 0, pageSize: 10});
    this.goodTable.messages.emptyMessage = 'Aucun produit';
    this.goodTable.messages.selectedMessage = 'produit sélectionné';
    this.goodTable.messages.totalMessage = 'total items';

    this.countriesService.getAll().subscribe(country => {
      this.countriesService.setCurrentCountries(country.items);
    });

    this.genderService.getAll().subscribe(gender => {
      console.log('get gender', gender);
      this.genderService.setCurrentGenders(gender);
    });

    this.batteryService.getAll(this.queryAccusBatteries).subscribe(battery => {
      this.batteryService.setCurrentBatteries(battery.items);
    });

    this.accuService.getAll(this.queryAccusBatteries).subscribe(accu => {
      this.accuService.setCurrentAccu(accu.items);
    });

    this.languageService.getAll().subscribe(language => {
      this.languageService.setCurrentLanguages(language);
    });
  }

  setPage(pageInfo) {
    this.query.page = pageInfo.offset + 1;
    this.query.pageSize = this.page.size;

    this.goodService.getAll(this.query).subscribe(pagedData => {
      this.rows = pagedData.items;
      this.page.totalElements = pagedData.totalItems;
      this.goodTable.messages.totalMessage =
        (this.isFrench) ? (pagedData.totalItems > 1 ? 'produits' : 'produit') + ' au total' :
          'total ' + (pagedData.totalItems > 1 ? 'items' : 'item');
      this.page.pageNumber = 0;
    },
      error => {
      console.log('error', error);
      this.handleGettingRowsError(error)
      });
  }

  handleGettingRowsError(err) {
    this.toasterService.popAsync(this.notificationService.showErrorToast(
      err.statusText, this.isFrench ? err.error.messageData.fr : err.error.messageData.eng));

  }

  onSort(event) {
    const sort = event.sorts[0];
    this.query.isSortAscending = sort.dir === 'asc' ? true : false;
    this.query.sortBy = sort.prop;
    this.getRows(this.query);
  }

  getRows(query) {
    this.goodService.getAll(this.query).subscribe(pagedData => {
      // this.rows = [];
      this.rows = pagedData.items;
      this.page.totalElements = pagedData.totalItems;
      this.page.pageNumber = query.page - 1;
    });
  }

  showDeleteModal(goodsId) {

    if (confirm(this.isFrench ? 'Êtes vous sûrs ?' : 'Are you sure?')) {
      this.goodService.delete(goodsId).subscribe(x => {
        this.getRows(this.query);
        this.router.navigate(['/dashboard'])
      });
    }
  }

  // onSelect(event, saveSidjGood) {
  //   !this.tabReference.find(x => x === saveSidjGood.id) ?
  //     this.tabReference.push(saveSidjGood.id) : this.tabReference.splice(this.tabReference.indexOf(saveSidjGood.id), 1);
  //   console.log(this.tabReference);
  // }

  addProductsToArr(event, good) {
    !this.arrayId.find(x => x === good.id) ?
      this.arrayId.push(good.id) : this.arrayId.splice(this.arrayId.indexOf(good.id), 1);
  }

  addProductToArr(id: number) {
    this.arrayId = [];
    this.arrayId.push(id);
    this.downloadPdf()
  }

  allProducts() {
    this.arrayId = [];
    this.downloadPdf()
  }

  downloadPdf() {
    this.pdfcompo.downloadPdf(this.arrayId);
    this.arrayId = [];
  }
}
