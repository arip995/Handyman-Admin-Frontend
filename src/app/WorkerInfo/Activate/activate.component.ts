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
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'activate',
  templateUrl: './activate.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ActivateComponent implements OnInit {
    public _refreshToken$:any = new BehaviorSubject(null);
    public user$: any;
    isActivated:boolean = false;
    workerId: any;
    allData:any;
    constructor(
        private _formBuilder: FormBuilder,
        private _httpClient: HttpClient,
        private _activatedRoute:ActivatedRoute,
        private _router: Router,
        private _datePipe: DatePipe,
        private _workerData:WorkerDataService,
        private _snackBar: MatSnackBar
    ){
        this.workerId = this._activatedRoute.snapshot.paramMap.get('id');
        this.workerId = parseInt(this.workerId);
        
        this.user$ = this._refreshToken$.pipe(
            (switchMap(() => this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`)
                    .pipe(
                        tap((res: any) => {
                            this.allData = res;
                        })
                    )
            ))
        )
            
    }
    ngOnInit(): void {
        this._workerData.getPersonalWorkerdata()
        .subscribe((res:any)=>{
            if(res){
                if(res.isActivated){
                    this.isActivated = res.isActivated;
                }
            }else{
                this._httpClient.get(`${environment.workerBasePath}/detail/${this.workerId}/`)
                .subscribe((res:any)=>{
                    this.isActivated = res.isActivated;
                })
            }
        })
    }

    statusChange(){
        if((this.allData.kyc.ageProof == false || this.allData.kyc.IdProof == false) || this.allData.kyc.addressProof == false){
            // alert('Complete the KYC first!')
            this._snackBar.open("Complete the KYC first!", "OK",{
                duration: 5000
            });
            return;
        }
        const data = {
            isActivated : !this.isActivated  
        }
        this._httpClient.put(`${environment.workerBasePath}/update/info/${this.workerId}/`,data)
        .pipe(
            tap((res:any)=>{
                this.isActivated = res.isActivated;
            })
        )
        .subscribe((res:any)=>{
        })
    }
}