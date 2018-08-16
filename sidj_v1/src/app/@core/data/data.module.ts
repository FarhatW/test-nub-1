import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import {TranslationService} from './services/translation.service';
import {FilesService} from './services/files.service';
import {NotificationService} from './services/notification.service';
import {CurrencyService} from './services/currency.service';
import {VatRateService} from './services/vatRate.service';
import {LanguageService} from './services/language.service';
import {YearService} from './services/year.service';
import {GoodService} from './services/good.service';
import {ImageFromService} from './services/imageFrom.service';
import {BatteryService} from './services/battery.service';
import {AccuService} from './services/accus.service';
import {GenderService} from './services/gender.service';
import {CountryService} from './services/country.service';
import {UserService} from './services/user.service';
import {MappingUserService} from './services/mapping-user.service';
import {PhotoService} from './services/photo.service';
import {RedirectService} from './services/redirect.service';

const SERVICES = [
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  GenderService,
  TranslationService,
  CurrencyService,
  VatRateService,
  LanguageService,
  YearService,
  CountryService,
  AccuService,
  BatteryService,
  FilesService,
  NotificationService,
  GoodService,
  ImageFromService,
  UserService,
  MappingUserService,
  PhotoService,
  RedirectService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [

        ...SERVICES,
      ],
    };
  }
}
