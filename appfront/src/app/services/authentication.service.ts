import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AuthenticationService{
  public token:string;
  constructor(private http: Http){
    var currentUser=JSON.parse(localStorage.getItem('currentUser'));
    this.token=currentUser && currentUser.token;
  }
  login(email: string,password: string):Promise<boolean>{
    return this.http.post('localhost:3000/login',JSON.stringify({email:email,password:password})).toPromise()
    .then(function(res){
      let token=res.json() && res.json().token;
      if(token){
        this.token=token;
        localStorage.setItem('currentUser',JSON.stringify({token:token}));
        return true;
      }
      else{
        return false;
      }
    });
  }
  signup(email: string, username:string, password:string):Promise<boolean>{
    return this.http.post('/',JSON.stringify({email:email,username:username,password:password})).toPromise()
    .then(function(res){
      let token=res.json() && res.json().token;
      if(token){
        this.token=token;
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
