import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import {AuthenticationService} from '../../../@core/data/services/authenticationService';
import {HelperService} from '../../../@core/utils/Helper.service';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {LocalStorageService} from 'angular-2-local-storage';
import {TranslationService} from '../../../@core/data/services/translation.service';
import {UserService} from '../../../@core/data/services/user.service';
import {filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {PhotoService} from "../../../@core/data/services/photo.service";
import {Photo} from "../../../@core/data/models/users/Photo";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isFrench: boolean;

  @Input() position = 'normal';
  @ViewChild('langSelect') langSelect;

  user: any;
  photo: Photo;
  items = [{ title: 'Profile' }, { title: 'Log out' }];
  itemsFR = [{ title: 'Profil'}, {title: 'Deconnexion'}];
  url = environment.apiPics;
  userType: string;

  constructor(private sidebarService: NbSidebarService,
              private router: Router,
              private nbMenuService: NbMenuService,
              private userService: UserService,
              private localStorageService: LocalStorageService,
              private analyticsService: AnalyticsService,
              public authenticationService: AuthenticationService,
              private translationService: TranslationService,
              public helperService: HelperService,
              public translate: TranslateService,
              private photoService: PhotoService,
              private cookieService: CookieService) {

    translate.addLangs(['en', 'fr']);
    // translate.setDefaultLang('en');
    if (this.cookieService.get('Langue') === 'fr') {
      translate.currentLang = 'fr';
      translate.setDefaultLang('fr');
    } else {
      translate.currentLang = 'en';
      translate.setDefaultLang('en');
    }
    this.translationService.setLanguage(translate.currentLang === 'fr');

    this.translationService.getLanguage().subscribe( x => {
      this.isFrench = x;
    })
  }

  ngOnInit() {

    this.photoService.getCurrentProfilePhoto().subscribe(x => {
      this.photo = x;
      //this.photo = new Photo(0, 'profile.png', true, 1)
    })

    const user = this.helperService.getDecodedAccessToken(this.helperService.getToken());
    this.userService.getUser(user.nameid).subscribe(x => this.user = x);
    this.userType = user.userType.toLocaleLowerCase();
   if (this.userType === 'supplier') {
     this.photoService.getPhoto(user.nameid).subscribe(x => {
       console.log(x);
       this.photo = x;
     }, error1 => {
       this.photo = new Photo(0, 'profile.png', true, 1)
     });
   }


    this.nbMenuService.onItemClick().subscribe(x => {
      console.log(x);
        switch (x.item.title) {
          case 'Profile':
            this.router.navigate(['/home/profile/' + user.nameid])
            break;
            case 'Profil':
            this.router.navigate(['/home/profile/' + user.nameid])
            break;
          case 'Log out':
            this.authenticationService.logout();
            break;
          case 'Deconnexion':
            this.authenticationService.logout();
            break;
        }
      })
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.nbMenuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  logout() {
   this.authenticationService.logout()
  }



  setLanguage() {
      // this.translate.use(this.langSelect.nativeElement.value);
      // this.translate.currentLang = this.langSelect.nativeElement.value;
      this.translate.setDefaultLang(this.langSelect.nativeElement.value);
      this.translationService.setLanguage(this.langSelect.nativeElement.value === 'fr');
      this.cookieService.set( 'Langue', this.langSelect.nativeElement.value );
    }
}
