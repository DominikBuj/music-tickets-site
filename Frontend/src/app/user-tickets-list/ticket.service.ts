import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from '../logger/logger.service';
import {ConstantsService} from '../constants/constants.service';
import {Observable} from 'rxjs';
import {Ticket} from './ticket.model';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private loggerService: LoggerService, private constantsService: ConstantsService) {}

  /** TICKET POST */
  addTicket(ticket: Ticket): Observable<Ticket> {
    const url = `${this.constantsService.USER_USERS_URL}/${ticket.user.username}/tickets`;
    return this.http.post<Ticket>(url, ticket, this.constantsService.HTTP_OPTIONS).pipe(
      tap((addedTicket: Ticket) => this.loggerService.log(`added ticket of id ${addedTicket.id}`)),
      catchError(this.loggerService.handleError<Ticket>(`post ticket`))
    );
  }

  /** TICKET DELETE (ID) */
  deleteTicket(ticket: Ticket | number, username: string): Observable<Ticket> {
    const id = typeof(ticket) === 'number' ? ticket : ticket.id;
    const url = `${this.constantsService.USER_USERS_URL}/${username}/tickets/${id}`;
    return this.http.delete<Ticket>(url, this.constantsService.HTTP_OPTIONS).pipe(
      tap(_ => this.loggerService.log(`deleted ticket of id ${id}`)),
      catchError(this.loggerService.handleError<Ticket>(`delete ticket of id ${id}`))
    );
  }
}
