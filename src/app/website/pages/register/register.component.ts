import { Component } from '@angular/core';
import {OnExit} from './../../../guards/exit.guard';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

constructor(){}
onExit() {
  const rta =
  Swal.fire({
    title: 'Are you sure you want to exit',
    showDenyButton: true,
    confirmButtonText: 'Yes'
    }).then((result)=>{
      if(result.isConfirmed){
        return true;
      }
      return false;
    });
  return rta;
}
}
