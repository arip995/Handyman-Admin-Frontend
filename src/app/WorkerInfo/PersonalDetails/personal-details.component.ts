import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap,tap,catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PersonalDetailsComponent implements OnInit {
  signInForm: FormGroup;
  
  constructor(
    private _formBuilder: FormBuilder,
      private _httpClient: HttpClient,
      private _activeRoute: ActivatedRoute,
      private _router: Router,
      private _datePipe: DatePipe
  ){
    this.signInForm = _formBuilder.group({
      username : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
      password : new FormControl("",[Validators.required]),
    });
  }
    ngOnInit(): void {
        
    }
}