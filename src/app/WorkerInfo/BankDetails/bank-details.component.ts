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
import { AddBankDetailsComponent } from './AddBankAccount/add-bank-account.component';


@Component({
  selector: 'bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
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

export class BankDetailsComponent implements OnInit {
    workerId: any;
    bankDetails$:any;
    bankDetails:any;
    public _refreshToken$:any = new BehaviorSubject(null);


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
    }
    ngOnInit(): void {
        this.bankDetails$ = this._refreshToken$.pipe(
            (switchMap(()=>this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`)
            .pipe(
                tap((res:any)=>{
                    this.bankDetails = res.bankDetails;
                })
            ))
        ))
    }

    addBankDetails(){
        const dialogRef = this._matDialog.open(AddBankDetailsComponent, {
            autoFocus : false,
            panelClass: ['w-1/2', 'max-w-3xl','h-1/2','max-h-3xl'],
            data: {
                bankDetails:this.bankDetails,
                workerId : this.workerId,
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if(result === "change"){
                this._refreshToken$.next();
            }
            console.log(result);
        });
    }

    delete(){
        const data = {
            foreignId : this.workerId,
            bankDetails:""
        }
        this._httpClient.put(`${environment.workerBasePath}/update/information/${this.workerId}/`,data)
        .subscribe((res:any)=>{
            this._refreshToken$.next();
            console.log(res)
        })
    }
}