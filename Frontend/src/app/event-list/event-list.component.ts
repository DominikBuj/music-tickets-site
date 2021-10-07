import { Component, OnInit } from '@angular/core';
import {Event} from './event.model';
import {EventService} from './event.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {User} from '../user-list/user.model';
import {UserService} from '../user-list/user.service';
import {TicketService} from '../user-tickets-list/ticket.service';
import {Ticket} from '../user-tickets-list/ticket.model';
import {LoggerService} from '../logger/logger.service';
import {ConstantsService} from '../constants/constants.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  authorities: string[];
  currentUser: User;
  eventList: Event[];

  form: any = {};
  submittedEvent: Event;
  eventFormErrorMessage: string;
  availableCities = ['Kraków', 'Łódź', 'Warszawa'];

  boughtTicket: Ticket;
  ticketsAmount: number;

  constructor(
    private tokenStorageService: TokenStorageService,
    private loggerService: LoggerService,
    private constantsService: ConstantsService,
    private eventService: EventService,
    private ticketService: TicketService,
    private userService: UserService
  ) {
    this.authorities = [];
    this.currentUser = null;
    this.eventList = [];
  }

  ngOnInit(): void {
    this.authorities = this.tokenStorageService.getAuthorities();
    const username = this.tokenStorageService.getUsername();
    if (username) {
      this.userService.getCurrentUser(username).subscribe((user: User) => this.currentUser = user);
    }
    this.eventService.getEvents().subscribe((eventList: Event[]) => this.eventList = eventList);
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

  onSubmit(): void {
    this.loggerService.log(this.form);
    this.submittedEvent = new Event(this.form.cityName, this.form.artist, this.form.price);
    this.eventService.addEvent(this.submittedEvent).subscribe(
      (addedEvent: Event) => {
        this.loggerService.log(`added event of id ${addedEvent.id}`);
        this.eventList.push(addedEvent);
      },
      error => {
        this.loggerService.log(error);
        this.eventFormErrorMessage = error.error.message;
      }
    );
  }

  sortedEvents(): Event[] {
    // tslint:disable-next-line:only-arrow-functions
    return this.eventList.sort(function(a, b): number {
      const aArtist = a.artist.toLocaleUpperCase();
      const bArtist = b.artist.toLocaleUpperCase();
      if (aArtist < bArtist) {
        return -1;
      }
      else if (aArtist > bArtist) {
        return 1;
      }
      return 0;
    });
  }

  deleteEvent(event: Event): void {
    this.eventList = this.eventList.filter(deletedEvent => deletedEvent !== event);
    this.eventService.deleteEvent(event).subscribe();
  }

  buyTicket(city: string, artist: string, price: number, amount: number): void {
    city = city.trim();
    artist = artist.trim();
    price = +price.toFixed(2);
    amount = +amount.toFixed(0);

    const user = this.currentUser;
    if (user) {
      this.ticketService.addTicket({city, artist, price, amount, user} as Ticket).subscribe((ticket: Ticket) => {
        this.currentUser.tickets.push(ticket);
        this.boughtTicket = ticket;
      });
    }
  }
}
