import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerDataService {
    public _allWorkerData$:any = new BehaviorSubject(null);  
    constructor() {

    }


    setWorkerData(data:any){
        this._allWorkerData$.next(data)
    }


    getWorkerData(){
        return this._allWorkerData$.asObservable()
    }

    
}