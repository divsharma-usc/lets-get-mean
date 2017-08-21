import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent{
  constructor(private userService: AuthenticationService){}
  onSubmit(f:NgForm):void{
   this.userService.login(f.value.email,f.value.password).then();
 }
}
