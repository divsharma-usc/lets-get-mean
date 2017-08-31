import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from  '../services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { EnrollService } from '../services/enroll.service';

@Component({
  templateUrl: './view.component.html',
  styleUrls: [ './view.component.scss'],
})

export class ViewComponent{
  private courseid:any;
  private course:any;
  private baseurl:string;
  private url;
  private vedioid;
  private vedioidarray=[];
  currentRate;
  max=5;
  private urldoc:any;
  private utb:any;
  private play:any;
  private vedios:any;
  private user:any;
  private enrollment:any;
  private vediop:any;
  private utl:any;
  private first:any;
  private courses:any;
  constructor(private route: ActivatedRoute,
  private courseservice:CourseService,
  private sanitizer:DomSanitizer,
  private enrollservice: EnrollService,
  private location:Location){
    this.play=true;
    this.first=true;
 }
  ngOnInit(){
        this.user=JSON.parse(localStorage["currentUser"]).token.split('.')[1];
        this.user=JSON.parse(atob(this.user));
        this.route.params.subscribe(params=>this.courseid=params["course"]);
        this.courseservice.getCourse(this.courseid).then((course)=>{
               this.course=course;
               this.currentRate=this.course.rating;
               this.enrollservice.getEnrollment(this.course._id,this.user._id).then(res=>{
                             this.vedios=res["performace"];
                             for(let ved of this.vedios){
                                       this.vedioidarray.push(ved._id);
                             }
               });
               if(localStorage.getItem("play")){
                       localStorage.removeItem("play");
                       this.courses=true;
               }
               else{
                       localStorage.setItem("play","false");
                       this.courses=false;
                       window.location.reload();
               }
        });
    }
   getUrl(url){
      this.vedioid=url.split("v=")[1];
   }
   change(){
        console.log(this.course);
        this.getUrl(this.course.vedios[0].vedio_url);
        this.urldoc=  {   'videoId': this.vedioid,
                         'startSeconds': 5,
                         'endSeconds': 60,
                         'suggestedQuality': 'large'};
        this.utb=window["playme"];
        this.play=false;
        this.utb(this.urldoc);
        if(!this.vedioidarray.includes(this.course.vedios[0]._id)){
               return  this.enrollservice.improvePerformace(this.course._id,this.user._id,this.course.vedios[0]._id).then(res=>{
                    if(res){
                      this.vedioidarray.push(this.course.vedios[0]._id);
                    }
            });
      }


   }
   clickfunction(course,vedioid){
      this.play=false;
      if(localStorage.getItem("play"))
            localStorage.removeItem("play")
      this.getUrl(course)
      this.urldoc=  {'videoId': this.vedioid,
             'startSeconds': 5,
             'endSeconds': 60,
             'suggestedQuality': 'large'};
       this.utb=window["playme"];
       this.vediop=vedioid;
              if(!this.vedioidarray.includes(this.vediop)){
                 this.enrollservice.improvePerformace(this.course._id,this.user._id,this.vediop).then(res=>{
                   if(res){
                     this.vedioidarray.push(this.vediop);
                     this.vediop=vedioid;
                   }
                 });

              }
       this.utb(this.urldoc);

    }
  goBack(){
            this.location.back();
    }
  checkvedioid(vedioid){
    if(this.vedioidarray.includes(vedioid)){
      return true;
    }
    else{
      return false;
    }
  }
}
