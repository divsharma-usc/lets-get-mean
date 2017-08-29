import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from  '../services/course.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  currentRate;
  max=5;
  private urldoc:any;
  private utb:any;
  private uta:any;
  private state;
  private play;
  constructor(private route: ActivatedRoute,
  private courseservice:CourseService,
  private sanitizer:DomSanitizer){
       this.play=true;
  }

  ngOnInit(){
        this.route.params.subscribe(params=>this.courseid=params["course"]);
        this.courseservice.getCourse(this.courseid).then((course)=>{
        this.course=course;
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
      this.utb(this.urldoc);
   }
   clickfunction(course){
      this.getUrl(course)
      this.urldoc=  {'videoId': this.vedioid,
             'startSeconds': 5,
             'endSeconds': 60,
             'suggestedQuality': 'large'};
       this.utb=window["playme"];
       this.uta=window["playmestate"];
       this.state=this.uta();
       console.log(this.state);
       this.utb(this.urldoc);
 }



}
