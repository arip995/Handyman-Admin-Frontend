import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  password: any;
  confirmPassword: any;
  passwordMatch: boolean = false;

  //Constructor
  constructor(
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _datePipe: DatePipe
  ) {
    this.signUpForm = _formBuilder.group({
      name: new FormControl("", [Validators.required]),
      mobileNumber: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      username: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required])
    });
  }


  //OnInit Method
  ngOnInit() {
    // this.signUpForm.reset({

    // })
  }

  checkError(errorName: any) {

    return () => {
      this.signUpForm.controls['name'].hasError(errorName);
      this.signUpForm.controls['mobileNumber'].hasError(errorName);
      this.signUpForm.controls['email'].hasError(errorName);
      this.signUpForm.controls['username'].hasError(errorName);
      this.signUpForm.controls['password'].hasError(errorName);
      this.signUpForm.controls['confirmPassword'].hasError(errorName);
    }

  }


  signUp() {
    if (this.password === this.confirmPassword) {
      this.passwordMatch = false;
      const data = {
        "name": this.signUpForm.get('name')?.value,
        "mobileNumber": this.signUpForm.get('mobileNumber')?.value,
        "username": this.signUpForm.get('username')?.value,
        "password": this.signUpForm.get('password')?.value,
        "email": this.signUpForm.get('email')?.value,
        "createdOn": "2002-03-30",
        "branchId": "1",
        "cityName": "Bhubaneswar",
        "stateName": "Odisha",
      }

      this._httpClient.post(`http://127.0.0.1:8000/handymanadmin/signup/`, data).subscribe
        ((res: any) => {
          console.log(res);
          this._router.navigate(['../sign-in'], { relativeTo: this._activeRoute });
        })
    } else {
      this.passwordMatch = true;
    }
  }
}
