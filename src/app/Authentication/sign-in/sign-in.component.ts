import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  myDate: any = new Date();
  //Constructor
  constructor(
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _datePipe: DatePipe,
    private _snackBar: MatSnackBar,
  ) {
    this.signInForm = _formBuilder.group({
      username: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      password: new FormControl("", [Validators.required]),
    });
  }

  //OnInit method
  ngOnInit() {
  }

  checkError(errorName: any) {

    return () => {
      this.signInForm.controls['username'].hasError(errorName);
      this.signInForm.controls['password'].hasError(errorName);
    }

  }

  signIn() {
    const data = {
      "username": this.signInForm.get('username')?.value,
      "password": this.signInForm.get('password')?.value
    }

    this._httpClient.post(`http://127.0.0.1:8000/handymanadmin/signin/`, data).subscribe
      ((res: any) => {
        console.log(res);
        const localitem: any = localStorage.getItem('adminAccessToken');
        if (res.status == false) {
          this._snackBar.open("Your Account is not activated, please try after sometime", "OK", {
            duration: 8000
          });
          return;
        } else {
          localStorage.setItem('adminAccessToken', res.accessToken);
          this._router.navigate(['../home'], { relativeTo: this._activeRoute });
        }
      })
  }
}