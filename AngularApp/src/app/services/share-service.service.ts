import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class ShareServiceService {
  
  userData : User;

  constructor() {
      this.userData = undefined;
  }

  setUserData(user: User){
    this.userData= user;
  }
  getUserData(){
    return this.userData;
  }
}
