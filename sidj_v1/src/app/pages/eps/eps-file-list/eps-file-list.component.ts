import { Component, OnInit } from '@angular/core';
import {LocalDataSource, ServerDataSource} from "ng2-smart-table";
import {EpseService} from "../../../@core/data/services/epse.service";
import {EpseFile} from "../../../@core/data/models/epse/epseFile";
import {EpsFileService} from "../../../@core/data/services/epsFile.service";
import {HttpClient} from "@angular/common/http";
import {Http} from "@angular/http";
// import {EpseFile} from "../../../@core/data/models/items/epseFile";

@Component({
  selector: 'ngx-eps-file-list',
  templateUrl: './eps-file-list.component.html',
  styleUrls: ['./eps-file-list.component.scss']
})
export class EpsFileListComponent implements OnInit {

  supplier: any;
  settingsEpseFile = {

    noDataMessage: 'Ce fournisseur ne possède aucun Ficher.',
    actions: {
      add: false,
      edit: false,
      filter: false,
      delete: {
        deleteButtonContent: '<span>Suppr.</span>',
        confirmDelete: true,
      },
    },

    columns: {
      id: {
        title: 'Id',
        type: 'string',
        sort: false,
        editable: false,
        filter: false
      },
      name: {
        title: 'Nom Fichier',
        type: 'string',
        editable: false,
        filter: false

      },
      supplierId: {
        title: 'Id Fournisseur',
        type: 'string',
        editable: false,
        filter: false

      },
      items: {
        title: 'Nombre Produit',
        type: 'string',
        editable: false,
        sort: true,
        filter: false,
        valuePrepareFunction: (value) => {
          return (value as Array<any>).length;
        },

      }
    },
  };

  pageSize: number = 10;
  pageCount: number;
  totalEpseFiles: number;
  epseFiles: EpseFile[];
  sourceEpseFile: ServerDataSource ;
  conf = {
    endPoint: this.epseService.epseFileEndPoint,
    sortFieldKey: '#field#',
    sortDirKey: '#field#',
    pagerPageKey: 'page',
    pagerLimitKey: 'pageSize',
    filterFieldKey: '#field#',
    totalKey: 'totalItems',
    dataKey: 'items',

  }

  constructor(private epseService: EpseService,
              private epseFileService: EpsFileService,
              private http: Http
              ) {
    this.epseFileService.currentSupplier.subscribe(x => {
      this.supplier = x;
      if (this.supplier) {
        this.conf.endPoint = this.epseService.epseFileEndPoint + ('?supplierId=' + this.supplier.id);
      }else {
        this.conf.endPoint = this.epseService.epseFileEndPoint;
      }
      console.log('this.conf', this.conf.filterFieldKey)
      this.sourceEpseFile = new ServerDataSource(this.http, this.conf );

    } )
  }

  getFiles() {
    this.epseService.getAllEpseFiles(null).subscribe(file => {
      this.epseFiles = file.items;
    })
  }

  ngOnInit() {
    // this.epseService.getAllEpseFiles(null).subscribe(file => {
    //   this.epseFiles = file.items;
    //   this.refreshEpseFilesTable();
    // })
  }

  refreshEpseFilesTable() {
    this.sourceEpseFile.load(this.epseFiles);
    this.sourceEpseFile.setPaging(1, 10, true);
    this.totalEpseFiles = this.epseFiles.length;
    this.pageCount = Math.ceil(this.totalEpseFiles / this.pageSize);
  }



}
