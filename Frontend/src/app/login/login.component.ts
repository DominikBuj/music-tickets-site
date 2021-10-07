import { Component, OnInit } from '@angular/core';
import {LoginInfo} from '../auth/login-info';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {LoggerService} from '../logger/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: LoginInfo;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private loggerService: LoggerService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
    }
  }

  onSubmit(): void {
    this.loggerService.log(this.form);

    this.loginInfo = new LoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuthorization(this.loginInfo).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUsername(data.username);
        this.tokenStorageService.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getAuthorities();
        this.reloadPage();
      },
      error => {
        this.loggerService.log(error);
        if (error.status === 401) {
          this.errorMessage = 'Incorrect login or password';
        }
        else {
          this.errorMessage = error.error.errors[0].defaultMessage;
        }
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  show(): void {
    this.loggerService.log(this.form.username);
    this.loggerService.log(this.form.password);
  }
}
