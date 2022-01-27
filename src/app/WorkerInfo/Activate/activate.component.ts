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
  selector: 'activate',
  templateUrl: './activate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ActivateComponent implements OnInit {
    isActivated:any;
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
    }
    ngOnInit(): void {
        this._workerData.getPersonalWorkerdata()
        .subscribe((res:any)=>{
            if(res){
                this.isActivated = res.isActivated;
            }else{
                this._httpClient.get(`${environment.workerBasePath}/detail/${this.workerId}/`)
                .subscribe((res:any)=>{
                    this.isActivated = res.isActivated;
                })
            }
        })
    }

    statusChange(){
        const data = {
            isActivated : !this.isActivated  
        }
        this._httpClient.put(`${environment.workerBasePath}/update/info/${this.workerId}/`,data)
        .subscribe((res:any)=>{
            console.log(res)
            this.isActivated = res.isActivated;
        })
    }
}