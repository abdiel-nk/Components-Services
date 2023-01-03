import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

activeMenu = false;
counter = 0 ;
constructor(
  private storeService : StoreService
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

}
