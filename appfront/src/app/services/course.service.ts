import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Course } from '../models/course';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService{
  courses :Course[];
  private headers=new Headers({'Content-Type':'application/json'});
  constructor(private http: Http){
  }
  addNewCourse(newCourse: Course):Promise<boolean>{
    return this.http.post('http://localhost:3000/newCourse',JSON.stringify(newCourse),{headers: this.headers}).toPromise()
    .then(res=>{
        return true;
    });
  }
  delete(course: any):Promise<void>{
    console.log(course._id);
    const url=`http://localhost:3000/newCourse/deletecourse/${course._id}`;
     return this.http.delete(url,{headers:this.headers})
           .toPromise().then(()=>{});
  }
}
