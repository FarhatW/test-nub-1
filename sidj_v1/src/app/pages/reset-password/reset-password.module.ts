import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordFormService} from "./password/password-form.service";
import {RouterModule} from "@angular/router";
import {ThemeModule} from "../../@theme/theme.module";
import {PasswordComponent} from "./password/password.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ThemeModule,

  ],
  declarations: [
    PasswordComponent
  ],
  entryComponents: [
    PasswordComponent
  ],
  providers: [PasswordFormService]
})
export class ResetPasswordModule { }
