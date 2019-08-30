import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { User } from 'src/app/models/user';
import { Course } from 'src/app/models/course';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-next-courses',
  templateUrl: './next-courses.component.html',
  styleUrls: ['./next-courses.component.css']
})
export class NextCoursesComponent implements OnInit {

  user : User;
  courses : Course[];

  constructor(private share : ShareService,
              private userService : UserService,
              ) {}

  ngOnInit() {
    this.share.currentMessage.subscribe(data => this.user = JSON.parse(data));
    this.userService.getFutureCourses().subscribe(data => {this.courses = data});
    
  }

  rowClick(course: Course): void {
    this.userService.addWishToEnroll(this.user, course).subscribe(data => this.user = data);
    localStorage.setItem('currentUser', JSON.stringify(this.user));

  }

}
