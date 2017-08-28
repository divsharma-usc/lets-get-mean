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
  constructor(private route: ActivatedRoute,
  private courseservice:CourseService,
  private sanitizer:DomSanitizer){
  }

  ngOnInit(){
        this.route.params.subscribe(params=>this.courseid=params["course"]);
        this.courseservice.getCourse(this.courseid).then((course)=>{
          this.course=course;
          this.baseurl="https://www.youtube.com/embed/";
          this.vedioid=course[0].vedio.vedio_url.split("v=")[1];
          this.url=this.sanitizer.bypassSecurityTrustResourceUrl(this.baseurl+this.vedioid);
        });
  }
  getUrl(url){
      this.vedioid=url.split("v=")[1];
      this.url=this.sanitizer.bypassSecurityTrustResourceUrl(this.baseurl+this.vedioid);

  }



}
