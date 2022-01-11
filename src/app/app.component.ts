import { Component, OnInit } from '@angular/core';
import { LoaderService } from './Loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public loader:LoaderService
  ){
    
  }
  ngOnInit(): void {
    
  }
}
