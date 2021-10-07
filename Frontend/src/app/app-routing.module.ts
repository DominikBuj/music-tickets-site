import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {EventListComponent} from './event-list/event-list.component';
import {UserTicketsListComponent} from './user-tickets-list/user-tickets-list.component';
import {UserListComponent} from './user-list/user-list.component';

const routes: Routes = [
  { path: 'authentication/login', component: LoginComponent},
  { path: 'authentication/signup', component: RegisterComponent},
  { path: 'events', component: EventListComponent},
  { path: 'tickets', component: UserTicketsListComponent},
  { path: 'users', component: UserListComponent},
  { path: '', redirectTo: 'events', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
