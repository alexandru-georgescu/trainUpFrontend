import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  
  constructor(private http: HttpClient) { 
  }

  public findAll(usersUrl: string) : Observable<User[]> {
    return this.http.get<User[]>(usersUrl);
  }

  // public save (user:User) {
  //   return this.http.post<User>(this.usersUrl, user);
  // }
}
