import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;
    //Constructor
    constructor(private _formBuilder: FormBuilder){
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

    }
}