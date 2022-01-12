import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ceil } from '@taiga-ui/cdk';
import { TUI_DEFAULT_STRINGIFY } from '@taiga-ui/cdk';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap,tap,catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'worker',
    templateUrl: './worker.component.html',
    styleUrls: ['./worker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  
  export class workerComponent implements OnInit {
    ///////////////variables/////////////////
    tableDatasource:any;
    worker$:any;
    dataSource = new MatTableDataSource();
    displayedColumns: string[] = ['Username', 'Name', 'Worktype', 'Status', 'CreatedOn'];
    public _refresh:any = new BehaviorSubject(null);


    ///////////////constructor/////////////////
    constructor(
        private _datePipe: DatePipe,
        private _router:Router,
        private _activatedRoute: ActivatedRoute,
        private _httpClient:HttpClient
    ){
        this.worker$ = this._refresh.pipe(
            (switchMap (()=> this._httpClient.get(`${environment.workerBasePath}/details/`)
            .pipe(
                tap((res:any)=>{
                    this.tableDatasource = res;
                }),
            )))
        )
        // this._httpClient.get(`${environment.workerBasePath}/details/`)
        // .subscribe((res:any)=>{
        //     console.log(res)
        // })
    }

    ///////////////OnInit/////////////////
    ngOnInit(): void {
        
    }


    workerProfile(id:any){
        console.log(id)
    }
  }