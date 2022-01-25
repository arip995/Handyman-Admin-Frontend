import { ChangeDetectionStrategy,Inject, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-kyc',
  templateUrl: './add-kyc.component.html',
  styleUrls: ['./add-kyc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ {
    provide: TUI_VALIDATION_ERRORS,
    useValue: {
        required: 'This is a required field!',
        email: 'Enter a valid Id',
    },
},
    {provide: TUI_DATE_FORMAT, useValue: 'DMY'},
    {provide: TUI_DATE_SEPARATOR, useValue: '-'},
],
})

export class AddKycComponent implements OnInit {
    addkyc:FormGroup;
    declare:boolean = false;
    identifierType:any = [
        {
            id: 'panID',
            value : 'Pan ID',
        },
        {
            id: 'voterID',
            value : 'Voter ID',
        },
        {
            id: 'aadharID',
            value : 'Aadhar ID',
        },
        {
            id: 'passport',
            value : 'Passport',
        },
    ]
    workerId: any;

    constructor(
        public dialogRef: MatDialogRef<AddKycComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _httpClient: HttpClient,
        private _activatedRoute:ActivatedRoute,
        private _router: Router,
        private _datePipe: DatePipe,
        private _workerData:WorkerDataService
    ){
        this.addkyc = this._formBuilder.group({
            identifierType : new FormControl("",[Validators.required]),
            uniqueId       : new FormControl("",[Validators.required]),
            ageProof       : new FormControl("",[]),
            IdProof        : new FormControl("",[]),
            addressProof   : new FormControl("",[]),
            declaration    : new FormControl("",[]),
        })
    }


    ngOnInit(): void {
        
    }

    a(event:any){
        this.declare = !this.declare;
    }

    checkError(errorName:any){
  
        return()=>{
          this.addkyc.controls['identifierType'].hasError(errorName);
          this.addkyc.controls['uniqueId'].hasError(errorName);
          this.addkyc.controls['declaration'].hasError(errorName);
        } 
    
      }

    save(){
        const identifier =  this.addkyc?.get('identifierType')?.value;
        this._workerData.getWorkerData()
        .subscribe((res:any)=>{
            // console.log(res.kyc)
            if(res.kyc){
                let a = res.kyc;
                a = res.kyc;
                const data = {
                    "foreignId" : this.data.workerId,
                    "kyc": a
                }
                data.kyc[identifier] = { 
                    type             : identifier,
                    id               : this.addkyc?.get('uniqueId')?.value,
                    ageProof         : this.addkyc?.get('ageProof')?.value,
                    IdProof          : this.addkyc?.get('IdProof')?.value,
                    addressProof     : this.addkyc?.get('addressProof')?.value,
                }
                if(!data.kyc.ageProof){
                    data.kyc.ageProof = this.addkyc?.get('ageProof')?.value
                }
                if(!data.kyc.IdProof){
                    data.kyc.IdProof = this.addkyc?.get('IdProof')?.value
                }
                if(!data.kyc.addressProof){
                    data.kyc.addressProof = this.addkyc?.get('addressProof')?.value
                }
                console.log(data)
                this._httpClient.put(`${environment.workerBasePath}/update/information/${this.data.workerId}/`,data)
                .subscribe((res:any)=>{
                    this.dialogRef.close("change")
                    console.log(res)
                    // this._workerData.setWorkerData(res)
                })
            }else{
                const data = {
                    "foreignId" : this.data.workerId,
                    "kyc":{
                        ageProof         : this.addkyc?.get('ageProof')?.value,
                        IdProof          : this.addkyc?.get('IdProof')?.value,
                        addressProof     : this.addkyc?.get('addressProof')?.value,
                        [identifier] :{
                            type             : identifier,
                            id               : this.addkyc?.get('uniqueId')?.value,
                            ageProof         : this.addkyc?.get('ageProof')?.value,
                            IdProof          : this.addkyc?.get('IdProof')?.value,
                            addressProof     : this.addkyc?.get('addressProof')?.value,
                        }
                    }
                }
                console.log(data)
                this._httpClient.put(`${environment.workerBasePath}/update/information/${this.data.workerId}/`,data)
                .subscribe((res:any)=>{
                    this.dialogRef.close("change")
                    console.log(res)
                    // this._workerData.setWorkerData(res)
                })
            }
        })
    }
}