import { Injectable } from '@angular/core';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

private myShoppingCart : Product[] = [];
  constructor() { }

  //Add product
  addProduct(product: Product){
    this.myShoppingCart.push(product);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }
  //get total
  getTotal(){
    return this.myShoppingCart.reduce((sum, item)=>
    sum + item.price, 0
    );}
}
