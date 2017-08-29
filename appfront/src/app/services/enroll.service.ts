import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Course } from '../models/course';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EnrollService{
  private headers=new Headers({'Content-Type':'application/json'});
  constructor(private http: Http){
  }
  improvePerformace(courseId,userId,vedioId):Promise<boolean>{
    console.log('hello');
    return this.http.post('http://localhost:3000/enroll',JSON.stringify({course_id:courseId,user_id:userId,vedio_id:vedioId}),{headers: this.headers}).toPromise()
    .then(res=>{
        return true;
    });
  }
  getEnrollment(courseId:any,userId:any):Promise<any>{
    const url=`http://localhost:3000/enroll/${courseId}/${userId}`;
    return this.http.get(url).toPromise().then(data=>{
        return JSON.parse(data['_body'])[0];
    })
  }
}
