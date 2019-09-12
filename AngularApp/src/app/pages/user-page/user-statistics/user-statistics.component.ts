// import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material';
// import { ShareService } from 'src/app/services/share.service';
// import { User } from 'src/app/models/user';
// import { Course } from 'src/app/models/course';

// @Component({
//   selector: 'app-user-statistics',
//   templateUrl: './user-statistics.component.html',
//   styleUrls: ['./user-statistics.component.css']
// })
// export class UserStatisticsComponent implements OnInit {

//   user: User;
//   bestCourse: Course;
//   bestPastCourse: Course;

//   constructor(
//     public dialogRef: MatDialogRef<UserStatisticsComponent>,
//     private shareService: ShareService
//   ) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   ngOnInit() {
//     this.user = JSON.parse(localStorage.getItem('currentUser'));
//     this.shareService.bestCourse.subscribe(data => this.bestCourse = data);
//     this.shareService.bestPastCourse.subscribe(data => this.bestPastCourse = data);
//   }

// }
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
  attendedDays: number;
  upcomingDays: number;
  courseStatistic: number[];
  dataSource: Object;

  constructor(
    public dialogRef: MatDialogRef<UserStatisticsComponent>,
    private shareService: ShareService
  ) {
    this.courseStatistic = JSON.parse(localStorage.getItem('courseStatistic'));
      this.dataSource = {
        chart: {
          caption: "Team's enrollment coverage",
          subCaption: "per type of course",
          xAxisName: "Type of course",
          yAxisName: "Participants",
          // numberSuffix: "K",
          theme: "candy"
        },
        // Chart Data
        data: [
          {
            label: "Tech",
            value: this.courseStatistic[0]
          },
          {
            label: "Soft",
            value: this.courseStatistic[1]
          },
          {
            label: "Process",
            value: this.courseStatistic[2]
          },
        ]
      }; // end of this.dataSource
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.shareService.attendedDays.subscribe(data => {
      this.attendedDays = data;
      this.shareService.upcomingDays.subscribe(data => {
        this.upcomingDays = data;
      });
    });
  }

}