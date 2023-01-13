import { Component, OnInit } from '@angular/core';
import {Product, CreateProductDTO, UpdateProductDTO} from '../../models/product.model';
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
      description: "Celular de alta gama, 6ta generación",
    }
    const id= this.productChosen.id;
    this.productService.update(id, changes).subscribe(
      data =>{
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products[productIndex]= data;
      });
  }


}
