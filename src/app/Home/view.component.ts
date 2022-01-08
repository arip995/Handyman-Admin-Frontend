import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'view-home',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class HomeComponent {
    content: 'Dashboard'| 'Customers' | 'Workers' | 'Analytics' | 'Products' | 'Reports' = "Dashboard";

    contentChange(value:any){
      this.content = value;
    }
}