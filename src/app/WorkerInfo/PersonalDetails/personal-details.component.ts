import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap,tap,catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TuiDay } from '@taiga-ui/cdk';
import {TUI_DATE_FORMAT, TUI_DATE_SEPARATOR} from '@taiga-ui/cdk';
import { WorkerDataService } from 'src/assets/Shared/workerData.service';


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
  @Output() updatestep: EventEmitter<any> = new EventEmitter<any>();
  totalWorkerData:any;
  familyDetailsdata:any;
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
  martialStatus:any = [
    'Married',
    'Bachelor',
    'Divorced',
    'Widowed'
]

  constructor(
      private _formBuilder: FormBuilder,
      private _httpClient: HttpClient,
      private _activatedRoute:ActivatedRoute,
      private _router: Router,
      private _datePipe: DatePipe,
      private _workerData:WorkerDataService
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
        martialStatus            : new FormControl("",[Validators.required]),
        nationality              : new FormControl("",[Validators.required]),
    });
    this.workerId = this._activatedRoute.snapshot.paramMap.get('id');
    this.workerId = parseInt(this.workerId);

    //Get the personal details
    this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`).pipe(
      tap((res:any)=>{
        if(res){
          this._workerData.setWorkerData(res)
        }
        this.totalWorkerData = res.personalDetails;
        this.familyDetailsdata = res.familyDetails;
        console.log(this.totalWorkerData)
        this.date = this.totalWorkerData.dateOfBirth;
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
            "salutation" : this.totalWorkerData.salutation,
            "alternateMobileNumber" : this.totalWorkerData.alternateMobileNumber,
            "dateOfBirth" : new TuiDay(this.date[2], this.date[1]-1, this.date[0]),
            "gender" : this.totalWorkerData.gender,
            "martialStatus": this.totalWorkerData.martialStatus,
            "nationality" : this.totalWorkerData.nationality,
            "educationalQualification" : this.totalWorkerData.educationalQualification
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
    ngOnInit(): void {
        
    }


    update(){
      if(this.personalDetailsForm.pristine){
        this.updatestep.emit("familyDetails");
        return;
      }
      let updateDate:any = this.personalDetailsForm.get('dateOfBirth')?.value
      updateDate = updateDate.toString()
      updateDate = updateDate.replaceAll(".","-")
      let data:any = {
        "foreignId" : this.workerId,
        "personalDetails":{
            "salutation": this.personalDetailsForm.get('salutation')?.value,
            "alternateMobileNumber": this.personalDetailsForm.get('alternateMobileNumber')?.value,
            "dateOfBirth": updateDate,
            "gender": this.personalDetailsForm.get('gender')?.value,
            "nationality": this.personalDetailsForm.get('nationality')?.value,
            "educationalQualification" : this.personalDetailsForm.get('educationalQualification')?.value,
            "martialStatus" : this.personalDetailsForm.get('martialStatus')?.value,
        }
      }
      if(this.familyDetailsdata){
        if(data.personalDetails.martialStatus != "Married"){
          data = {
            "foreignId" : this.workerId,
            "personalDetails":{
                "salutation": this.personalDetailsForm.get('salutation')?.value,
                "alternateMobileNumber": this.personalDetailsForm.get('alternateMobileNumber')?.value,
                "dateOfBirth": updateDate,
                "gender": this.personalDetailsForm.get('gender')?.value,
                "nationality": this.personalDetailsForm.get('nationality')?.value,
                "educationalQualification" : this.personalDetailsForm.get('educationalQualification')?.value,
                "martialStatus" : this.personalDetailsForm.get('martialStatus')?.value,
            },
            "familyDetails": {
                "fatherFirstName" : this.familyDetailsdata.fatherFirstName,
                "fatherLastName" : this.familyDetailsdata.fatherLastName,
                "motherFirstName" : this.familyDetailsdata.motherFirstName,
                "motherLastName" : this.familyDetailsdata.motherLastName,
                "spouseFirstName" :null ,
                "spouseLastName" : null,
            },
          }
        }
      }
      if(this.totalWorkerData){
        this._httpClient.put(`${environment.workerBasePath}/update/information/${this.workerId}/`,data)
        .subscribe((res:any)=>{
          this._workerData.setWorkerData(res)
          this.updatestep.emit("familyDetails");
        })
      }
      else{
        this._httpClient.post(`${environment.workerBasePath}/add/information/`,data)
        .subscribe((res:any)=>{
          this._workerData.setWorkerData(res)
          this.updatestep.emit("familyDetails");
          // this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`)
          // .subscribe((res:any)=>{
          //   this.totalWorkerData = res;
          // })
        })
      }
    }

}