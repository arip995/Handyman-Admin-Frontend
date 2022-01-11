import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';



@Component({
    selector: 'loader',
    templateUrl: './loader.component.html'
  })
  export class LoaderComponent implements OnInit {

      constructor(
      public loaderService:LoaderService
      ){

    }

    ngOnInit(): void {
        
    }
  }