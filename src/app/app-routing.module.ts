import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Authentication/sign-in/sign-in.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { HomeComponent } from './Home/view.component';
import { AuthenticationGuard } from './Authentication/AuthGuard/authentication.guard';
import { EntryAuthenticationGuard } from './Authentication/AuthGuard/entry.guard';
import { WorkerInfoComponent } from "./WorkerInfo/view.component";

const routes: Routes = [
  {
    path           : '',
    pathMatch      : 'full',
    redirectTo     : '/admin/sign-in',
    data           : {title: 'sign-in'}
  },
  {
    path             : 'admin/sign-up',
    pathMatch        : 'full',
    canActivate      : [AuthenticationGuard],
    component        : SignUpComponent,
  },
  {
    path             : 'admin/sign-in',
    canActivate      : [EntryAuthenticationGuard],
    pathMatch        : 'full',
    component        : SignInComponent,
  },{
    path             : 'admin/home',
    pathMatch        : 'full',
    canActivate      : [AuthenticationGuard],
    canActivateChild : [AuthenticationGuard],
    component        : HomeComponent,
  },{
    path             : 'admin/workerinfo/:id',
    pathMatch        : 'full',
    canActivate      : [AuthenticationGuard],
    canActivateChild : [AuthenticationGuard],
    component        : WorkerInfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
