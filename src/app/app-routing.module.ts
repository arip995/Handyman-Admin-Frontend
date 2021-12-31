import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Authentication/sign-in/sign-in.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { HomeComponent } from './Home/view.component';

const routes: Routes = [
  {
    path       : '',
    pathMatch  : 'full',
    redirectTo : '/admin/sign-up',
    data       : {title: 'Sign-up'}
},{
  path       : 'admin/sign-up',
  pathMatch  : 'full',
  component  : SignUpComponent,
},{
  path       : 'admin/sign-in',
  pathMatch  : 'full',
  component  : SignInComponent,
},{
  path       : 'admin/home',
  pathMatch  : 'full',
  component  : HomeComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
