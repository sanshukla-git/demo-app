import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Product } from '../../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl: string = '/assets/data/inventory.json';

  constructor(private http:HttpClient) { }

  getProducts () {
    return this.http.get<Product[]>(this.productsUrl);
  }
}
