import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AddCourseComponent } from './admin/addCourse.component';
import { CoursesComponent } from './admin/courses.component';
import { EditCourseComponent } from './admin/editCourse.component';
import { ViewComponent } from './viewCourse/view.component';
import { AllCoursesComponent } from './allCourses/allCourses.component';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuardAdmin } from './guards/authAdmin.guard';

const appRoutes: Routes=[
   { path : '', component : HomeComponent},//, canActivate:[AuthGuard]
   { path: 'login', component : LoginComponent},
   { path : 'signup', component: RegisterComponent},
   { path : 'admin',
     component: AdminComponent,
     children:[
         {
           path:'newcourse',
          component: AddCourseComponent
         },
         {
           path:'courses',
           component: CoursesComponent,
         },
         {
           path:'editCourse/:course',
           component: EditCourseComponent
         }
      ],
      canActivate:[AuthGuardAdmin]
    },
   { path: 'viewCourse/:course',component: ViewComponent},
   { path: 'allCourses',component: AllCoursesComponent},
   { path : ' **',redirectTo: ''}
];

@NgModule({
  imports:[
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    ),
   RouterModule.forChild(appRoutes)
  ],
  exports:[
    RouterModule
  ],
  providers: [
    AuthGuard
  ],
})
export class AppRoutingModule{}
