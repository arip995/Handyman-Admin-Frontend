import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap,tap,catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TuiDay } from '@taiga-ui/cdk';
import {TUI_DATE_FORMAT, TUI_DATE_SEPARATOR} from '@taiga-ui/cdk';


@Component({
  selector: 'personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: TUI_DATE_FORMAT, useValue: 'YMD'},
    {provide: TUI_DATE_SEPARATOR, useValue: '-'},
],
})

export class PersonalDetailsComponent implements OnInit {
  personalDetailsForm: FormGroup;
  workerId:any;
  date:any;
  items:any = [
        'Donations',
        'Product placement',
        'Sponsorship',
        'Found on the street',
        'Unexpected inheritance',
        'Investments',
        'Color copier',
    ]

  constructor(
    private _formBuilder: FormBuilder,
      private _httpClient: HttpClient,
      private _activatedRoute:ActivatedRoute,
      private _router: Router,
      private _datePipe: DatePipe
  ){
    this.date=new Date();
    this.date = this._datePipe.transform(this.date, 'yyyy-MM-dd');
    this.date = this.date.split("-");

    this.personalDetailsForm = _formBuilder.group({
        firstName                : new FormControl("",[Validators.required]),
        lastName                 : new FormControl("",[Validators.required]),
        mobileNumber             : new FormControl("",[Validators.required]),
        salutation               : new FormControl("",[Validators.required]),
        alternateMobileNumber    : new FormControl(""),
        dateOfBirth              : new FormControl(new TuiDay(this.date[0], this.date[1], this.date[2]),[Validators.required]),
        gender                   : new FormControl("",[Validators.required]),
        educationalQualification : new FormControl("",[Validators.required]),
        nationality              : new FormControl("",[Validators.required]),
    });
    this.workerId = this._activatedRoute.snapshot.paramMap.get('id');
      this.workerId = parseInt(this.workerId);
  }
    ngOnInit(): void {
        //Get the personal details
        this._httpClient.get(`${environment.workerBasePath}/update/information/${this.workerId}/`).pipe(
          tap((res:any)=>{
            console.log(res)
          }),catchError((error)=>{
            throw new Error(error)
          })
        ).subscribe((res:any)=>{

        })
    }
}