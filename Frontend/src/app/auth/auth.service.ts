import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtResponse} from './jwt-response';
import {Observable} from 'rxjs';
import {SignupInfo} from './signup-info';
import {LoginInfo} from './login-info';
import {ConstantsService} from '../constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private constantsService: ConstantsService) { }

  attemptAuthorization(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.constantsService.LOGIN_URL, credentials, this.constantsService.HTTP_OPTIONS);
  }

  signUp(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.constantsService.REGISTER_URL, info, this.constantsService.HTTP_OPTIONS);
  }
}
