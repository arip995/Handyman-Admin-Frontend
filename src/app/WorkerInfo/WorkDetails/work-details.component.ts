import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap,tap,catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TuiDay } from '@taiga-ui/cdk';
import { TUI_DATE_FORMAT, TUI_DATE_SEPARATOR } from '@taiga-ui/cdk';
import { WorkerDataService } from 'src/assets/Shared/workerData.service';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';


@Component({
  selector: 'work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.scss'],
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

export class WorkDetailsComponent implements OnInit {
    @Output() updatestep: EventEmitter<any> = new EventEmitter<any>();
    isShopPresent:any = '';
    ownership:any = [
        "True",
        "False"
    ]
    salary :any = [
        "10-30 thousand",
        "40-80 thousand",
        "80-100 thousand",
        "1-2 lakh",
        "2-4 lakh",
        "4-8 lakh",
        "more than 8 lakh",
    ]
    totalWorkerData:any;
    personalData:any;
    workDetailsForm: FormGroup;
    shopDetailsForm:FormGroup;
    workerDetail$: any;    
    public _refreshToken$:any = new BehaviorSubject(null);
    workerId: any;


    constructor(
        private _formBuilder: FormBuilder,
        private _httpClient: HttpClient,
        private _activatedRoute:ActivatedRoute,
        private _router: Router,
        private _datePipe: DatePipe,
        private _workerData:WorkerDataService
    ){
        this.workerId = this._activatedRoute.snapshot.paramMap.get('id');
        this.workerId = parseInt(this.workerId);
        this.workDetailsForm = this._formBuilder.group({
            salary              : ["",[Validators.required]],
            ownShop             : ["",[Validators.required]],
            workType            : ["",[Validators.required]],
            experience          : ["",[Validators.required]],
        });

        this.shopDetailsForm = this._formBuilder.group({
            shopName            : ["",[Validators.required]],
            shopAddress         : ["",[Validators.required]],
            pincode             : ["",[Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
            landmark            : ["",[Validators.required]],
            ownershipYears      : ["",[Validators.required]],
        })
        

        this._workerData.getPersonalWorkerdata()
        .subscribe((res:any)=>{
            this.personalData = res;
            if(!res){
                this._httpClient.get(`${environment.workerBasePath}/detail/${this.workerId}/`)
                .subscribe((response:any)=>{
                    this.personalData = response;
                    this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`)
                    .subscribe((data:any)=>{
                        this.totalWorkerData = data;
                        this.checkToReset();
                    })
                })
            }else{
                this._workerData.getWorkerData()
                    .subscribe((data:any)=>{
                        if(data){
                            this.totalWorkerData = data;
                            this.checkToReset();
                        }else{
                            this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`)
                            .subscribe((data:any)=>{
                                this.totalWorkerData = data;
                                this.checkToReset();
                            })
                        }
                    })
            }
        })
    }

    ngOnInit(): void {
        
    }

    checkToReset(){
        this.workDetailsForm.reset({
            workType    : this.personalData?.worktype,
        })
        if(this.totalWorkerData?.workDetails?.ownShop === 'True'){
            this.isShopPresent = "True";
        }else if(this.totalWorkerData?.workDetails?.ownShop === 'False'){
            this.isShopPresent = "False";
        }
        if(this.totalWorkerData.workDetails){
            this.workDetailsForm.reset({
                salary      : this.totalWorkerData?.workDetails?.salary,
                ownShop     : this.isShopPresent,
                workType    : this.personalData?.worktype,
                experience  : this.totalWorkerData?.workDetails?.experience,
            })
        }
        if(this.totalWorkerData?.workDetails?.shopDetails){
            this.shopDetailsForm.reset({
                shopName       : this.totalWorkerData.workDetails.shopDetails.shopName,
                landmark       : this.totalWorkerData.workDetails.shopDetails.landmark,
                shopAddress    : this.totalWorkerData.workDetails.shopDetails.shopAddress,
                pincode        : this.totalWorkerData.workDetails.shopDetails.pincode,
                ownershipYears : this.totalWorkerData.workDetails.shopDetails.ownershipYears,
            })
        }
        
    }

    updateDetails(){
        const data:any = {
            "foreignId" : this.workerId,
            "workDetails":{
                "salary": this.workDetailsForm.get('salary')?.value,
                "ownShop": this.workDetailsForm.get('ownShop')?.value,
                "experience": parseInt(this.workDetailsForm.get('experience')?.value),
            }
        }
        this._httpClient.put(`${environment.workerBasePath}/update/information/${this.workerId}/`,data)
        .subscribe((res:any)=>{
            this._workerData.setWorkerData(res)
            this.updatestep.emit("kyc");
        })
    }


    updateShopDetails(){
        const data:any = {
            "foreignId" : this.workerId,
            "workDetails":{
                "salary": this.workDetailsForm.get('salary')?.value,
                "ownShop": this.workDetailsForm.get('ownShop')?.value,
                "experience": this.workDetailsForm.get('experience')?.value,
                "shopDetails" : {
                    "shopName": this.shopDetailsForm.get('shopName')?.value,
                    "landmark": this.shopDetailsForm.get('landmark')?.value,
                    "shopAddress": this.shopDetailsForm.get('shopAddress')?.value,
                    "pincode": parseInt(this.shopDetailsForm.get('pincode')?.value),
                    "ownershipYears": parseInt(this.shopDetailsForm.get('ownershipYears')?.value),
                }
            }
        }
        this._httpClient.put(`${environment.workerBasePath}/update/information/${this.workerId}/`,data)
        .subscribe((res:any)=>{
            this._workerData.setWorkerData(res)
            this.updatestep.emit("kyc");
        })
    }

}

export function maxLengthValidator(context: {requiredLength: string}): string {
    return `Maximum length — ${context.requiredLength}!`;
}
 
export function minLengthValidator(context: {requiredLength: string}): string {
    return `Minimum length — ${context.requiredLength}!`;
}