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
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
  })
  
  export class ProductComponent implements OnInit {
    constructor(
        private _datePipe: DatePipe,
        private _router:Router,
        private _activatedRoute: ActivatedRoute,
        private _httpClient:HttpClient
    ){

    }
    width = screen.width;
    ngOnInit(): void {
          
    }
  }