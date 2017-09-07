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
  setcolor:any;
  seta1:any;
  seta2:any;
  seta3:any;
  i:number;
  constructor(private router:Router,private http:Http){
    this.setcolor=["#30bce1","#22c2b1","#b068e6","#6a7c8e","#fa6d7d","#ed9c43"];
    this.seta1=[2,2,169,125,255,255];
    this.seta2=[179,204,181,151,162,84];
    this.seta3=[228,168,237,173,52,131];
    this.i=0;
  }
  ngOnInit(){
    this.http.get('http://localhost:3000/home/getAllCourses').subscribe(data=>{
      this.courses=JSON.parse(data['_body']);
      for(let course of this.courses){
          course["enroll"]=false;
      }
    });
    if(localStorage.getItem('currentUser')){
      this.isUser=true;
    }
    else{
      this.isUser=false;
    }
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
  getcolors(i):any{
     i=i%6;
     var b={background:'linear-gradient(rgba('+this.seta1[i]+','+this.seta2[i]+','+this.seta3[i]+','+'.8),rgba('+this.seta1[i]+','+this.seta2[i]+','+this.seta3[i]+','+'.8))'};
     return b;
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
