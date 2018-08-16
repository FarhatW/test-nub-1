import {Injectable} from '@angular/core';

@Injectable()
export class PasswordFormService {

  usersPasswordFormValidationMessages: any;
  usersPasswordFormErrors = {

    password: '',
    confirmPassword: '',


  };
  usersPasswordFormErrorsBool = {
    password: false  ,
    confirmPassword: false,
  };
  nameMin: number = 5;
  nameMax: number = 20;


  constructor() {

    this.usersPasswordFormValidationMessages = {

      password: {
        required: 'Le mot de passe est incorrect',
        minlength: 'Le mot de passe doit comprendre ' + this.nameMin + ' caractères ou plus.',
        maxlength: 'Le mot de passe doit comprendre ' + this.nameMax + ' caractères ou moins.'
      },
      confirmPassword: {
        required: 'Les mots de passe ne sont pas identique',
        minlength: 'Le mot de passe doit comprendre ' + this.nameMin + ' caractères ou plus.',
        maxlength: 'Le mot de passe doit comprendre ' + this.nameMax + ' caractères ou moins.'
      },

    };

  }
}
