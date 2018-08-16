import { Injectable} from '@angular/core';
import {BodyOutputType, Toast} from 'angular2-toaster';

@Injectable()
export class NotificationService {


  constructor() {

  }

  private newToast(type, title, body, timeOut) {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: timeOut ? 5000 : 0,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    return toast;
  }


  showSuccessToast(title: string, body: string, timeOut: boolean = true) {

    return this.newToast('success', title, body, timeOut)
  }

  showErrorToast(title: string, body: string, timeOut: boolean = true) {
    return this.newToast('error', title, body, timeOut)
  }

  showWarningToast(title: string, body: string, timeOut: boolean = true) {
    return this.newToast('warning', title, body, timeOut)
  }
}
