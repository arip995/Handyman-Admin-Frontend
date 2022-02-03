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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-bank',
  templateUrl: './add-bank-account.component.html',
//   styleUrls: ['./add-bank.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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

export class AddBankDetailsComponent implements OnInit {
  bankDetailsForm:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddBankDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _httpClient: HttpClient,
        private _activatedRoute:ActivatedRoute,
        private _router: Router,
        private _datePipe: DatePipe,
        private _workerData:WorkerDataService
    ){
      this.bankDetailsForm = this._formBuilder.group({
        accountHolderName : new FormControl("",[Validators.required]),
        accountNumber     : new FormControl("",[Validators.required]),
        ifscCode          : new FormControl("",[Validators.required]),
      })
    }
    ngOnInit(): void {
        if(this.data.bankDetails){
          this.bankDetailsForm.reset({
            accountHolderName  :this.data.bankDetails.accountHolderName,
            accountNumber      :this.data.bankDetails.accountNumber,
            ifscCode           :this.data.bankDetails.ifscCode
          })
        }
    }

    addBankDetails(){
      const data = {
        foreignId    : this.data.workerId,
        bankDetails  : {
          ifscCode            : this.bankDetailsForm.get('ifscCode')?.value,
          accountHolderName   : this.bankDetailsForm.get('accountHolderName')?.value,
          accountNumber       : this.bankDetailsForm.get('accountNumber')?.value,
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
}