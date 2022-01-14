import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap,tap,catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TuiDay } from '@taiga-ui/cdk';
import {TUI_DATE_FORMAT, TUI_DATE_SEPARATOR} from '@taiga-ui/cdk';


@Component({
  selector: 'personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: TUI_DATE_FORMAT, useValue: 'DMY'},
    {provide: TUI_DATE_SEPARATOR, useValue: '-'},
],
})

export class PersonalDetailsComponent implements OnInit {
  totalWorkerData:any;
  personaldata:any;
  personalDetailsForm: FormGroup;
  workerId:any;
  date:any;
  salutation:any = [
        'Mr',
        'Mrs',
        'Ms',
    ]
  gender:any = [
      'Male',
      'Female',
      'Other',
  ]
  educationalQualification:any = [
      'Below 10th',
      '10 th pass',
      '12 th pass',
      'Diploma',
      'Bachelors',
      'Other',
  ]

  constructor(
      private _formBuilder: FormBuilder,
      private _httpClient: HttpClient,
      private _activatedRoute:ActivatedRoute,
      private _router: Router,
      private _datePipe: DatePipe
  ){
    this.date=new Date();
    this.date = this._datePipe.transform(this.date, 'yyyy-MM-dd');
    this.date = this.date.split("-").map(Number);
    console.log(this.date)
    this.personalDetailsForm = _formBuilder.group({
        firstName                : new FormControl("",[Validators.required]),
        lastName                 : new FormControl("",[Validators.required]),
        mobileNumber             : new FormControl("",[Validators.required]),
        salutation               : new FormControl("",[Validators.required]),
        alternateMobileNumber    : new FormControl(""),
        dateOfBirth              : new FormControl(new TuiDay(this.date[0], this.date[1]-1, this.date[2]),[Validators.required]),
        gender                   : new FormControl("",[Validators.required]),
        educationalQualification : new FormControl("",[Validators.required]),
        nationality              : new FormControl("",[Validators.required]),
    });
    this.workerId = this._activatedRoute.snapshot.paramMap.get('id');
      this.workerId = parseInt(this.workerId);
  }
    ngOnInit(): void {
        //Get the personal details
        this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`).pipe(
          tap((res:any)=>{
            this.totalWorkerData = res;
            console.log(this.totalWorkerData)
            this.date = this.totalWorkerData.personalDetails.dateOfBirth;
            this.date = this.date.split("-").map(Number);
            console.log(this.date)
          }),catchError((error)=>{
            throw new Error(error)
          })
        ).subscribe((res:any)=>{

        })
        this._httpClient.get(`${environment.workerBasePath}/detail/${this.workerId}/`).pipe(
          tap((res:any)=>{
            this.personaldata = res;
            console.log(this.personaldata)
            if(this.totalWorkerData){
              this.personalDetailsForm.reset({
                "firstName" : this.personaldata.firstName,
                "mobileNumber" : this.personaldata.mobileNumber,
                "lastName" : this.personaldata.lastName,
                "salutation" : this.totalWorkerData.personalDetails.salutation,
                "alternateMobileNumber" : this.totalWorkerData.personalDetails.alternateMobileNumber,
                "dateOfBirth" : new TuiDay(this.date[2], this.date[1]-1, this.date[0]),
                "gender" : this.totalWorkerData.personalDetails.gender,
                "nationality" : this.totalWorkerData.personalDetails.nationality,
                "educationalQualification" : this.totalWorkerData.personalDetails.educationalQualification
              })
            }else{
              this.personalDetailsForm.reset({
                "firstName" : this.personaldata.firstName,
                "mobileNumber" : this.personaldata.mobileNumber,
                "lastName" : this.personaldata.lastName,
              })
            }
          })
        ).subscribe((res:any)=>{

        })
    }


    update(){
      let updateDate:any = this.personalDetailsForm.get('dateOfBirth')?.value
      updateDate = updateDate.toString()
      updateDate = updateDate.replaceAll(".","-")
      const data = {
        "foreignId" : this.workerId,
        "personalDetails":{
            "salutation": this.personalDetailsForm.get('salutation')?.value,
            "alternateMobileNumber": this.personalDetailsForm.get('alternateMobileNumber')?.value,
            "dateOfBirth": updateDate,
            "gender": this.personalDetailsForm.get('gender')?.value,
            "nationality": this.personalDetailsForm.get('nationality')?.value,
            "educationalQualification" : this.personalDetailsForm.get('educationalQualification')?.value
        }
      }
      if(this.totalWorkerData){
        const totalData = {
          "foreignId" : this.workerId,
          "personalDetails" : data.personalDetails,
          "familyDetails" : this.totalWorkerData?.familyDetails,
          "residenceDetails" : this.totalWorkerData?.residenceDetails,
          "workDetails" : this.totalWorkerData?.workDetails,
          "kyc" : this.totalWorkerData?.kyc,
          "bankDetails" : this.totalWorkerData?.bankDetails,
        };
        console.log(totalData);
        this._httpClient.put(`${environment.workerBasePath}/update/information/${this.workerId}/`,totalData)
        .subscribe((res:any)=>{
          console.log(res)
        })
      }
      else{
        this._httpClient.post(`${environment.workerBasePath}/add/information/`,data)
        .subscribe((res:any)=>{
          console.log(res)
          this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`)
          .subscribe((res:any)=>{
            this.totalWorkerData = res;
            console.log(res)
          })
        })
      }
    }

}