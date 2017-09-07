import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { Course } from '../models/course';
import {Observable} from 'rxjs/Rx';
@Component({
  templateUrl :'./allCourses.component.html',
  styleUrls:[
    './allCourses.component.scss',
  ]
})
export class AllCoursesComponent{
  courses:any;
  enrollcourses:any;
  isUser:boolean;
  constructor(private router:Router,private http:Http){}
  ngOnInit(){
    this.http.get('http://localhost:3000/home/getAllCourses').subscribe(data=>{
      this.courses=JSON.parse(data['_body']);
      for(let course of this.courses){
          course["enroll"]=false;
      }
    });
  }
  enroll(course):void{
    const payLoad=JSON.parse(localStorage.getItem('currentUser')).token.split('.')[1];
    const user=JSON.parse(atob(payLoad));
    const url=`http://localhost:3000/home/enroll/${course._id}/${user._id}`;
    this.http.get(url).subscribe(res=>{
        if(res){
          this.router.navigate(['/viewCourse',course._id]);
        }
        this.checkCourse();
    })
   if(localStorage.getItem('currentUser')){
     this.isUser=true;
   }
   else{
     this.isUser=false;
   }
  }
  goto(course):void{
         this.router.navigate(['/viewCourse',course._id]);
  }
  checkCourse():void{
    const payLoad=JSON.parse(localStorage.getItem('currentUser')).token.split('.')[1];
    const user=JSON.parse(atob(payLoad));
    const url=`http://localhost:3000/home/checkCourse/${user._id}`;
     this.http.get(url).subscribe(data=>{
        this.enrollcourses=JSON.parse(data["_body"]);
        for(let course of this.courses){
             for(let enroll of this.enrollcourses){
                  if(course._id===enroll.course&&course.enroll===false)
                    course["enroll"]=true;
             }
        }
     });

  }
  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
  start(){
    this.router.navigate(['/login']);
  }
  login(){
    this.router.navigate(['/login']);
  }
  signup(){
    this.router.navigate(['/signup']);
  }
}
