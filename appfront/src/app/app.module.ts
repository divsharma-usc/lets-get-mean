import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes=[
   { path : '', component : HomeComponent, canActivate:[AuthGuard]},
   { path : 'signup', component: RegisterComponent},
   { path: 'login', component : LoginComponent},
   { path : ' **',redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true }
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
  })
export class AppModule { }
