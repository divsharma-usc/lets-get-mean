import  'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CourseService } from '../services/course.service';

import { Course } from '../models/course';


@Component({
  templateUrl: './editCourse.component.html',
  styleUrls:[
    './editCourse.component.scss'
  ]
})
export class EditCourseComponent implements OnInit{
  private course:any;
  constructor(private route: ActivatedRoute, private courseService:CourseService){}
   ngOnInit(){
     this.route.paramMap.switchMap((params: ParamMap)=>
         this.courseService.getCourse(params.get('id'))).subscribe(course=>this.course=course);
   }

}
