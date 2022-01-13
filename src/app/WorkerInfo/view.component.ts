import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap,tap,catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'view-worker-info',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WorkerInfoComponent {
    workerId:any;
    // dj:number;
    authenticationSteps: "personalDetails" | "familyDetails"| "residenceDetails" | "workDetails" | "kyc" | "bankDetails" = "personalDetails";
    onContentChange(content:any){
      this.authenticationSteps = content;
    }

    constructor(
      private _activatedRoute:ActivatedRoute
    ){
      this.workerId = this._activatedRoute.snapshot.paramMap.get('id');
      this.workerId = parseInt(this.workerId);
      console.log(this.workerId)
    }
  }