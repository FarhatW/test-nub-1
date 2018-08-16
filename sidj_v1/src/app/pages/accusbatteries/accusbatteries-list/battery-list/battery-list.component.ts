import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {BatteryService} from '../../../../@core/data/services/battery.service';
import {Page} from '../../../../@core/data/models/shared/page';
import {CookieService} from 'ngx-cookie-service';
import {TranslationService} from '../../../../@core/data/services/translation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NotificationService} from '../../../../@core/data/services/notification.service';
import {ToasterService} from 'angular2-toaster';
import {Battery} from '../../../../@core/data/models/batteries/battery';

@Component({
  selector: 'ngx-battery-list',
  templateUrl: './battery-list.component.html',
  styleUrls: ['./battery-list.component.scss']
})
export class BatteryListComponent implements OnInit, OnChanges {

  @ViewChild('batteryTable') batteryTable: DatatableComponent;
  @Input() pageSize: number = 10;
  @Output() batteryId: EventEmitter<number> = new EventEmitter<number>();

  isSortAscending: boolean = true;
  page = new Page();
  sortBy: string = 'id';
  isFrench: boolean = false;
  rows: Battery[] = [];


  query: any = {
    pageSize: this.pageSize,
    page: this.page.pageNumber,
    isSortAscending: this.isSortAscending,
    sortBy: this.sortBy,
  };

  constructor(private batteryService: BatteryService,
              private cookieService: CookieService,
              private translationService: TranslationService,
              private toasterService: ToasterService,
              private notificationService: NotificationService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
    this.translationService.getLanguage().subscribe(language => {
      if (language === undefined) {
        language = this.cookieService.get('Langue') === 'fr';
      }
      this.isFrench = language
    });

    // console.log('pageSoize', this.pageSize);

    this.page.size = this.pageSize;
    this.query.pageSize = this.pageSize;
    this.query.page = 0;
    this.page.totalElements = 0;
    this.page.pageNumber = 0;
    this.page.totalPages = 0;
  }

  ngOnInit() {
    this.setPage({offset: 0, pageSize: 10});
    this.batteryTable.messages.emptyMessage = this.isFrench ? 'Aucune Pile' : 'No batteries';
    this.batteryTable.messages.selectedMessage = 'article sélectionné';
    this.batteryTable.messages.totalMessage = this.isFrench ? 'articles au total' : 'total items';
  }
  setPage(pageInfo) {
    this.query.page = pageInfo.offset + 1;
    this.query.pageSize = this.page.size;
    // console.log('this.query', this.query)
    this.batteryService.getAll(this.query).subscribe(b => {
      this.rows = b.items;
      // console.log('b', b);
      // console.log('this.rows', this.rows);
      this.page.totalElements = b.totalItems;
      this.page.pageNumber = 0;
    });
  }
  getRows(queryPage) {
    this.batteryService.getAll(this.query).subscribe(b => {
      this.rows = b.items;
      this.page.totalElements = b.totalItems;
      this.page.pageNumber = queryPage.page - 1;
    });
  }

  onSelect(event) {
    // console.log('event', event.selected[0].id);
    this.batteryId.emit(event.selected[0].id);
  }

  onSort(event) {
    const sort = event.sorts[0];
    this.query.isSortAscending = sort.dir === 'asc' ? true : false;
    this.query.sortBy = sort.prop;
    this.getRows(this.query);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.query.page = 1;
    this.query.pageSize = this.pageSize;
    this.page.size = this.pageSize;
    this.getRows(this.query)
  }

  onDelete(battery) {
    this.batteryService.delete(battery.id).subscribe(x => {
        this.handleDeleteSuccess(x);
      },
      err => {
        this.handleDeleteError(err);
      } )
  }

  handleDeleteSuccess(data) {
    const title = 'Suppréssion réussi';
    const body = 'La batterie a bien été supprimée';
    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
    this.setPage({offset: 0, pageSize: 10});
    this.batteryTable.offset = 0;
    this.router.navigate(['/accusbatteries/list/']);

  }

  handleDeleteError(err) {
    const title = 'Erreur';
    const body = err.statusText;
    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));

  }


}
