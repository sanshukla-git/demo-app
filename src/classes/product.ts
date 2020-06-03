import { Price } from '../models/price';

export class Product {
  name: string;
  id: number;
  image: string;
  price: Price;
  stock: number;
  itemsInCart: number;

  constructor(
    id: number,
    name: string,
    image: string,
    price: Price,
    stock: number
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.stock = stock;
  }
}
