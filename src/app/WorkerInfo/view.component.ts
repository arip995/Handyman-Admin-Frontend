import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap,tap,catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'view-worker-info',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WorkerInfoComponent implements OnInit {
    workerId:any;
    workerDetail$:any;
    workerDetail:any;
    public _refreshToken$:any = new BehaviorSubject(null);
    authenticationSteps: "personalDetails" | "familyDetails"| "residenceDetails" | "workDetails" | "kyc" | "bankDetails" | "activate" = "personalDetails";
    onContentChange(content:any){
      this.authenticationSteps = content;
    }

    constructor(
      private _activatedRoute:ActivatedRoute,
      private _httpClient:HttpClient
    ){
      this.workerId = this._activatedRoute.snapshot.paramMap.get('id');
      this.workerId = parseInt(this.workerId);
      console.log(this.workerId)
    }

    ngOnInit(): void {
        this.workerDetail$ = this._refreshToken$.pipe(
          (switchMap(()=> this._httpClient.get(`${environment.workerBasePath}/detail/${this.workerId}/`)
          .pipe(
            tap((res)=>{
              this.workerDetail = res;
              console.log(res)
            }),
            catchError((error)=>{
              throw new Error(error)
            })
          )
          ))
        )
    }
  }