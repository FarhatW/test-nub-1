import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {Supplier} from "../../../@core/data/models/users/suppliers/supplier";
import {Subscription} from "../../../../../node_modules/@angular/cli/node_modules/rxjs";
import {Page} from "../../../@core/data/models/shared/page";
import {ToasterService} from "angular2-toaster";
import {NotificationService} from "../../../@core/data/services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../@core/data/services/user.service";
import {SaveSupplier} from "../../../@core/data/models/users/suppliers/saveSupplier";
import {MappingUserService} from "../../../@core/data/services/mapping-user.service";
import {TranslationService} from "../../../@core/data/services/translation.service";
import {HelperService} from "../../../@core/utils/Helper.service";
import {ForgotPasswordModalComponent} from "../../home/home-content/home-content-login/forgot-password-modal/forgot-password-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActiveSuppliersModalComponent} from "../../suppliers/active-suppliers-modal/active-suppliers-modal.component";

@Component({
  selector: 'ngx-shared-supplier-list',
  templateUrl: './shared-supplier-list.component.html',
  styleUrls: ['./shared-supplier-list.component.scss']
})
export class SharedSupplierListComponent implements OnInit {
  @ViewChild('supplierTable') supplierTable: DatatableComponent;
  @Input() supplierInput: Supplier[];


  isSortAscending: boolean = true;
  sortBy: string = 'id';
  rows: Supplier[] = [];
  supplier: Supplier;
  page = new Page();
  search: string;
  selectedRow = [];
  selected;

  isFrench: boolean;
  query: any = {
    pageSize: this.page.size,
    page: this.page.pageNumber,
    userType : 'suppliers',
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
  showAddModal(supplier: Supplier) {

    this.userService.setCurrentSupplier(supplier);
    const activeModal = this.modalService.open(ActiveSuppliersModalComponent, {size: 'lg', container: ''});
    activeModal.result.then(result => {
      console.log(result);
    });
    activeModal.componentInstance.modalHeader = 'Activer ce compte';
  }

  singleSelectCheck(row: any) {
    this.supplier = row;
    return this.selected.indexOf(row) === -1;
  }

  onDeselect(event, supplier: Supplier) {
    supplier.isEnabled = event.returnValue;
    const supplierSave =  this.mappingUserService.setSupplier(supplier);

    this.userService.updateSupplier(supplierSave)
      .subscribe(res => {
        },
        err => {
          const title = 'Une erreur est survenue';
          this.toasterService.popAsync(this.notificationService.showErrorToast(title,
            this.isFrench ? err.error.MessageData.fr : err.error.MessageData.eng ));
        },
        () => {
          const title = 'Modification effectuée';
          const body = 'Le supplier ' + supplier.firstName + ' a bien été ' +
            (event.returnValue ? 'activé' : 'désactivé');
          this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
        },
      );
  }

  ngOnInit() {

    this.setPage({offset: 0, pageSize: 10});


    this.supplierTable.messages.emptyMessage = 'Aucun supplier';
    this.supplierTable.messages.selectedMessage = 'supplier sélectionné';
    this.supplierTable.messages.totalMessage = 'supplier au total';
  }

  setPage(pageInfo) {
    this.query.page = pageInfo.offset + 1;
    this.query.pageSize =  this.page.size;

    this.userService.getAll(this.query).subscribe(pagedData => {
      this.rows = pagedData.items;
      this.page.totalElements = pagedData.totalItems;
      this.supplierTable.messages.totalMessage = (pagedData.totalItems > 1 ? 'suppliers' : 'supplier') + ' au total' ;
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
