import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';
import {AuthService} from '../../services/auth.service';
import {User } from '../../models/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

activeMenu = false;
counter = 0 ;

profile: User | null = null;
constructor(
  private storeService : StoreService,
  private authService: AuthService,
){
}
ngOnInit():void{
  this.storeService.myCart$.subscribe(product =>{
    this.counter = product.length;
  })
}

toggleMenu(){
  this.activeMenu = !this.activeMenu;
}
login(){
  this.authService.loginAndGet('alfred@gmail.com','alfred').subscribe(user =>{
    this.profile= user;
  });
}

}
