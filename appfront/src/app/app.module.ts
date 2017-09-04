import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AddCourseComponent } from './admin/addCourse.component';
import { CoursesComponent } from './admin/courses.component';
import { EditCourseComponent } from './admin/editCourse.component';
import { ViewComponent } from './viewCourse/view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module'

import { AuthenticationService } from './services/authentication.service';
import { CourseService } from './services/course.service';
import { EnrollService } from './services/enroll.service';

import { AuthGuard } from './guards/auth.guard';
import { AuthGuardAdmin } from './guards/authAdmin.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    AddCourseComponent,
    CoursesComponent,
    EditCourseComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    CourseService,
    EnrollService,
    AuthGuard,
    AuthGuardAdmin
  ],
  bootstrap: [AppComponent]
  })
export class AppModule { }
