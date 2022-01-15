import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  selector: 'residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.scss'],
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

export class ResidenceDetailsComponent implements OnInit {
    @Output() updatestep: EventEmitter<any> = new EventEmitter<any>();
    residenceDetailsForm: FormGroup;
    totalworkerData:any;
    workerId: any;
    ownership:any = [
        "Own",
        "Rented"
    ]

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
        this.residenceDetailsForm = this._formBuilder.group({
            houseNo               : new FormControl("",[Validators.required]),
            street                : new FormControl("",[Validators.required]),
            landmark              : new FormControl("",[Validators.required]),
            pincode               : new FormControl("",[Validators.required,Validators.maxLength(6),Validators.minLength(6)]),
            district              : new FormControl("",[Validators.required]),
            state                 : new FormControl("",[Validators.required]),
            residenceYears        : new FormControl("",[Validators.required]),
            ownership             : new FormControl("",[Validators.required]),
        })
        this._workerData.getWorkerData()
        .subscribe((res:any)=>{
            this.totalworkerData = res;
            console.log(res)
            if(this.totalworkerData?.residenceDetails){
                this.residenceDetailsForm.reset({
                    houseNo               : this.totalworkerData?.residenceDetails?.houseNo,
                    street                : this.totalworkerData?.residenceDetails?.street,
                    landmark              : this.totalworkerData?.residenceDetails?.landmark,
                    pincode               : this.totalworkerData?.residenceDetails?.pincode,
                    district              : this.totalworkerData?.residenceDetails?.district,
                    state                 : this.totalworkerData?.residenceDetails?.state,
                    residenceYears        : this.totalworkerData?.residenceDetails?.residenceYears,
                    ownership             : this.totalworkerData?.residenceDetails?.ownership,
                })
            }
        })
    }

    ngOnInit(): void {
        
    }


    update(){
        if(this.residenceDetailsForm.pristine){
            this.updatestep.emit("residenceDetails");
            return
        }
        const data = {
            "foreignId" : this.workerId,
            "residenceDetails" : {
                "houseNo"          : this.residenceDetailsForm.get('houseNo')?.value,
                "street"           : this.residenceDetailsForm.get('street')?.value,
                "landmark"         : this.residenceDetailsForm.get('landmark')?.value,
                "pincode"          : parseInt(this.residenceDetailsForm.get('pincode')?.value),
                "district"         : this.residenceDetailsForm.get('district')?.value,
                "state"            : this.residenceDetailsForm.get('state')?.value,
                "residenceYears"   : parseInt(this.residenceDetailsForm.get('residenceYears')?.value),
                "ownership"        : this.residenceDetailsForm.get('ownership')?.value,
            }
        }
        this._httpClient.put(`${environment.workerBasePath}/update/information/${this.workerId}/`,data)
        .subscribe((res:any)=>{
            this._workerData.setWorkerData(res)
            this.updatestep.emit("workDetails");
        })
    }

}


export function maxLengthValidator(context: {requiredLength: string}): string {
    return `Maximum length — ${context.requiredLength}!`;
}
 
export function minLengthValidator(context: {requiredLength: string}): string {
    return `Minimum length — ${context.requiredLength}!`;
}