import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {GoodService} from "../../../@core/data/services/good.service";
import {SharedExportPdfComponent} from "../../shared/shared-export-pdf/shared-export-pdf.component";
import {SidjGood} from "../../../@core/data/models/goods/sidjGood/sidjGood";
import {MappingUserService} from "../../../@core/data/services/mapping-user.service";
import {PDFExportComponent} from "@progress/kendo-angular-pdf-export";

@Component({
  selector: 'ngx-good-view-pdf-modal',
  templateUrl: './good-view-pdf-modal.component.html',
  styleUrls: ['./good-view-pdf-modal.component.scss']
})
export class GoodViewPdfModalComponent implements OnInit {
  @ViewChild('pdf') pdf: PDFExportComponent;
  constructor(private activeModal: NgbActiveModal,
              private goodService: GoodService,private  userMappingService:  MappingUserService) { }
  arrayId: number[] = [];
  good:  SidjGood;
  ngOnInit() {
   this.good = this.goodService.getCurrentGood();
  }

  closeModal() {
    this.activeModal.close();
  }

  addProductToArr() {
    this.userMappingService.setProductValue(this.good, true);
    setTimeout(() => this.pdf.saveAs('SidjGood(s).pdf'), 2000);

  }

}
