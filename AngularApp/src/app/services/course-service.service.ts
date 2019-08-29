import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../models/course';
import { Observable } from 'rxjs';
import { Consts } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {
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
