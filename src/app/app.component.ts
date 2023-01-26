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
  ){

  }

  onLoaded(){
    console.log('log padre');
  }
  toggleImg(){
    this.showImg = !this.showImg;
  }
  createUser(){
    this.usersService.create({
      name: 'Alfred',
      email: 'alfred@gmail.com',
      password : 'alfred'
    }).subscribe(rta=>{
      console.log(rta);

    });
  }




}
