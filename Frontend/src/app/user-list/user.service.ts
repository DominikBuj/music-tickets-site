import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from '../logger/logger.service';
import {ConstantsService} from '../constants/constants.service';
import {Observable} from 'rxjs';
import {User} from './user.model';
import {catchError, tap} from 'rxjs/operators';
import {Ticket} from '../user-tickets-list/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private loggerService: LoggerService, private constantsService: ConstantsService) { }

  /** USER GET */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.constantsService.ADMIN_USERS_URL);
  }

  /** USER GET ID */
  getUser(id: number): Observable<User> {
    const url = `${this.constantsService.ADMIN_USERS_URL}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.loggerService.log(`got user of id ${id}`)),
      catchError(this.loggerService.handleError<User>(`get user of id ${id}`))
    );
  }

  /** CURRENT USER GET */
  getCurrentUser(username: string): Observable<User> {
    const url = `${this.constantsService.EITHER_USERS_URL}/${username}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.loggerService.log(`got user ${username}`)),
      catchError(this.loggerService.handleError<User>(`get user  ${username}`))
    );
  }
}
