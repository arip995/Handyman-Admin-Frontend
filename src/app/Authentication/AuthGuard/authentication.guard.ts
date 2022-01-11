import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardServiceService } from './auth-guard-service.service';
import { Router,ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private _authGuardService: AuthGuardServiceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._authGuardService.gettoken()){
        return true
      }else{
        this._router.navigate(['/admin/sign-in'], {relativeTo : this._activatedRoute});
        return false
      }
    }
}
