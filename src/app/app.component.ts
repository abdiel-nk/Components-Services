import { Component } from '@angular/core';
//import {Product} from './models/product.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  onLoaded(){
    console.log('log padre');
  }
  toggleImg(){
    this.showImg = !this.showImg;
  }
}
