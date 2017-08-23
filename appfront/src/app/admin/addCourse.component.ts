import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Vedios, Course } from  '../models/course';
import 'rxjs/add/operator/map';

@Component({
 templateUrl: './addCourse.component.html',
 styleUrls: ['./addCourse.component.scss']
})

export class AddCourseComponent implements OnChanges{
  @Input() course: Course;

  courseForm: FormGroup;
  constructor(private fb: FormBuilder){
     this.createForm();
  }
  createForm(){
    this.courseForm=this.fb.group({
      course_id: '',
      title: '',
      description:'',
      author:'',
      no_of_vedios: '',
      secretLairs: this.fb.array([])
    });
  }
  ngOnChanges() {
    this.setVediosUrl(this.course.vedios_links);
  }
  setVediosUrl(ved:Vedios[]){
    const vediosFGs=ved.map(vedio=>this.fb.group(vedio));
    const vediosFormArray=this.fb.array(vediosFGs);
    this.courseForm.setControl('secretLairs',vediosFormArray);
  }
  get secretLairs(): FormArray{
     return this.courseForm.get('secretLairs') as FormArray;
  }
  addLair() {
  this.secretLairs.push(this.fb.group(new Vedios()));
  }
  onSubmit(formval:any):void{
    console.log(formval);
  }
}
