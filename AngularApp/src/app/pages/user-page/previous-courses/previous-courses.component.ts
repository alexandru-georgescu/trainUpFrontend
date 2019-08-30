import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ShareService } from 'src/app/services/share.service';
import { UserService } from 'src/app/services/user-service.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-previous-courses',
  templateUrl: './previous-courses.component.html',
  styleUrls: ['./previous-courses.component.css']
})
export class PreviousCoursesComponent implements OnInit {

  user : User;
  courses : Course[];

  constructor(private share : ShareService,
      private userService : UserService) {
  }

  ngOnInit() {

    this.share.currentMessage.subscribe(data => this.user = JSON.parse(data));
    this.userService.getPreviousCourses(this.user).subscribe(data => { this.courses = data });
    
    
  }

}
