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
import { MatDialog } from '@angular/material/dialog';
import { AddKycComponent } from './add-kyc/add-kyc.component';


@Component({
  selector: 'kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss'],
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

export class KycComponent implements OnInit {
    workerId: any;
    public _refreshToken$:any = new BehaviorSubject(null);
    public kycData$: any;
    kycData:any;
    proof:any = [];
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

    constructor(
        private _formBuilder: FormBuilder,
        private _httpClient: HttpClient,
        private _activatedRoute:ActivatedRoute,
        private _router: Router,
        private _datePipe: DatePipe,
        private _workerData:WorkerDataService,
        private _matDialog: MatDialog
    ){
        this.workerId = this._activatedRoute.snapshot.paramMap.get('id');
        this.workerId = parseInt(this.workerId);
        this.kycData$ = this._refreshToken$.pipe(
            (switchMap(() => this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`)
                    .pipe(
                        tap((res: any) => {
                            let dataArray = [];
                            this.kycData = res.kyc;
                            for(let a in this.kycData){
                                let b = this.kycData[a];
                                dataArray.push(b)
                                // console.log(dataArray)
                            }
                            // console.log(dataArray)
                            if(dataArray){
                                for(let i=0;i<dataArray.length;i++){
                                    if(typeof(dataArray[i]) === "object"){
                                        this.proof.push(dataArray[i])
                                    }
                                }
                            }
                            console.log(this.proof)
                        })
                    )
            ))
        )
    }


    ngOnInit(): void {
                
    }

    
    addKyc(){
        const dialogRef = this._matDialog.open(AddKycComponent, {
            autoFocus : false,
            panelClass: ['w-1/2', 'max-w-3xl'],
            data: {
                workerId : this.workerId,
                kycData  : this.kycData
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });
    }
}