import { Component, OnInit } from '@angular/core';
import {ProductsService} from  '../../services/products.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product [] = [];
  limit= 10;
  offset = 0;
  constructor(
    private productService : ProductsService
  ){}

  //Aquí va métodos asincronos
    ngOnInit(): void{
    this.productService.getProductsByPage(10,0).subscribe(data =>{
     this.products= data;
     this.offset += this.limit;
      });
    }
    loadMore(): void {
    this.productService.getAllProducts(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data.filter(product => product.images.length > 0));
        this.offset += this.limit;
      });
  }

}
