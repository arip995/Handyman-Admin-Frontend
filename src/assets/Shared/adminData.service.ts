import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
    public _allAdminData$:any = new BehaviorSubject(null);
    public _dataflowValue$:any = new BehaviorSubject(null);
    constructor(
        private _httpClient:HttpClient
    ) {

    }

    setDataFlow(data:any){
        console.log(data)
        this._dataflowValue$.next(data);
    }

    getDataFlow(){
        const value = this._dataflowValue$.getValue();
        return value
    }


    setAdminData(data:any){
        this._allAdminData$.next(data)
    }


    getAdminData(){
        return this._allAdminData$.asObservable()
    }

    
}