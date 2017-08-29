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
  private uta:any;
  private state:any;
  private play:any;
  private vedios:any;
  private user:any;
  private enrollment:any;
  private vediop:any;
  constructor(private route: ActivatedRoute,
  private courseservice:CourseService,
  private sanitizer:DomSanitizer,
  private enrollservice: EnrollService,
  private location:Location){
       this.play=true;
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
        });


    }
   getUrl(url){
      this.vedioid=url.split("v=")[1];
   }
   change(){
     this.play=!this.play;
     this.getUrl(this.course.vedios[0].vedio_url);
     this.urldoc=  {'videoId': this.vedioid,
                    'startSeconds': 5,
                    'endSeconds': 60,
                    'suggestedQuality': 'large'};
      this.utb=window["playme"];
      this.uta=window["playmestate"];
      this.state=this.uta();
      this.vediop=this.course.vedios[0]._id;
      if(this.state==0){
              if(!this.vedioidarray.includes(this.course.vedio[0]._id)){
                this.enrollservice.improvePerformace(this.course._id,this.user._id,this.course.vedio[0]._id).then(res=>{
                    if(res){
                      this.vedioidarray.push(this.course.vedio[0]._id);
                    }
                });
              }
      }
      this.utb(this.urldoc);
   }
   clickfunction(course,vedioid){
      this.getUrl(course)
      this.urldoc=  {'videoId': this.vedioid,
             'startSeconds': 5,
             'endSeconds': 60,
             'suggestedQuality': 'large'};
       this.utb=window["playme"];
       this.uta=window["playmestate"];
       this.state=this.uta();
       if(this.state===0){
              if(!this.vedioidarray.includes(this.vediop)){
                 this.enrollservice.improvePerformace(this.course._id,this.user._id,this.vediop).then(res=>{
                   if(res){
                     this.vedioidarray.push(this.vediop);
                   }
                 });

              }
       }
       this.vediop=vedioid;
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
