import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {ConstantsService} from '../constants/constants.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService, private constantsService: ConstantsService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.token.getToken();
    if (token != null) {
      authRequest = request.clone( { headers: request.headers.set(this.constantsService.TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }
    return next.handle(authRequest);
  }
}
