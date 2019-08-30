import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ShareService } from 'src/app/services/share.service';
import { Course } from 'src/app/models/course';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-current-courses',
  templateUrl: './current-courses.component.html',
  styleUrls: ['./current-courses.component.css']
})
export class CurrentCoursesComponent implements OnInit {

  user: User;
  courses: Course[];

  constructor(private share: ShareService,
    private userService: UserService) { }

  ngOnInit() {
    this.share.currentMessage.subscribe(data => this.user = JSON.parse(data));

    this.userService.getCurrentCourses(this.user).subscribe(data => this.courses = data);

  }

}
