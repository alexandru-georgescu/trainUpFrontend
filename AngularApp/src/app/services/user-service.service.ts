import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Consts } from '../consts'
import { Course } from '../models/course';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  public register(data: User): Observable<User> {
    let headers_object = new HttpHeaders();
    headers_object = headers_object.append('Content-Type', 'application/json');
    headers_object = headers_object.append('Authorization', 'Basic ' + btoa('admin:AlexGAdmin'));

    const httpOptions = {
      headers: headers_object
    };
    return this.http.post<User>(Consts.backUrl + 'user/register', data, httpOptions);
  }

  public login(data: User): Observable<User> {
    let headers_object = new HttpHeaders();
    headers_object = headers_object.append('Content-Type', 'application/json');
    headers_object = headers_object.append('Authorization', 'Basic ' + btoa('admin:AlexGAdmin'));

    const httpOptions = {
      headers: headers_object
    };
    return this.http.post<User>(Consts.backUrl + 'user/login', data, httpOptions);
  }

  public getFutureCourses(): Observable<Course[]> {
    let headers_object = new HttpHeaders();
    headers_object = headers_object.append('Content-Type', 'application/json');
    headers_object = headers_object.append('Authorization', 'Basic ' + btoa('admin:AlexGAdmin'));

    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<Course[]>(Consts.backUrl + 'course', httpOptions);
  }

  public addCourse(data: Course): Observable<Course> {
    let headers_object = new HttpHeaders();
    headers_object = headers_object.append('Content-Type', 'application/json');
    headers_object = headers_object.append('Authorization', 'Basic ' + btoa('admin:AlexGAdmin'));

    const httpOptions = {
      headers: headers_object
    };
    return this.http.post<Course>(Consts.backUrl + 'course/add', data, httpOptions);
  }
}
