import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import {} from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private loader: LoadingService) {}

  _IsnotShow = [
    '/chat/message'
  ];
  hideSpinner: boolean = false;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    for (let e of this._IsnotShow) {
      if (request.url.includes(e)) {
        this.hideSpinner = true;
        break;
      } else {
        this.hideSpinner = false;
      }
    }

    this.hideSpinner ? this.loader.hide() : this.loader.show();

    return next.handle(request).pipe(
      finalize(() => {
        // setTimeout(() => {
        this.loader.hide();
        // }, 1000);
      })
    );
  }
}
