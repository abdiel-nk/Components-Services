import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../services/store.service';
import {AuthService} from '../../../services/auth.service';
import {User } from '../../../models/user.model';
import {CategoriesService} from '../../../services/categories.service';
import { Category } from '../../../models/product.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

activeMenu = false;
counter = 0 ;
profile: User | null = null;
categories: Category [] =  [] ;
constructor(
  private storeService : StoreService,
  private authService: AuthService,
  private categoriesService: CategoriesService
){
}
ngOnInit():void{
  this.storeService.myCart$.subscribe(product =>{
    this.counter = product.length;
  });
  this.getAllCategories();
}

toggleMenu(){
  this.activeMenu = !this.activeMenu;
}
login(){
  this.authService.loginAndGet('alfred1234@gmail.com','alfred1234').subscribe(user =>{
    this.profile= user;
  });
}
getAllCategories(){
  this.categoriesService.getAll()
  .subscribe(data =>{
    this.categories = data;
  });
}

}
