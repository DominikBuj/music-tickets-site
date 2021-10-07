import { Component, OnInit } from '@angular/core';
import {Ticket} from './ticket.model';
import {TokenStorageService} from '../auth/token-storage.service';
import {LoggerService} from '../logger/logger.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user-list/user.service';
import {TicketService} from './ticket.service';
import {User} from '../user-list/user.model';
import {ConstantsService} from '../constants/constants.service';

@Component({
  selector: 'app-user-tickets-list',
  templateUrl: './user-tickets-list.component.html',
  styleUrls: ['./user-tickets-list.component.scss']
})
export class UserTicketsListComponent implements OnInit {
  authorities: string[];
  currentUser: User;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private loggerService: LoggerService,
    private constantsService: ConstantsService,
    private userService: UserService,
    private ticketService: TicketService
  ) {
    this.authorities = [];
    this.currentUser = null;
  }

  ngOnInit(): void {
    this.authorities = this.tokenStorageService.getAuthorities();
    const username = this.tokenStorageService.getUsername();
    if (username) {
      this.userService.getCurrentUser(username).subscribe((user: User) => this.currentUser = user);
    }
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

  deleteTicket(ticket: Ticket, username: string): void {
    this.currentUser.tickets = this.currentUser.tickets.filter(otherTicket => otherTicket !== ticket);
    this.ticketService.deleteTicket(ticket, username).subscribe();
  }
}

