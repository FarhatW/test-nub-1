import {AfterContentChecked, Component, OnInit, ViewChild} from '@angular/core';
import {GoodService} from '../../../../@core/data/services/good.service';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {NotificationService} from '../../../../@core/data/services/notification.service';
import {TranslationService} from '../../../../@core/data/services/translation.service';
import {CountryService} from '../../../../@core/data/services/country.service';
import {Country} from '../../../../@core/data/models/country';
import {SaveSidjGood} from '../../../../@core/data/models/goods/sidjGood/saveSidjGood';
import {AutocompleteItem, CreateNewAutocompleteGroup, NgAutocompleteComponent} from 'ng-auto-complete';
import {UserToken} from '../../../../@core/data/models/users/userToken';
import {UserService} from '../../../../@core/data/services/user.service';
import {GoodFormService} from '../shared/good-form.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {RedirectService} from '../../../../@core/data/services/redirect.service';

@Component({
  selector: 'ngx-good-form-step-1',
  templateUrl: './good-form-step-1.component.html',
  styleUrls: ['./good-form-step-1.component.scss'],
})
export class GoodFormStep1Component implements OnInit, AfterContentChecked {
  goodsNumberPattern = '^[A-Z0-9-]+$';
  user: UserToken;
  numberPattern = '^[0-9]+$';
  id: number;
  gencod: any = {
    gencod: '',
  };
  @ViewChild('autocompleteSupplier') public autocompleteSupplier: NgAutocompleteComponent;
  @ViewChild('f') validMainForm: NgForm;
  public suppliersGroup = [
    CreateNewAutocompleteGroup(
      'Search',
      'completer',
      [],
      {titleKey: 'title', childrenKey: null},
    ),
  ];


  query: any = {
    userType: 'suppliers',
  };


  suppliers: any[] = [];
  good: SaveSidjGood;
  countries: Country[];
  edit: boolean = false;
  isFrench: boolean;
  isGencod: boolean = true;
  languageSub: Subscription;
  getCurrentId: number;
  isEdit: boolean;

  constructor(public goodsService: GoodService,
              private router: Router,
              private goodFormService: GoodFormService,
              private countriesService: CountryService,
              private notificationService: NotificationService,
              private userService: UserService,
              private toasterService: ToasterService,
              private translationService: TranslationService,
              private redirectService: RedirectService) {
    this.goodsService.getCurrentGoodId().subscribe(x => {
      this.getCurrentId = x;
    });
  }

  ngAfterContentChecked() {
    this.goodFormService.setValidForm(this.validMainForm.valid);
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();

    this.goodsService.getCurrentSaveGood().subscribe(g => {
      if (g === undefined) {
        (this.getCurrentId) ? this.redirectService.getRedirectEditForm(this.getCurrentId)
          : this.redirectService.getRedirectNewForm();
      } else {
        this.isEdit = !!g.id;
        this.good = g;

        if (this.good && this.user.userType.toUpperCase() !== 'SUPPLIER') {
          this.getSuppliers();
        }
      }
    });

    this.languageSub = this.translationService.getLanguage().subscribe(x => {
      this.isFrench = x;
    });

    this.countriesService.getAll().subscribe(c => {
      this.countries = c.items;
    });
  }

  getSuppliers() {
    this.userService.getAll(this.query).subscribe(sup => {
        sup.items.forEach(item => {
          this.suppliers.push(new AutocompleteItem(item.contact.company, item.id, item.agentId));
        });
        console.log('this.suppliers', this.suppliers);
        this.autocompleteSupplier.SetValues('completer', this.suppliers);
        this.autocompleteSupplier.SelectItem('completer', this.good.supplierId);
      },
    );
  }

  _handleGencod(x: boolean, gencod: string) {
    switch (x) {
      case true: {
        const title = this.isFrench ? 'Gencod Valide' : '\n' + 'Valid gencod !';
        const body = '';
        this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
        this.isGencod = x;
        break;
      }
      case false: {
        this.isGencod = x;
        const title = this.isFrench ? 'Problème avec le gencod !' : '\n' + 'Problem with gencod !';
        const body = this.isFrench ? 'Ce gencod n\'existe pas.' : 'This gencod does not exist.';
        this.toasterService.popAsync(this.notificationService.showWarningToast(title, body));
        break;
      }
    }
  }

  _handleGencodError(error) {
    const title = this.isFrench ? 'Erreur' : 'Error';
    const body = this.isFrench ? 'Une erreur est survenue' : 'An error occured';
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body));
  }

  verifyGencod(gencod) {
    switch (gencod && gencod.length >= 12) {
      case true: {
        this.gencod.gencod = gencod;
        return this.goodsService.verifyGencod(this.gencod).subscribe(x => {
            this._handleGencod(x, gencod);
          },
          error => this._handleGencodError(error));
      }
      case false: {
        switch (gencod) {
          case true: {
            this.isGencod = false;
            break;
          }
          case false: {
            this.isGencod = true;
            break;
          }
        }
        break;
      }
      default: {
        this.isGencod = true;
        break;
      }
    }
  }

  selectedSupplier(event) {
    if (event.item) {
      this.good.supplierId = event.item.id;
      this.goodFormService.setCurrentAffectedSupplier(event.item);
    } else {
      this.good.supplierId = 0;
      this.goodFormService.setCurrentAffectedSupplier(null)
    }
  }

  gencodBlur(gencod) {
    if (!gencod) {
      this.isGencod = true;
    }
  }

  setContinent(countryCode) {
    this.good.continent = this.countries.find(x => x.countryCode === countryCode).continentCode;
  }

  keyDown(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }

  submit() {

  }

  updateStep1(isNextStep: boolean) {
    this.goodsService.setCurrentSaveGoods(this.good);
    if (this.isEdit) {
      const $result = this.goodsService.update(this.good);
      $result.subscribe(x => {
        if (isNextStep) {
          this.router.navigate(['home/goods/form-edit/' + this.good.id + '/step-two'])
        } else {
          this._handleSubmitSuccess(x);
        }
      }, error => {
        this._handleSubmitError(error)
      });
    } else {
      this.router.navigate(['home/goods/form/step-two'])
    }
  }

  private _handleSubmitSuccess(res) {
    this.good.id = res.id;
    this.goodsService.setCurrentSaveGoods(this.good);
    this.router.navigate(['home/goods/form-edit/' + this.good.id])
    const title = this.isFrench ? ('Produit Mis à jour !') :
      ('Product Updated !');
    const body = this.isFrench ? ('Vous avez bien mis à jour votre produit.')
      : ('You have successfully update your product.');
    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
  }

  private _handleSubmitError(err) {
    const title = this.isFrench ? 'Une erreur est survenu !' : '\n' + 'an error has occurred !'
    const body = err.statusText;
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body))
  }

}
