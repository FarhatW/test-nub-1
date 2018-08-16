import {LocalStorageService} from "angular-2-local-storage";
import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {Supplier} from "../../../@core/data/models/users/suppliers/supplier";
import {CookieService} from "ngx-cookie-service";
import {TranslateService} from "@ngx-translate/core";
import {CountryService} from "../../../@core/data/services/country.service";
import {HelperService} from "../../../@core/utils/Helper.service";
import {Country} from "../../../@core/data/models/country";
import {SaveSupplier} from "../../../@core/data/models/users/suppliers/saveSupplier";
import {TranslationService} from "../../../@core/data/services/translation.service";
import {ToasterService} from "angular2-toaster";
import {NotificationService} from "../../../@core/data/services/notification.service";
import {UserService} from "../../../@core/data/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {EMAIL_REGEX} from "../../../@core/utils/regex-base";
import {SaveAgent} from "../../../@core/data/models/users/agents/saveAgent";
import {AuthenticationService} from "../../../@core/data/services/authenticationService";
import {MappingUserService} from "../../../@core/data/services/mapping-user.service";
import {UserToken} from "../../../@core/data/models/users/userToken";
import {PhotoService} from "../../../@core/data/services/photo.service";
import {Photo} from "../../../@core/data/models/users/Photo";
import {environment} from "../../../../environments/environment";
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'ngx-shared-user-form',
  styleUrls: ['./shared-user-form.component.scss'],
  templateUrl: './shared-user-form.component.html',
})

export class SharedUserFormComponent implements OnInit {
  isFrench: boolean;
  languageSub: Subscription;

  isEdit: boolean = false;
  isSupplier: boolean;
  isHomePage: boolean;
  isConfirmedSupplier: boolean;
  isProfile: boolean;
  userToken: UserToken;
  photo: Photo;
  @ViewChild('fileInput') fileInput: ElementRef;
  user: any;
  url = environment.apiPics;
  @Input() roles: string[];
  @Input() id: number;

  emailPattern = EMAIL_REGEX;

  countries: Country[];

  englishTranslation: any = {
    addSupplierTitle: 'Supplier has been created.',
    addSupplierBody: 'You can now log in our website, with your email and password.',

    editSupplierTitle: 'Supplier has been updated.',
    editSupplierBody: 'Informations have been updated on this profile.',

    addAgentTitle: 'Agent has been created.',
    addAgentBody: 'You can now log in our website, with your email and password.',

    editAgentTitle: 'Agent has been updated.',
    editAgentBody: 'Informations have been updated on this profile.',

    error: 'Error !'

  };

  frenchTranslation: any = {
    addSupplierTitle: 'Fournisseur ajouté',
    addSupplierBody: 'Vous pouvez maintenant vous connecter avec votre email et mot de passe.',

    editSupplierTitle: 'Fournisseur modifié.',
    editSupplierBody: 'Les informations ont été modifiées sur ce profile.',

    addAgentTitle: 'Agent ajouté',
    addAgentBody: 'Vous pouvez maintenant vous connecter avec votre email et mot de passe.',

    editAgentTitle: 'Agent modifié.',
    editAgentBody: 'Les informations ont été modifiées sur ce profile.',

    error: 'Erreur !'
  };
  userType: string;
  constructor(
    private mappingUserService: MappingUserService,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    public translate: TranslateService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private helperService: HelperService,
    private cookieService: CookieService,
    private translationService: TranslationService,
    private notificationService: NotificationService,
    private countriesService: CountryService,
    private photoService: PhotoService,
    private toasterService: ToasterService) {

    route.params.subscribe(p => {
      this.id = +p['id'] || 0;
    });

    this.route.data.subscribe(x => {
      console.log('route data', x);
      this.isHomePage = x.isHomePage;
      this.isSupplier = x.isSupplier;
      this.isProfile = x.isProfile;
    });

    this.countriesService.getAll().subscribe(c => {
      this.countries = c.items;
    });

    this.userService.getCurrentUserTokenObs().subscribe(u => {
      this.userToken = u;
    });

    this.languageSub = this.translationService.getLanguage().subscribe(lang => setTimeout( () => {
      translate.setDefaultLang(this.translationService.getCurrentLanguageAsString());
      this.isFrench = lang;

    }, 0));
  }

