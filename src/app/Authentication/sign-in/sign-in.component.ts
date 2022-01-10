import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;
    //Constructor
    constructor(
      private _formBuilder: FormBuilder,
      private _httpClient: HttpClient,
      private _activeRoute: ActivatedRoute,
      private _router: Router,
      ){
        this.signInForm = _formBuilder.group({
            username : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
            password : new FormControl("",[Validators.required]),
          });
    }

    //OnInit method
    ngOnInit() {

    }

    checkError(errorName:any){
  
        return()=>{
          this.signInForm.controls['username'].hasError(errorName);
          this.signInForm.controls['password'].hasError(errorName);
        } 
    
      }

    signIn(){
      const data = {
        "username" : this.signInForm.get('username')?.value,
        "password" : this.signInForm.get('password')?.value
      }

      this._httpClient.post(`http://127.0.0.1:8000/handymanadmin/signin/`,data).subscribe
      ((res:any)=>{
        console.log(res);
        const localitem:any = localStorage.getItem('accessToken');
        const localid:any = localStorage.getItem('id');
        if(localitem && localid){
          
        }else{
          localStorage.setItem('accessToken', res.accessToken)
          localStorage.setItem('id', res.id)
        }
        this._router.navigate(['../home'],{relativeTo : this._activeRoute});
      })
    }
}