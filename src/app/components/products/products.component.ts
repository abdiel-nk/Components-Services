import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {StoreService} from '../../services/store.service';
import {ProductsService} from  '../../services/products.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  myShoppingCart : Product[] = [];
  total = 0;
  products: Product [] = [];
  showProductDetail= false;
  today = new Date;
  productChosen: Product = {
    id:'',
    title: '',
    price: 0,
    images: [],
    category:{
      id: '',
      name:'',
    },
    description: ''
  }

constructor(
  private storeService : StoreService,
  private productService: ProductsService
  ){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
//Aquí va métodos asincronos
ngOnInit(): void{
  this.productService.getAllProducts().subscribe(data =>{
   this.products= data;
  });
}

  onAddToShoppingCart(product:Product){
  this.storeService.addProduct(product);
  this.total =  this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail ;
  }

  onShowDetail(id: string){
    this.productService.getProduct(id).subscribe(data =>{
      console.log('product', data);
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }
  createNewProduct(){
    const product: Product = {
      title: 'Iphone 12',
      description: '',
      images: [''],
      price: 1000,

    }
    this.productService.create()
  }

}
