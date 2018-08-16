import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {HelperService} from '../../utils/Helper.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   console.log(this.authService.getToken() + 'interceptor');
  //   request = request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${this.authService.getToken()}`,
  //     },
  //   });
  //   return next.handle(request);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('intercet', request)
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    return next.handle(request);
  }

  protected get authService(): HelperService {
    return this.injector.get(HelperService);
  }
}

