import  'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { CourseService } from '../services/course.service';

import { Course, Vedios } from '../models/course';


@Component({
  templateUrl: './editCourse.component.html',
  styleUrls:[
    './editCourse.component.scss'
  ]
})
export class EditCourseComponent implements OnInit{
  private course:any;
  private courseid:string;

  courseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private courseService:CourseService,
    private fb: FormBuilder){
     this.createForm(); }

   ngOnInit(){
     console.log('initiating');
         this.route.params.subscribe(params=>this.courseid=params["course"]);
         this.courseService.getCourse(this.courseid).then((course)=>{
           this.course=course;
           this.fillForm();
         })
   }
   initvedio(vedio){
     return this.fb.group({
       vedio_title:[vedio.vedio_title],
       vedio_url:[vedio.vedio_url]
     })
   }
   setVediosUrl(ved:Vedios[]){
     const vediosFGs=ved.map(vedio=>this.fb.group(vedio));
     const vediosFormArray=this.fb.array(vediosFGs);
     this.courseForm.setControl('secretLairs',vediosFormArray);
   }
   get secretLairs(): FormArray{
      return this.courseForm.get('secretLairs') as FormArray;
   }
   createForm(){
       this.courseForm=this.fb.group({
       title: '',
       courseid: '',
       description: '',
       author:'',
       no_of_vedios: '',
       secretLairs: this.fb.array([])
     });
   }
   addLair(vedio) {
      const control=<FormArray>this.courseForm.controls['secretLairs'];
      control.push(this.initvedio(vedio));
   }
    fillForm(){
      console.log(this.course.vedios);
      this.courseForm.patchValue({
       courseid: this.course.course_id,
       title: this.course.title,
       description: this.course.description,
       author: this.course.author,
       no_of_vedios: this.course.NoOfVedios
     });
     for(let vedio of this.course.vedios ){
       console.log('hello');
       this.addLair(vedio);
     }
  }

}
