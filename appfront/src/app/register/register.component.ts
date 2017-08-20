import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html'
})
export class RegisterComponent{
    constructor(private userService: AuthenticationService){}
     onSubmit(f:NgForm):void{
      this.userService.signup(f.value.email,f.value.username,f.value.passoword).then();
    }
}
