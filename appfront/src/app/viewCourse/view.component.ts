import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from  '../services/course.service';

@Component({
  templateUrl: './view.component.html',
  styleUrls: [ './view.component.scss']
})

export class ViewComponent{
  private courseid:any;
  private course:any;

  constructor(private route: ActivatedRoute,
  private courseservice:CourseService){}
  ngOnInit(){
        this.route.params.subscribe(params=>this.courseid=params["course"]);
        this.courseservice.getCourse(this.courseid).then((course)=>{
          this.course=course;
        });
  }

}
