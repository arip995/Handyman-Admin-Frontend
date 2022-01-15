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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    isShopPresent:Boolean = false;
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
            pincode             : ["",[Validators.required]],
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
        if(this.totalWorkerData.workDetails){
            this.workDetailsForm.reset({
                salary      : this.totalWorkerData?.workDetails?.salary,
                ownShop     : this.totalWorkerData?.workDetails?.ownShop,
                workType    : this.personalData?.worktype,
                experience  : this.totalWorkerData?.workDetails?.experience,
            })
        }
        if(this.totalWorkerData.workDetails.shopDetails){
            this.shopDetailsForm.reset({
                shopName       : this.totalWorkerData.workDetails.shopName,
                landmark       : this.totalWorkerData.workDetails.landmark,
                shopAddress    : this.totalWorkerData.workDetails.shopAddress,
                pincode        : this.totalWorkerData.workDetails.pincode,
                ownershipYears : this.totalWorkerData.workDetails.ownershipYears,
            })
        }
    }

}

export function maxLengthValidator(context: {requiredLength: string}): string {
    return `Maximum length — ${context.requiredLength}!`;
}
 
export function minLengthValidator(context: {requiredLength: string}): string {
    return `Minimum length — ${context.requiredLength}!`;
}