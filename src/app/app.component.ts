import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router, RouterEvent, NavigationEnd, RoutesRecognized  } from '@angular/router';
import { catchError,tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ParamMap } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Handyman-Admin';
  private previousUrl: any;
  private currentUrl: any;

  // route:any;
  constructor(
      private _httpClient: HttpClient,
      private _activeRoute: ActivatedRoute,
      private _router: Router,
      private _location: Location
  ){
    
  }
  ngOnInit(): void {
    const adminAccessToken:any = localStorage.getItem('accessToken');
    const data:any = {
      "accessToken"  : adminAccessToken
    }
    if(adminAccessToken){
      this._httpClient.post(`http://127.0.0.1:8000/handymanadmin/signinaccesstoken/`,data)
      .pipe(
        tap((res:any)=>{
          
        }),
        catchError((error)=>{
          this._router.navigate(['/admin/sign-in'], {relativeTo : this._activeRoute});
          throw new Error(error)
        })
      )
      .subscribe((res:any)=>{
      })
    }
  }
}
