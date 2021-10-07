import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventListComponent } from './event-list/event-list.component';
import {LoggerService} from './logger/logger.service';
import {EventService} from './event-list/event.service';
import {ConstantsService} from './constants/constants.service';
import {AuthInterceptor} from './auth/auth.interceptor';
import { UserTicketsListComponent } from './user-tickets-list/user-tickets-list.component';
import { UserListComponent } from './user-list/user-list.component';
import {TicketService} from './user-tickets-list/ticket.service';
import {UserService} from './user-list/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

const  HTTP_INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventListComponent,
    UserTicketsListComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS,
    EventService,
    TicketService,
    UserService,
    LoggerService,
    ConstantsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
