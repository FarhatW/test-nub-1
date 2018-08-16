import { Component, OnInit } from '@angular/core';
import * as JsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {BatteryService} from "../../../@core/data/services/battery.service";
import {AccuService} from "../../../@core/data/services/accus.service";
import {Battery} from "../../../@core/data/models/batteries/battery";
import {Accu} from "../../../@core/data/models/accus/accu";
import {CountryService} from "../../../@core/data/services/country.service";
import {Subscription} from 'rxjs/Subscription';
import {TranslationService} from "../../../@core/data/services/translation.service";


@Component({
  selector: 'ngx-shared-buttons',
  templateUrl: './shared-buttons.component.html',
  styleUrls: ['./shared-buttons.component.scss']
})
export class SharedButtonsComponent implements OnInit {


  accus: Accu[];
  batteries: Battery[];
  countries: any;
  languageSub: Subscription;
  isFrench: boolean;


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

  constructor(private batteryService: BatteryService,
              private accuService: AccuService,
              private translationService: TranslationService,
              private countriesService: CountryService
  ) { }

  ngOnInit() {
    this.batteryService.getAll(null).subscribe(b => {
      this.batteries = b.items;
      this.batteryService.setCurrentBatteries(this.batteries);
    });

    this.accuService.getAll(null).subscribe(ac => {
      this.accus = ac.items;
      this.accuService.setCurrentAccu(this.accus);
    });

    this.countriesService.getAll().subscribe(c => {
      this.countries = c.items;
    });

    this.languageSub = this.translationService.getLanguage().subscribe(x => this.isFrench = x);
  }

  toPDF(columns: any[], rows: any[], categoryName: string, isFrench) {
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

}
