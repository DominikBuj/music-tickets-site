import { Component, OnInit } from '@angular/core';
import {SignupInfo} from '../auth/signup-info';
import {AuthService} from '../auth/auth.service';
import {LoggerService} from '../logger/logger.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignupInfo;
  isSignedUp = false;
  isSignedUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private loggerService: LoggerService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isSignedUpFailed = true;

    this.signupInfo = new SignupInfo(
      this.form.username,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignedUpFailed = false;
      },
      error => {
        this.loggerService.log(error);
        this.errorMessage = error.error.errors[0].defaultMessage;
        this.isSignedUpFailed = true;
      }
    );
  }
}
