import { Component, Input, EventEmitter, Output } from '@angular/core';
import {Product, CreateProductDTO, UpdateProductDTO} from '../../models/product.model';
import {StoreService} from '../../services/store.service';
import {ProductsService} from  '../../services/products.service';
import Swal from 'sweetalert2';
import {switchMap} from 'rxjs/operators';
import {zip} from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  myShoppingCart : Product[] = [];
  total = 0;
  @Input() products: Product [] = [];
  @Output() onLoadMore:
  EventEmitter<string> = new EventEmitter<string>();
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
    description: '',
  };

  statusDetail : 'loading' | 'success'|'error'|'init'='init';

constructor(
  private storeService : StoreService,
  private productService: ProductsService
  ){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }


  onAddToShoppingCart(product:Product){
  this.storeService.addProduct(product);
  this.total =  this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail ;
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productService.getProduct(id).subscribe(data =>{
      this.productChosen = data;
      this.statusDetail ='success';
    }, errorMsg =>{
      this.statusDetail = 'error'
      Swal.fire({
        title: errorMsg,
        text: errorMsg,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    })
  }
  readUpdate(id: string){
      this.productService.getProduct(id)
    .pipe(
      switchMap((product) =>   this.productService.update(product.id, {title: 'change'})),
    )
    .subscribe(data =>{
      console.log(data);
    });

    this.productService.fetchReadAndUpdate(id, {title: 'change'})
      .subscribe(response =>{
        const read  = response [0];
        const update = response [1];
      })
    }


  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Iphone 14',
      description: 'Celular de última gama',
      images: ['https://miportal.entel.pe/static/112820220859344/images/iphone_14_pro_silver_frontal1_276x549.jpg,https://coolboxpe.vtexassets.com/arquivos/ids/234639-1200-auto?v=638022336195830000&width=1200&height=auto&aspect=true'],
      price: 1000,
      categoryId:2,

    }
    this.productService.create(product).
    subscribe(data =>{
      console.log('created',data);
      this.products.unshift(data);
    });
  }
  updateProduct(){
    const changes: UpdateProductDTO = {
      description: "Celular de alta gama, 5ta generación",
    }
    const id= this.productChosen.id;
    this.productService.update(id, changes).subscribe(
      data =>{
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products[productIndex]= data;
        this.productChosen = data;
      });
    }
  deleteProduct(){
      const id= this.productChosen.id;
      this.productService.delete(id).subscribe(() =>{
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.splice(productIndex,1);
        this.showProductDetail = false;

    });
  }
  loadMore() {
    this.onLoadMore.emit();
}
  // loadData(){
  //   this.productService.getAllProducts(this.limit, this.offset).subscribe(data =>{
  //    this.products= this.products.concat(data);
  //    this.offset += this.limit;
  //   });
  // }

}
