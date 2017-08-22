import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes=[
   { path : '', component : HomeComponent, canActivate:[AuthGuard]},
   { path: 'login', component : LoginComponent},
   { path : 'signup', component: RegisterComponent},
   { path : ' **',redirectTo: ''}
];

@NgModule({
  imports:[
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    )
  ],
  exports:[
    RouterModule
  ],
  providers: [
    AuthGuard
  ],
})
export class AppRoutingModule{}
