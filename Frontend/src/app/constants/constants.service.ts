import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {User} from '../user-list/user.model';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  HTTP_OPTIONS = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  LOGIN_URL = 'http://localhost:8080/authentication/signin';
  REGISTER_URL = 'http://localhost:8080/authentication/signup';
  USER_URL = 'http://localhost:8080/security/user';
  ADMIN_URL = 'http://localhost:8080/security/admin';
  EITHER_URL = 'http://localhost:8080/security/either';
  EVENTS_URL = 'http://localhost:8080/events';
  ADMIN_EVENTS_URL = this.ADMIN_URL + '/events';
  USER_TICKETS_URL = this.USER_URL + '/tickets';
  ADMIN_USERS_URL = this.ADMIN_URL + '/users';
  USER_USERS_URL = this.USER_URL + '/users';
  EITHER_USERS_URL = this.EITHER_URL + '/users';

  TOKEN_KEY = 'AuthToken';
  USERNAME_KEY = 'AuthUsername';
  AUTHORITIES_KEY = 'AuthAuthorities';
  TOKEN_HEADER_KEY = 'Authorization';

  constructor() { }
}
