import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {Agent} from "../../../@core/data/models/users/agents/agent";
import {Page} from "../../../@core/data/models/shared/page";
import {MappingUserService} from "../../../@core/data/services/mapping-user.service";
import {UserService} from "../../../@core/data/services/user.service";
import {NotificationService} from "../../../@core/data/services/notification.service";
import {ToasterService} from "angular2-toaster";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-shared-agent-list',
  templateUrl: './shared-agent-list.component.html',
  styleUrls: ['./shared-agent-list.component.scss']
})
export class SharedAgentListComponent implements OnInit {
  @ViewChild('agentTable') agentTable: DatatableComponent;
  @Input() agentInput: Agent[];


  isSortAscending: boolean = true;
  sortBy: string = 'id';
  rows: Agent[] = [];
  agent: Agent;
  page = new Page();
  search: string;
  selectedRow = [];
  selected;

  query: any = {
    pageSize: this.page.size,
    page: this.page.pageNumber,
    userType : 'agents',
    isSortAscending: this.isSortAscending,
    sortBy: this.sortBy
  };

  pageSize: number;
  constructor(private router: Router,
              private mappingUserService: MappingUserService,
              private userService:  UserService,
              private notificationService: NotificationService,
              private toasterService: ToasterService) {
    this.page.size = 10;
    this.query.pageSize = 10;
    this.query.page = 0;
    this.page.totalElements = 0;
    this.page.pageNumber = 0;
    this.page.totalPages = 0; }

  singleSelectCheck(row: any) {
    this.agent = row;
    return this.selected.indexOf(row) === -1;
  }

  onDeselect(event, agent: Agent) {
    agent.isEnabled = event.returnValue;
    let agentSave =  this.mappingUserService.setAgent(agent);


    this.userService.updateAgent(agentSave)
      .subscribe(res => {
        },
        err => {
          const title = 'Une erreur est survenue';
          this.toasterService.popAsync(this.notificationService.showErrorToast(title, err.body));
        },
        () => {
          const title = 'Modification effectuée';
          const body = 'L\'agent ' + agent.firstName + ' a bien été ' +
            (event.returnValue ? 'activé' : 'désactivé');
          this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
        },
      );
  }
  ngOnInit() {
    this.setPage({offset: 0, pageSize: 10});
    this.agentTable.messages.emptyMessage = 'Aucun Agent';
    this.agentTable.messages.selectedMessage = 'agent sélectionné';
    this.agentTable.messages.totalMessage = 'agents au total';
  }
  setPage(pageInfo) {

    this.query.page = pageInfo.offset + 1;
    this.query.pageSize = this.page.size;

    this.userService.getAll(this.query).subscribe(pagedData => {
      this.rows = pagedData.items;
      this.page.totalElements = pagedData.totalItems;
      this.agentTable.messages.totalMessage = (pagedData.totalItems > 1 ? 'agents' : 'agent') + ' au total' ;
      this.page.pageNumber = 0;
    });
  }
  onSort(event) {
    const sort = event.sorts[0];
    this.query.isSortAscending = sort.dir === 'asc' ? true : false;
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

  _setQuery(query) {

    this.query = query;
  }
  onPerPageChanged(event) {
    this.page.size = event;
    this.query.pageSize = event;
    this.getRows(this.query);
  }

  onSearchTerm(event){
    this.query.search = event;
    this.getRows(this.query);
  }
}
