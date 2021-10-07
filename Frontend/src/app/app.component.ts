import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'IWA-FinalProject-FrontEnd';
  authorities: string[];

  constructor(private tokenStorageService: TokenStorageService) {
    this.authorities = [];
  }

  ngOnInit(): void {
    this.authorities = this.tokenStorageService.getAuthorities();
  }

  public hasUserAuthority(): boolean {
    let output = false;
    this.authorities.forEach((authority: string) => {
      if (authority === 'ROLE_USER') {
        output = true;
        return;
      }
    });
    return output;
  }

  public hasAdminAuthority(): boolean {
    let output = false;
    this.authorities.forEach((authority: string) => {
      if (authority === 'ROLE_ADMIN') {
        output = true;
        return;
      }
    });
    return output;
  }

  signOut(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
