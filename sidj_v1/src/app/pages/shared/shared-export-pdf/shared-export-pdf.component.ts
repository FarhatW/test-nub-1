import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GoodService} from '../../../@core/data/services/good.service';
import {SaveSidjGood} from '../../../@core/data/models/goods/sidjGood/saveSidjGood';
import {LanguageService} from '../../../@core/data/services/language.service';
import {GenderService} from '../../../@core/data/services/gender.service';
import {BatteryService} from '../../../@core/data/services/battery.service';
import {CountryService} from '../../../@core/data/services/country.service';
import {AccuService} from '../../../@core/data/services/accus.service';
import {PDFExportComponent} from '@progress/kendo-angular-pdf-export';
import {Page} from '../../../@core/data/models/shared/page';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../@core/data/services/user.service';
import {MappingUserService} from '../../../@core/data/services/mapping-user.service';

@Component({
  selector: 'ngx-shared-export-pdf',
  templateUrl: './shared-export-pdf.component.html',
  styleUrls: ['./shared-export-pdf.component.scss'],
})
export class SharedExportPdfComponent implements OnInit {
  @Input() isFrench: boolean;
  @ViewChild('pdf') pdf: PDFExportComponent;
  allProducts: SaveSidjGood[] = [];
  productForPdf: SaveSidjGood;
  allProductsForPdf: SaveSidjGood[] = [];
  page = new Page();
  isSortAscending: boolean = true;
  sortBy: string = 'id';
  goodsId: string = '';
  query: any = {
    supplierId: '',
    pageSize: 0,
    page: 0,
    isSortAscending: this.isSortAscending,
    sortBy: this.sortBy,
    goodsId: this.goodsId,
  };

  constructor(private goodService:  GoodService,
              private countriesService: CountryService,
              private genderService: GenderService,
              private batteryService: BatteryService,
              private accuService: AccuService,
              private languageService: LanguageService,
              private route: ActivatedRoute,
              private userService: UserService,
              private mappingUserService: MappingUserService,
              ) {
    route.params.subscribe(p => this.query.supplierId = +p['id'] || '');

  }

  ngOnInit() {
  }

  _goodsTreatmentForPdf(products) {
    products.forEach(value => {
      this.productForPdf = this.mappingUserService.setProductValue(value, this.isFrench);
      this.allProductsForPdf.push(this.productForPdf);
    });
  }

  _treatmentForPdf(arrId: number[]) {
    arrId.forEach(item => {
      this.query.goodsId += item + ',';
    });
    this.goodService.getAll(this.query).subscribe(pagedData => {
      this.allProducts = pagedData.items;
      this._goodsTreatmentForPdf(this.allProducts);
    });
  }

  downloadPdf(arrId: number[]) {
    this._treatmentForPdf(arrId);
    setTimeout(() => this.pdf.saveAs('SidjGood(s).pdf'), 2000);
    this.allProducts = [];
    this.allProductsForPdf = [];
    this.query.goodsId = '';
  }
}
