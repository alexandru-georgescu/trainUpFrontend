import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ShareService } from 'src/app/services/share.service';
import { User } from 'src/app/models/user';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {

  user: User;
  bestCourse: Course;
  bestPastCourse: Course;

  constructor(
    public dialogRef: MatDialogRef<UserStatisticsComponent>,
    private shareService: ShareService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.shareService.bestCourse.subscribe(data => this.bestCourse = data);
    this.shareService.bestPastCourse.subscribe(data => this.bestPastCourse = data);
  }

}
