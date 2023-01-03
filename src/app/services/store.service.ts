import { Injectable } from '@angular/core';
import {Product} from '../models/product.model';
import { BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

private myShoppingCart : Product[] = [];
private myCart = new BehaviorSubject<Product[]>([]);

myCart$ = this.myCart.asObservable();
  constructor() { }

  //Add product
  addProduct(product: Product){
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
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
