import { Component } from '@angular/core';
import {environment} from './../environments/environment';
import {AuthService } from './services/auth.service';
import {UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';

  constructor(
  private usersService: UsersService
  ){  }

  onLoaded(){
    console.log('log padre');
  }
  toggleImg(){
    this.showImg = !this.showImg;
  }
  createUser(){
    this.usersService.create({
      name: 'Alfredo123',
      email: 'alfred123@gmail.com',
      password : 'alfred123'
    }).subscribe(rta=>{
      console.log(rta);

    });
  }
}
