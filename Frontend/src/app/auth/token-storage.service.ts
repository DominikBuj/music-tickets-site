import { Injectable } from '@angular/core';
import {ConstantsService} from '../constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];

  constructor(private constantsService: ConstantsService) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public getToken(): string {
    return sessionStorage.getItem(this.constantsService.TOKEN_KEY);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.constantsService.TOKEN_KEY);
    window.sessionStorage.setItem(this.constantsService.TOKEN_KEY, token);
  }

  public getUsername(): string {
    return sessionStorage.getItem(this.constantsService.USERNAME_KEY);
  }

  public saveUsername(username: string): void {
    window.sessionStorage.removeItem(this.constantsService.USERNAME_KEY);
    window.sessionStorage.setItem(this.constantsService.USERNAME_KEY, username);
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(this.constantsService.TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(this.constantsService.AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  public saveAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(this.constantsService.AUTHORITIES_KEY);
    window.sessionStorage.setItem(this.constantsService.AUTHORITIES_KEY, JSON.stringify(authorities));
  }
}
