import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { Course } from '../models/course';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
   courses:any;
   enrollcourses:any;
   setcolor:any
   seta1:any;
   seta2:any;
   seta3:any;
   images=['a.jpg','b.jpg','c.jpg','d.jpg','e.jpg','f.jpg']
   constructor(private http:Http,
   private router:Router){
      this.setcolor=["#30bce1","#22c2b1","#b068e6","#6a7c8e","#fa6d7d","#ed9c43"];
      this.seta1=[2,2,169,125,255,255];
      this.seta2=[179,204,181,151,162,84];
      this.seta3=[228,168,237,173,52,131];
   }
   ngOnInit():void{
       this.http.get('http://localhost:3000/home').subscribe(data=>{
         this.courses=JSON.parse(data['_body']);
         for(let course of this.courses){
             course["enroll"]=false;
         }
         this.checkCourse();
       })


   }
   enroll(course):void{
     const payLoad=JSON.parse(localStorage.getItem('currentUser')).token.split('.')[1];
     const user=JSON.parse(atob(payLoad));
     const url=`http://localhost:3000/home/enroll/${course._id}/${user._id}`;
     this.http.get(url).subscribe(res=>{
         if(res){
           this.router.navigate(['/viewCourse',course._id]);
         }
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
     var b={background:'linear-gradient(rgba('+this.seta1[i]+','+this.seta2[i]+','+this.seta3[i]+','+'.8),rgba('+this.seta1[i]+','+this.seta2[i]+','+this.seta3[i]+','+'.8)),url(/assets/images/'+this.images[i]+')'}
     console.log(b);
     return b;
  }

 }
