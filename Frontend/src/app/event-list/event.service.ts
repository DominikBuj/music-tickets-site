import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from './event.model';
import {LoggerService} from '../logger/logger.service';
import {catchError, tap} from 'rxjs/operators';
import {ConstantsService} from '../constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private loggerService: LoggerService, private constantsService: ConstantsService) { }

  /** EVENT GET */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.constantsService.EVENTS_URL);
  }

  /** EVENT GET ID */
  getEvent(id: number): Observable<Event> {
    const url = `${this.constantsService.EVENTS_URL}/${id}`;
    return this.http.get<Event>(url).pipe(
      tap(_ => this.loggerService.log(`got event of id ${id}`)),
      catchError(this.loggerService.handleError<Event>(`get event of id ${id}`))
    );
  }

  /** EVENT POST */
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.constantsService.ADMIN_EVENTS_URL, event, this.constantsService.HTTP_OPTIONS);
  }

  /** EVENT DELETE (ID) */
  deleteEvent(event: Event | number): Observable<Event> {
    const id = typeof event === 'number' ? event : event.id;
    const url = `${this.constantsService.ADMIN_EVENTS_URL}/${id}`;
    return this.http.delete<Event>(url, this.constantsService.HTTP_OPTIONS).pipe(
      tap(_ => this.loggerService.log(`deleted event of id ${id}`)),
      catchError(this.loggerService.handleError<Event>(`delete event of id ${id}`))
    );
  }
}
