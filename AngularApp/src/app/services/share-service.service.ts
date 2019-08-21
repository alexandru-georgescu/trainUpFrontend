import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareServiceService {
  
  getUserData$: Observable<any>;
  private getUserDataSubject = new Subject<any>();

  constructor() {
      this.getUserData$ = this.getUserDataSubject.asObservable();
  }

  getUserData(data) {
      this.getUserDataSubject.next(data);
  }
}
