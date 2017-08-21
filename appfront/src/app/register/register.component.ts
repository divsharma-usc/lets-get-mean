import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html'
})
export class RegisterComponent{
    constructor(private userService: AuthenticationService,private router:
      Router){}
     onSubmit(f:NgForm):void{
      this.userService.signup(f.value.email,f.value.username,f.value.password).then((res)=>{
        if(res){
             this.router.navigate(['']);
        }
        else{
             this.router.navigate(['/login']);
        }
      });
    }
}
