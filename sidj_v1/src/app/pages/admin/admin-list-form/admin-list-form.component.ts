import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Supplier} from "../../../@core/data/models/users/suppliers/supplier";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {Person} from "../../../@core/data/models/users/person/person";
import {Page} from "../../../@core/data/models/shared/page";
import {ActivatedRoute, Router} from "@angular/router";
import {HelperService} from "../../../@core/utils/Helper.service";
import {TranslationService} from "../../../@core/data/services/translation.service";
import {MappingUserService} from "../../../@core/data/services/mapping-user.service";
import {UserService} from "../../../@core/data/services/user.service";
import {ToasterService} from "angular2-toaster";
import {NotificationService} from "../../../@core/data/services/notification.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngx-admin-list-form',
  templateUrl: './admin-list-form.component.html',
  styleUrls: ['./admin-list-form.component.scss']
})
export class AdminListFormComponent implements OnInit {
  @ViewChild('adminTable') adminTable: DatatableComponent;
  @Input() adminInput: Person[];

  isSortAscending: boolean = true;
  sortBy: string = 'id';
  rows: Person[] = [];
  admin: Person;
  page = new Page();
  search: string;
  selectedRow = [];
  selected;

  isFrench: boolean;
  query: any = {
    pageSize: this.page.size,
    page: this.page.pageNumber,
    userType : 'person',
    isSortAscending: this.isSortAscending,
    sortBy: this.sortBy
  };
  constructor(private router: Router,
              private  modalService: NgbModal,
              private route: ActivatedRoute,
              private helperService: HelperService,
              private mappingUserService: MappingUserService,
              private userService:  UserService,
              private translationService: TranslationService,
              private notificationService: NotificationService,
              private toasterService: ToasterService) {
    this.page.size = 10;
    this.query.pageSize = 10;
    this.query.page = 0;
    this.page.totalElements = 0;
    this.page.pageNumber = 0;
    this.page.totalPages = 0;
    route.params.subscribe(p => this.query.agentId = +p['id'] || '');
    this.translationService.getLanguage().subscribe(x => this.isFrench = x);
  }

  singleSelectCheck(row: any) {
    this.admin = row;
    return this.selected.indexOf(row) === -1;
  }

  onDeselect(event, admin: Person) {
    admin.isEnabled = event.returnValue;
    const saveAdmin =  this.mappingUserService.setPerson(admin);

    this.userService.updatePerson(saveAdmin)
      .subscribe(res => {
        },
        err => {
          const title = 'Une erreur est survenue';
          this.toasterService.popAsync(this.notificationService.showErrorToast(title,
            this.isFrench ? err.error.MessageData.fr : err.error.MessageData.eng ));
        },
        () => {
          const title = 'Modification effectuée';
          const body = 'La personne ' + admin.firstName + ' a bien été ' +
            (event.returnValue ? 'activé' : 'désactivé');
          this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
        },
      );
  }

  ngOnInit() {

    this.setPage({offset: 0, pageSize: 10});


    this.adminTable.messages.emptyMessage = 'Aucun admin';
    this.adminTable.messages.selectedMessage = 'admin sélectionné';
    this.adminTable.messages.totalMessage = 'admin au total';
  }

  setPage(pageInfo) {
    this.query.page = pageInfo.offset + 1;
    this.query.pageSize =  this.page.size;

    this.userService.getAll(this.query).subscribe(pagedData => {
      this.rows = pagedData.items;
      this.page.totalElements = pagedData.totalItems;
      this.adminTable.messages.totalMessage = (pagedData.totalItems > 1 ? 'admin' : 'admin') + ' au total' ;
      this.page.pageNumber = 0;
    });
  }

  onSort(event) {
    const sort = event.sorts[0];
    this.query.isSortAscending = sort.dir === 'asc';
    this.query.sortBy = sort.prop;
    this.getRows(this.query);
  }

  getRows(query) {
    this.userService.getAll(this.query).subscribe(pagedData => {
      // this.rows = [];
      this.rows = pagedData.items;
      this.page.totalElements = pagedData.totalItems;
      this.page.pageNumber = query.page - 1;
    });
  }
}
