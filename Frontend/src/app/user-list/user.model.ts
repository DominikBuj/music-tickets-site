import {Ticket} from '../user-tickets-list/ticket.model';
import {Role} from './role.model';

export class User {
  id: number;
  username: string;
  password: string;
  roles: Role[];
  tickets: Ticket[];

  constructor(username: string, password: string, roles: Role[]) {
    this.username = username;
    this.password = password;
    this.roles = roles;
  }
}
