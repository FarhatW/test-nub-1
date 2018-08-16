import {Component, Input, OnInit} from '@angular/core';
import {PagerService} from '../pagination/pager.service';
import {Key} from '../../data/models/shared/key';

@Component({
  selector: 'ngx-show-errors',
  templateUrl: './show-errors.component.html',

  styles: ['.error {border-bottom: 1px black solid; }', '.error  .goodid { border-right: 1px black solid; }',
    'a { cursor: pointer;}'],
})
export class ShowErrorsComponent implements OnInit {
  constructor(private pagerService: PagerService) {
  }

  @Input() errorsArr: Key[] = [];

  pager: any = {};
  pagedItems: any[];

  ngOnInit(): void {
    this.setPage(1);
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.errorsArr.length, page);
    // console.log('this.pager', this.pager)

    this.pagedItems = this.errorsArr.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