  getTitle(): string {

    if (this.isProfile) {
      return 'PROFILE.TITLE'
    } else if (this.isSupplier) {
      return this.isEdit ? 'FOURNISSEUR.EDIT' : 'FOURNISSEUR.TITRE';
    } else if (!this.isSupplier) {
      return this.isEdit ? 'AGENT.EDIT' : 'AGENT.TITRE';
    }
  }
  uploadPhoto() {
    if (this.isEdit){
      const nativeElement: HTMLInputElement = this.fileInput.nativeElement
      this.photoService.upload(this.id, nativeElement.files[0]).subscribe(
        x => {
          this.photo = x;
          this.photoService.setCurrentProfilePhoto(this.photo);
        });
    }

  }
  ngOnInit() {

    this.isEdit = !!this.id;
    if (this.isEdit) {
      this.isEdit = true;


      this.userService.getUser(this.id).subscribe(data => {
        this.userType = data.userType.toLowerCase();
          switch (data.userType.toLowerCase()) {
            case 'supplier': {
              this.photoService.getPhoto(this.id).subscribe(x => {
                this.photo = x;
                console.log('this.photo', this.photo)
              }, error => {
                this.photo = new Photo(0, 'profile.png', true, this.id)
              } );
              this.user = this.mappingUserService.setSupplier(data);
              this.isSupplier = true;
              break;
            }
            case 'agent': {

              this.user = this.mappingUserService.setAgent(data);
              break;
            }
            case 'person': {
              this.user = this.mappingUserService.setPerson(data);
              break;
            }
            default: {
              // TODO : manage errors.
              this.notificationService.showErrorToast('error', 'error')
            }
          }
        },
        err => {
          const title = err.status;
          const body = err.statusText;
          this.toasterService.popAsync(
            this.notificationService.showErrorToast(title, body))
        });
    } else {
      this.user = this.isSupplier ? this.mappingUserService.setNewSupplier(this.roles, this.isHomePage, this.isProfile,
        this.userService.getCurrentUser() ? this.userService.getCurrentUser().nameid : null, this.isProfile)
        : this.mappingUserService.setNewAgent(this.roles);

    }
  }

  submit() {
    const toasterContent = this.isFrench ? this.frenchTranslation : this.englishTranslation;
    let $result: any;

    switch (this.roles[0]) {
      case 'SUPPLI': {
        $result = this.isEdit ? this.userService.updateSupplier(this.user) :
          this.userService.createSupplier(this.user);
        break;
      }
      case 'AGENTS': {
        $result = this.isEdit ? this.userService.updateAgent(this.user) :
          this.userService.createAgent(this.user);
        break;
      }
      default : {
        $result = this.isEdit ? this.userService.updatePerson(this.user) :
          this.userService.createPerson(this.user);
      }
    }
    $result.subscribe(res => {
      this._handleSubmitSuccess(res, toasterContent);

    }, err => {
      this._handleSubmitError(err, toasterContent);
    })
  }

  _compare(item1, item2): boolean {
    return item1 === item2;
  }

  _handleSubmitSuccess(res, toasterContent) {

    const title = this.isEdit ? (this.isSupplier ? toasterContent.editSupplierTitle : toasterContent.editAgentTitle)
      : (this.isSupplier ? toasterContent.addSupplierTitle : toasterContent.addAgentTitle);
    const body = this.isEdit ? (this.isSupplier ? toasterContent.editSupplierBody : toasterContent.editAgentBody)
      : (this.isSupplier ? toasterContent.addSupplierBody : toasterContent.addAgentBody);

    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));

    this.isEdit ? this.router.navigate(['home/dashboard']) :
      this.isHomePage ?  this.router.navigate(['']) : this.router.navigate(['home/dashboard']) ;
  }

  _handleSubmitError(err, toasterContent) {

    const title = toasterContent.error;
    const body = this.isFrench ? err.error.messageData.fr : err.error.messageData.eng;
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body));
  }

  navigateTo() {
    this.isHomePage ? this.router.navigate(['']) : this._location.back();
  }

  onCountryChanged(code) {

    if (!this.user) {
      return false
    } else {
      this.user.tva = this.user.contact.country;
      return code && this.countries && !!this.user.contact.country && this.countries.find(
        x => x.countryCode === code).continentCode === 'Europe';
    }
  }
}
