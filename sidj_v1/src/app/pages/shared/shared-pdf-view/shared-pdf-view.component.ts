import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SidjGood} from "../../../@core/data/models/goods/sidjGood/sidjGood";
import {GoodService} from "../../../@core/data/services/good.service";
import {UserService} from "../../../@core/data/services/user.service";
import {MappingUserService} from "../../../@core/data/services/mapping-user.service";
import {SaveAgent} from "../../../@core/data/models/users/agents/saveAgent";
import {SaveSupplier} from "../../../@core/data/models/users/suppliers/saveSupplier";
import {PDFExportComponent} from "@progress/kendo-angular-pdf-export";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'ngx-shared-pdf-view',
  templateUrl: './shared-pdf-view.component.html',
  styleUrls: ['./shared-pdf-view.component.scss']
})
export class SharedPdfViewComponent implements OnInit {
  @Input() good: SidjGood;
  @ViewChild('pdf') pdf: PDFExportComponent;
  supplier:  SaveSupplier;
  agent: SaveAgent;
  urlPhoto: string;
  constructor(private goodService: GoodService,
              private userService: UserService,
              private mappingUserService: MappingUserService ) {
    this.urlPhoto = environment.apiPicture
  }

  ngOnInit() {
      this.getSupplierAndAgent(this.good.supplierId);
  }

  private getSupplierAndAgent(supplierId) {
    if (supplierId) {
      this.userService.getUser(supplierId).subscribe(data => {
        this.supplier = this.mappingUserService.setSupplier(data);
        console.log('this.supplier', this.supplier);
        if (this.supplier.agentId) {
          console.log('dans supplier agen');
          this.userService.getUser(this.supplier.agentId).subscribe(result => {
            this.agent = this.mappingUserService.setAgent(result);
          });
        }
      });
    }
  }
}
