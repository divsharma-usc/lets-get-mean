import  { Component, OnInit } from '@angular/core';
import  { Http } from '@angular/http';

import  { CourseService } from '../services/course.service';
import  { Course } from '../models/course';

import  { Observable } from 'rxjs/Observable';
@Component({
  templateUrl: './courses.component.html',
  styleUrls: [
    './courses.component.scss'
  ]
})

export class CoursesComponent implements OnInit{
    courses: Course[];
    course: Course;

    constructor(private courseService: CourseService,private http: Http){}

    ngOnInit():void{
      this.http.get('http://localhost:3000/newCourse').subscribe(data=>{
         this.courses=JSON.parse(data['_body']);
      });
    }
    delete(course:any):void{
      this.courseService.delete(course).then(()=>{
        this.courses=this.courses.filter(c=>c!=course);
      });
    }
}
