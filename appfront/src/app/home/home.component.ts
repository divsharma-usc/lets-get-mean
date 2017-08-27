import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { User } from '../models/user';
import { Course } from '../models/course';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
   courses:any;
   constructor(private http:Http){}
   ngOnInit():void{
       this.http.get('http://localhost:3000/home').subscribe(data=>{
         this.courses=JSON.parse(data['_body']);
       })
   }
}
