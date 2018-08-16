import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {TranslationService} from '../../../../@core/data/services/translation.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Page} from '../../../../@core/data/models/shared/page';
import {AccuService} from '../../../../@core/data/services/accus.service';
import {NotificationService} from '../../../../@core/data/services/notification.service';
import {ToasterService} from 'angular2-toaster';
import {Accu} from '../../../../@core/data/models/accus/accu';

@Component({
  selector: 'ngx-accus-list',
  templateUrl: './accus-list.component.html',
  styleUrls: ['./accus-list.component.scss'],
})
export class AccusListComponent implements OnInit, OnChanges {

  @ViewChild('batteryTable') accusTable: DatatableComponent;
  @Input() pageSize: number = 10;
  @Output() accusId: EventEmitter<number> = new EventEmitter<number>();

  isSortAscending: boolean = true;
  page = new Page();
  sortBy: string = 'id';
  isFrench: boolean = false;
  rows: Accu[] = [];

  query: any = {
    pageSize: this.page.size,
    page: this.page.pageNumber,
    isSortAscending: this.isSortAscending,
    sortBy: this.sortBy,
  };

  constructor(private accusService: AccuService,
              private cookieService: CookieService,
              private translationService: TranslationService,
              private toasterService: ToasterService,
              private notificationService: NotificationService,
              private router: Router,
  ) {
    this.translationService.getLanguage().subscribe(language => {
      if (language === undefined) {
        language = this.cookieService.get('Langue') === 'fr';
      }
      this.isFrench = language
    });

    this.page.size = this.pageSize;
    this.query.pageSize = this.pageSize;
    this.query.page = 0;
    this.page.totalElements = 0;
    this.page.pageNumber = 0;
    this.page.totalPages = 0;
  }

  ngOnInit() {
    this.setPage({offset: 0, pageSize: 10});
    this.accusTable.messages.emptyMessage = this.isFrench ? 'Aucune Pile' : 'No batteries';
    this.accusTable.messages.selectedMessage = 'article sélectionné';
    this.accusTable.messages.totalMessage = this.isFrench ? 'articles au total' : 'total items';
  }

  setPage(pageInfo) {
    this.query.page = pageInfo.offset + 1;
    this.query.pageSize = this.page.size;
    this.accusService.getAll(this.query).subscribe(b => {
      this.rows = b.items;
      this.page.totalElements = b.totalItems;
      this.page.pageNumber = 0;
    });
  }

  getRows(queryPage) {
    this.accusService.getAll(this.query).subscribe(b => {
      this.rows = b.items;
      this.page.totalElements = b.totalItems;
      this.page.pageNumber = queryPage.page - 1;
    });
  }

  onSort(event) {
    const sort = event.sorts[0];
    this.query.isSortAscending = sort.dir === 'asc';
    this.query.sortBy = sort.prop;
    this.getRows(this.query);
  }

  onSelect(event) {
    // console.log('event', event.selected[0].id);
    this.accusId.emit(event.selected[0].id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.query.page = 1;
    this.query.pageSize = this.pageSize;
    this.page.size = this.pageSize;
    this.getRows(this.query)
  }

  onDelete(accus) {
    this.accusService.delete(accus.id).subscribe(x => {
        // console.log('x', x);
        this.handleDeleteSuccess();
      },
      err => {
        this.handleDeleteError(err);
      })
  }

  handleDeleteSuccess() {
    const title = 'Suppréssion réussi';
    const body = 'La batterie a bien été supprimée';
    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
    this.setPage({offset: 0, pageSize: 10});
    this.accusTable.offset = 0;
    this.router.navigate(['/accusbatteries/list/']);
  }

  handleDeleteError(err) {
    const title = 'Erreur';
    const body = err.statusText;
    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));

  }


}
