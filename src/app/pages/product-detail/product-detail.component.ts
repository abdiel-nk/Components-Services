import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../models/product.model';
import {switchMap} from 'rxjs/operators';
import{ProductsService} from './../../services/products.service';
//import {Location} from '@angular/common';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
productId: string | null = null;
product: Product | null = null;
constructor(
  private route: ActivatedRoute,
  private productService :ProductsService,
  //private location: Location,
  private myRoute: Router


){}

ngOnInit(): void{
  this.route.paramMap
  .pipe(
    switchMap(params=>{
      this.productId = params.get('id');
      if (this.productId){
          return this.productService.
          getProduct(this.productId);
        }
      return [null];
    })
  )
  .subscribe(data=>{
    this.product = data;
  });
  }
  goBack(){
    this.myRoute.navigateByUrl('home');
  }

}
