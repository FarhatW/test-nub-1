import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AutocompleteItem,
  CreateNewAutocompleteGroup,
  NgAutocompleteComponent,
  SelectedAutocompleteItem
} from "ng-auto-complete";
import {UserService} from "../../../@core/data/services/user.service";
import {EpseService} from "../../../@core/data/services/epse.service";
import {EpsFileService} from "../../../@core/data/services/epsFile.service";
import {Supplier} from "../../../@core/data/models/users/suppliers/supplier";

@Component({
  selector: 'ngx-eps-supplier-list',
  templateUrl: './eps-supplier-list.component.html',
  styleUrls: ['./eps-supplier-list.component.scss']
})
export class EpsSupplierListComponent implements OnInit {
  @ViewChild('completer') public completer: NgAutocompleteComponent;
  suppliersGroupItem: any[] = [];
  constructor(private userService: UserService, private epseFileService: EpsFileService) { }

  selectedSupplierName: string = '';
  pageSize = 0;
  query = {
    pageSize: this.pageSize,
    userType: 'suppliers'
  };

  public groupBattery = [
    CreateNewAutocompleteGroup(
      'Search',
      'completer',
      [ ],
      {titleKey: 'title', childrenKey: null},
    ),
  ];
  SelectedSupplier(itemSelected: SelectedAutocompleteItem) {
    if(itemSelected.item) {
      this.epseFileService.setSupplier(itemSelected.item);
      this.selectedSupplierName = itemSelected.item.title;
    }else {
      this.epseFileService.setSupplier(null);
      this.selectedSupplierName = '';
    }
  }
  ngOnInit() {
    this.userService.getAll(this.query).subscribe(ba => {
      ba.items.forEach(item => {
        const supplierItemComplete = new AutocompleteItem(item.contact.company, item.id, '');
        this.suppliersGroupItem.push(supplierItemComplete);
      });
      this.completer.SetValues('completer', this.suppliersGroupItem);
    });
  }

}
