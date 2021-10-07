import { Component, OnInit } from '@angular/core';
import {User} from './user.model';
import {UserService} from './user.service';
import {ConstantsService} from '../constants/constants.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  authorities: string[];
  userList: User[];

  constructor(
    private tokenStorageService: TokenStorageService,
    private constantsService: ConstantsService,
    private userService: UserService
  ) {
    this.authorities = [];
    this.userList = [];
  }

  ngOnInit(): void {
    this.authorities = this.tokenStorageService.getAuthorities();
    this.userService.getUsers().subscribe((userList: User[]) => this.userList = userList.filter(this.userFilter));
  }

  private userFilter(user: User): boolean {
    let output = false;
    user.roles.forEach(role => {
      if (role.name === 'ROLE_USER') {
        output = true;
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
}
