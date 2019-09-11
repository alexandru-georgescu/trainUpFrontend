import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { User } from 'src/app/models/user';
import { Course } from 'src/app/models/course';
import { UserService } from 'src/app/services/user-service.service';
import { Sort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-next-courses',
  templateUrl: './next-courses.component.html',
  styleUrls: ['./next-courses.component.css']
})



export class NextCoursesComponent implements OnInit {

  user: User;
  courses: Course[];
  sortedData: Course[];
  unavailableCourses: Course[];
  currentCourses: Course[];

  constructor(private share: ShareService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  sortData(sort: Sort) {
    const data = this.courses.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'courseName': return compare(a.courseName, b.courseName, isAsc);
        case 'capacity': return compare(a.capacity, b.capacity, isAsc);
        case 'actualCapacity': return compare(a.actualCapacity, b.actualCapacity, isAsc);
        case 'domain': return compare(a.domain, b.domain, isAsc);
        default: return 0;
      }
    });
  }

  ngOnInit() {
    this.share.currentMessage.subscribe(data => {
      this.user = JSON.parse(data);
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      this.userService.getFutureCourses(this.user).subscribe(futureCourses => {
        this.courses = futureCourses;
        this.sortedData = this.courses.slice();
        this.userService.getCurrentCourses(this.user).subscribe(currentCourses => {
          this.unavailableCourses = new Array();
          futureCourses.forEach(course => {
            this.filterUnavailableCourses(course, currentCourses)
          });
          this.unavailableCourses.forEach(course => {
            const index: number = this.courses.indexOf(course);
            if (index !== -1) {
              this.courses.splice(index, 1);
            }
          });
          this.sortedData = this.courses.slice();
        });
      });
    });
  }

  rowClick(course: Course): void {
    this.userService.addWishToEnroll(this.user, course).subscribe(data => {
      this.user = data;
      this.ngOnInit();
    },
      error => {
        this.toastr.error("Failed request", "Fail!", {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        })
      },
      () => this.toastr.success("Your request has been sent", "Success!", {
        timeOut: 2000,
        positionClass: 'toast-bottom-right'
      }));
  }

  filterUnavailableCourses(course: Course, currentCourses: Course[]) {
    if (currentCourses.length == 0) return;
    let courseInterval = this.timeIntervalParser(course.timeInterval);
    currentCourses.forEach(currCourse => {
      let currCourseInterval = this.timeIntervalParser(currCourse.timeInterval);
      if (
        (courseInterval.startHHMM <= currCourseInterval.startHHMM && courseInterval.endHHMM >= currCourseInterval.endHHMM) ||
        (courseInterval.startHHMM <= currCourseInterval.startHHMM && courseInterval.endHHMM <= currCourseInterval.endHHMM && courseInterval.endHHMM >= currCourseInterval.startHHMM) ||
        (courseInterval.startHHMM >= currCourseInterval.startHHMM && courseInterval.startHHMM <= currCourseInterval.endHHMM && courseInterval.endHHMM <= currCourseInterval.endHHMM && courseInterval.endHHMM >= currCourseInterval.startHHMM) ||
        (courseInterval.startHHMM >= currCourseInterval.startHHMM && courseInterval.startHHMM <= currCourseInterval.endHHMM && courseInterval.endHHMM >= currCourseInterval.endHHMM)) {
        this.unavailableCourses.push(course);
        return;
      }
    });
    return;
  }

  timeIntervalParser(timeIntervalString: String): TimeIntervalType {
    let parsedTimeInterval: TimeIntervalType;
    parsedTimeInterval = {
      startHHMM: parseInt(timeIntervalString.substr(0, 2), 10) * 60 + parseInt(timeIntervalString.substr(3, 2), 10),
      endHHMM: parseInt(timeIntervalString.substr(6, 2), 10) * 60 +  parseInt(timeIntervalString.substr(9, 2), 10)
    }
    return parsedTimeInterval;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

type TimeIntervalType = {
  startHHMM: Number;
  endHHMM: Number;
  
};