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
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ {
    provide: TUI_VALIDATION_ERRORS,
    useValue: {
        required: 'This is a required field!',
        email: 'Enter a valid email',
        maxlength: maxLengthValidator,
        minlength: minLengthValidator,
    },
},
    {provide: TUI_DATE_FORMAT, useValue: 'DMY'},
    {provide: TUI_DATE_SEPARATOR, useValue: '-'},
],
})

export class FamilyDetailsComponent implements OnInit {
    @Output() updatestep: EventEmitter<any> = new EventEmitter<any>();
    familyDetailsForm:FormGroup;
    totalWorkerData: any;
    workerId: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _httpClient: HttpClient,
        private _activatedRoute:ActivatedRoute,
        private _router: Router,
        private _datePipe: DatePipe,
        private _workerData:WorkerDataService
    ){

        this.familyDetailsForm = this._formBuilder.group({
            fatherFirstName               : new FormControl("",[Validators.required]),
            fatherLastName                : new FormControl("",[Validators.required]),
            motherFirstName               : new FormControl("",[Validators.required]),
            motherLastName                : new FormControl("",[Validators.required]),
            spouseFirstName               : new FormControl("",[]),
            spouseLastName                : new FormControl("",[]),
        })
        this.workerId = this._activatedRoute.snapshot.paramMap.get('id');
        this.workerId = parseInt(this.workerId);
        // this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`)
        this._workerData.getWorkerData()  
        .subscribe((res:any)=>{
            if(!res){
                this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`)
                .subscribe((res:any)=>{
                    this.totalWorkerData = res.familyDetails;
                    if(this.totalWorkerData.familyDetails){
                        this.familyDetailsForm.reset({
                            fatherFirstName               : this.totalWorkerData?.familyDetails.fatherFirstName,
                            fatherLastName                : this.totalWorkerData?.familyDetails.fatherLastName,
                            motherFirstName               : this.totalWorkerData?.familyDetails.motherFirstName,
                            motherLastName                : this.totalWorkerData?.familyDetails.motherLastName,
                            spouseFirstName               : this.totalWorkerData?.familyDetails.spouseFirstName,
                            spouseLastName                : this.totalWorkerData?.familyDetails.spouseLastName,
                        })
                    }
                })
            }else{
                this.totalWorkerData = res;
                if(this.totalWorkerData.familyDetails){
                    this.familyDetailsForm.reset({
                        fatherFirstName               : this.totalWorkerData?.familyDetails.fatherFirstName,
                        fatherLastName                : this.totalWorkerData?.familyDetails.fatherLastName,
                        motherFirstName               : this.totalWorkerData?.familyDetails.motherFirstName,
                        motherLastName                : this.totalWorkerData?.familyDetails.motherLastName,
                        spouseFirstName               : this.totalWorkerData?.familyDetails.spouseFirstName,
                        spouseLastName                : this.totalWorkerData?.familyDetails.spouseLastName,
                    })
                }
            }
            
          })
    }

    ngOnInit(): void {
        
    }


    update(){

        if(this.familyDetailsForm.pristine){
            this.updatestep.emit("residenceDetails");
            return
        }
        const data = {
            "foreignId" : this.workerId,
            "familyDetails" : {
                "fatherFirstName": this.familyDetailsForm.get('fatherFirstName')?.value,
                "fatherLastName": this.familyDetailsForm.get('fatherLastName')?.value,
                "motherFirstName": this.familyDetailsForm.get('motherFirstName')?.value,
                "motherLastName": this.familyDetailsForm.get('motherLastName')?.value,
                "spouseFirstName" : this.familyDetailsForm.get('spouseFirstName')?.value,
                "spouseLastName" : this.familyDetailsForm.get('spouseLastName')?.value,
            }
        }
        this._httpClient.put(`${environment.workerBasePath}/update/information/${this.workerId}/`,data)
        .subscribe((res:any)=>{
            this._workerData.setWorkerData(res)
            this.updatestep.emit("residenceDetails");
        })
    }
}


export function maxLengthValidator(context: {requiredLength: string}): string {
    return `Maximum length — ${context.requiredLength}!`;
}
 
export function minLengthValidator(context: {requiredLength: string}): string {
    return `Minimum length — ${context.requiredLength}!`;
}