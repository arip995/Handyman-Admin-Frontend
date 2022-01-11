import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService {

  constructor() { }

  gettoken(){  
    return localStorage.getItem("adminAccessToken");  
    }  
}
