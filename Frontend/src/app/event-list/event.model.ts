export class Event {
  id: number;
  city: string;
  artist: string;
  price: number;

  constructor(city: string, artist: string, price: number) {
    this.city = city;
    this.artist = artist;
    this.price = price;
  }
}
