import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TranslationService} from '../../../../@core/data/services/translation.service';
import {TranslateService} from '@ngx-translate/core';
import 'jspdf-autotable';


@Component({
  selector: 'ngx-good-excel-fields-to-pdf',
  templateUrl: './good-excel-fields-to-pdf.component.html',
  styleUrls: ['./good-excel-fields-to-pdf.component.scss']
})
export class GoodExcelFieldsToPdfComponent implements OnInit {

  query: any;
  isFrench: boolean;


  constructor(public translate: TranslateService,
              private translationService: TranslationService,
  ) {
    this.translationService.getLanguage().subscribe(x => this.isFrench = x);
  }

  ngOnInit() {
  }

}
