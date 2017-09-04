import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot ,RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class AuthGuardAdmin implements CanActivate{
  constructor(private router: Router,private authenticationService: AuthenticationService){
  }
  canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
    console.log('Auth Guard Admin');
    const payLoad=JSON.parse(localStorage.getItem('currentUser')).token.split('.')[1];
    console.log(payLoad);
    const user=JSON.parse(atob(payLoad));
     return this.authenticationService.getUser(user._id).then((user)=>{
       console.log(user.role);
        if(user.role===0){
            return true;
        }
        else{
           this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
           return false;
        }
    });
}
}
