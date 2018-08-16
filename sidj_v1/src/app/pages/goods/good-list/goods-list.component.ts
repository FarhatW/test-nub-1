import {Component,  OnInit, } from '@angular/core';
import {UserService} from "../../../@core/data/services/user.service";
import {UserToken} from "../../../@core/data/models/users/userToken";


@Component({
  selector: 'ngx-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit {

  userToken: UserToken;


  constructor(    private userService: UserService

  ) {

    this.userService.getCurrentUserTokenObs().subscribe(x => {
      this.userToken = x;
    })
  }


  ngOnInit() {
  }

}
