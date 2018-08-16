import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslationService} from '../../../@core/data/services/translation.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';



@Component({
  selector: 'ngx-accusbatteries-list',
  templateUrl: './accusbatteries-list.component.html',
  styleUrls: ['./accusbatteries-list.component.scss'],
})
export class AccusbatteriesListComponent implements OnInit {

  options = [10, 20, 50];
  optionSelected: number = 10;
  isFrench: boolean = false;
  routerSub: Subscription;
  isActiveChild: boolean = false;

  constructor(public translate: TranslateService,
              private translationService: TranslationService,
              private router: Router,
              private route: ActivatedRoute,
              private cookieService: CookieService) {

    this.translationService.getLanguage().subscribe(language => {
      if (language === undefined) {
        language = this.cookieService.get('Langue') === 'fr';
      }
      this.isFrench = language
    });

    this.routerSub = this.router.events.filter(x => x instanceof NavigationEnd).subscribe(() => {
        this.isActiveChild = this.route.children.length > 0;
      },
      err => {
      console.log('err', err);
      },
      () => {
      },
    );

  }

  ngOnInit() {
  }

  goToAccus(event) {
    this.router.navigate(['/accusbatteries/list/accus/', event]);
  }

  goToBattery(event) {
    this.router.navigate(['/accusbatteries/list/battery/', event]);
  }

  goToNewItem(isAccus: boolean) {
    this.router.navigate([isAccus ? '/accusbatteries/list/new-accus' : '/accusbatteries/list/new-battery']);
  }

  onOptionsSelected(event) {
    this.optionSelected = event;
  }
}
