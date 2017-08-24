import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService{
  public token:string;
  private headers=new Headers({'Content-Type':'application/json'});
  constructor(private http: Http){
    var currentUser=JSON.parse(localStorage.getItem('currentUser'));
    this.token=currentUser && currentUser.token;
  }
  login(email: string,password: string):Promise<boolean>{
    return this.http.post('http://localhost:3000/login',JSON.stringify({email:email,password:password}),{headers:this.headers}).toPromise()
    .then(function(res){
      let token=res.json() && res.json().token;
      console.log(token);
      if(token){
        localStorage.setItem('currentUser',JSON.stringify({token:token}));
        return true;
      }
      else{
        return false;
      }
    });
  }
  signup(email: string, username:string, password:string):Promise<boolean>{
     return this.http.post('http://localhost:3000/signup',JSON.stringify({email:email,username:username,password:password}),{headers:
	 this.headers}).toPromise()
    .then(function(res){
      let token=res.json() && res.json().token;
      if(token){
        localStorage.setItem('currentUser',JSON.stringify({token:token}));
        return true;
      }
      else{
        return false;
      }
    });
  }
  logout():void{
    this.token=null;
    localStorage.removeItem('currentUser');
  }
}
