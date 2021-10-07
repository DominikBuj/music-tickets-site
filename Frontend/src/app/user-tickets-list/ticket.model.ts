import {User} from '../user-list/user.model';

export class Ticket {
  id: number;
  city: string;
  artist: string;
  price: number;
  amount: number;
  user: User;

  constructor(city: string, artist: string, price: number, amount: number, user: User) {
    this.city = city;
    this.artist = artist;
    this.price = price;
    this.amount = amount;
    this.user = user;
  }
}
