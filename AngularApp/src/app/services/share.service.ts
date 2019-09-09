import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  private acceptedSource = new BehaviorSubject(undefined);
  accepted = this.acceptedSource.asObservable();

  changeAccepted(accepted: number) {
    this.acceptedSource.next(accepted);
  }

  private rejectedSource = new BehaviorSubject(undefined);
  rejected = this.rejectedSource.asObservable();

  changeRejected(rejected: number) {
    this.rejectedSource.next(rejected);
  }

  private domainSource = new BehaviorSubject(undefined);
  domain = this.domainSource.asObservable();

  changeDomain(domain: string) {
    this.domainSource.next(domain);
  }
}