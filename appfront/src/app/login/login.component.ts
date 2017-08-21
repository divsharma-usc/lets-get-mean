import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent{
  constructor(private userService: AuthenticationService,private router: Router){}
  onSubmit(f:NgForm):void{
   this.userService.login(f.value.email,f.value.password).then((res)=>{
     if(res){
          this.router.navigate(['']);
     }
     else{
          this.router.navigate(['/login']);
     }
   });
 }
}
