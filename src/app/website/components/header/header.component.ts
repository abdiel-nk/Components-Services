import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
  private categoriesService: CategoriesService,
  private router: Router

){
}
ngOnInit():void{
  this.storeService.myCart$.subscribe(product =>{
    this.counter = product.length;
  });
  this.authService.user$
  .subscribe(data=>{
    this.profile = data;
  })

  this.getAllCategories();
}

toggleMenu(){
  this.activeMenu = !this.activeMenu;
}
login(){
 this.authService.loginAndGet('alfred12345@gmail.com','alfred12345')
//  this.authService.loginAndGet('admin@mail.com','admin123')

  .subscribe(() =>{
    this.router.navigate(['/profile']);
  });
}
getAllCategories(){
  this.categoriesService.getAll()
  .subscribe(data =>{
    this.categories = data;
  });
}
logout(){
  this.authService.logout();
  this.profile = null;
  this.router.navigate(['/home']);
}

}
