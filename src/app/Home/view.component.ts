import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ceil } from '@taiga-ui/cdk';
import { TUI_DEFAULT_STRINGIFY } from '@taiga-ui/cdk';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap,tap,catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AdminDataService } from 'src/assets/Shared/adminData.service';
import { LoaderService } from '../Loader/loader.service';
import { NgZone } from '@angular/core';


@Component({
  selector: 'view-home',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent implements OnInit {
  public _refreshToken$:any = new BehaviorSubject(null);
  public user$: any;
  userData:any = null;
  currentDate:any = new Date();
  adminDate: any;
  adminData:any;
  dataFlow: any;
  constructor(
    private _datePipe: DatePipe,
    private _router:Router,
    private _activatedRoute: ActivatedRoute,
    private _httpClient:HttpClient,
    private _adminDataService:AdminDataService,
    private _ngZone:NgZone
  ){
    // this.currentDate = this._datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    // this.adminDate = localStorage.getItem("adminDate");
    // var date1 = new Date(this.adminDate); 
	  // var date2 = new Date(this.currentDate); 
  
    // var Time = date2.getTime() - date1.getTime(); 
    // var Days = Time / (86400000);
    // if(Days > 0){
    //   localStorage.clear();
    //   this._router.navigate(['../sign-in'],{relativeTo : this._activatedRoute})
    // }
    // console.log(Days)
    
    const adminAccessToken:any = localStorage.getItem('adminAccessToken');
    const data = {
      "accessToken" : adminAccessToken
    }
    // this._adminDataService.setAdminData(data.accessToken).subscribe((res:any)=>{
    //   this.userData = res;
    //   console.log(this.userData)
    // })
    // this.user$ = this._refreshToken$.pipe(
    //   (switchMap (()=> this._httpClient.get(`http://127.0.0.1:8000/handymanadmin/signinaccesstoken/${adminAccessToken}/`)
    //   .pipe(
    //     tap((res:any)=>{
    //       if(!res){
    //       }
    //       this.userData = res;
    //       console.log(res)
    //     })
    //     ,catchError((error)=>{
    //       alert("please logout and sign in again")
    //       throw new Error(error);
    //     })
    //   )))
    // )
    this._adminDataService.getAdminData().subscribe((res:any)=>{
      if(res){
        this.userData = res;
      }else{
        this._httpClient.get(`http://127.0.0.1:8000/handymanadmin/signinaccesstoken/${adminAccessToken}/`)
        .subscribe((res:any)=>{
          this.userData = res;
          console.log(this.userData)
          this._adminDataService.setAdminData(res)
        })
      }
    })
    
  }
    content: 'Dashboard'| 'Customers' | 'Workers' | 'Analytics' | 'Products' | 'Reports' = 'Dashboard';
    readonly value = [40, 30, 20, 10];
    readonly values = [
      [3660, 8281, 1069, 9034, 5797, 6918, 8495, 3234, 6204, 1392, 2088, 8637, 8779],
      [3952, 3671, 3781, 5323, 3537, 4107, 2962, 3320, 8632, 4755, 9130, 1195, 3574],
  ];

  readonly value1:any = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
];
  readonly value2:any = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
  ];

  ngOnInit(): void {
    this._adminDataService.getDataFlow().subscribe((res:any)=>{
      this.dataFlow = res;
    });
    console.log(this.dataFlow)
    if(this.dataFlow){
      this.content = this.dataFlow;
    }else{
      this._adminDataService.setAdminData("Dashboard");
    }
  }

readonly stringify = TUI_DEFAULT_STRINGIFY;


    contentChange(value:any){
      this.content = value;
      this._adminDataService.setDataFlow(value);
      this._adminDataService.getDataFlow().subscribe((res:any)=>{
        this.dataFlow = res;
      });
      console.log(this.dataFlow)
    }
    
    

  getHeight(max: number): number {
      return (max / ceil(max, -3)) * 100;
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['../sign-in'],{relativeTo: this._activatedRoute})
  }

  profile() {
    this._router.navigate(['../profile'],{relativeTo: this._activatedRoute})
  }

}