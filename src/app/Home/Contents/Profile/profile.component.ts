import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class Profilecomponent implements OnInit {
    profileForm: FormGroup;
    hide:boolean = true;
    constructor(private _formBuilder: FormBuilder){
        this.profileForm = _formBuilder.group({
            name: new FormControl("",[Validators.required]),
            lastname: new FormControl("",[Validators.required]),
            mobileNumber : new FormControl("",[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
            email: new FormControl("",[Validators.required]),
            username : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
            address: new FormControl("",[Validators.required]),
            state: new FormControl("",[Validators.required]),
            city: new FormControl("",[Validators.required]),
            pincode: new FormControl("",[Validators.required,Validators.maxLength(6),Validators.minLength(6)]),
          });
    }
    ngOnInit(): void {
        
    }


    checkError(errorName:any){
  
        return()=>{
          this.profileForm.controls['name'].hasError(errorName);
          this.profileForm.controls['lastname'].hasError(errorName);
          this.profileForm.controls['mobileNumber'].hasError(errorName);
          this.profileForm.controls['email'].hasError(errorName);
          this.profileForm.controls['username'].hasError(errorName);
          this.profileForm.controls['address'].hasError(errorName);
          this.profileForm.controls['state'].hasError(errorName);
          this.profileForm.controls['city'].hasError(errorName);
          this.profileForm.controls['pincode'].hasError(errorName);
        } 
    
      }
    
}

