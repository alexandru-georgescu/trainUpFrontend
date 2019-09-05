import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { AddCourseComponent } from './add-course/add-course.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course-service.service';
import { UserService } from 'src/app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-pm-page',
  templateUrl: './pm-page.component.html',
  styleUrls: ['./pm-page.component.css']
})
export class PmPageComponent implements OnInit {
  user: User;
  users: User[];
  usersList: User[][];
  courses: Course[];
  sortedData: User[][];
  sentUser: User; //userul primit ca raspuns de la backend

  constructor(public dialog: MatDialog,
    private loginPage: LoginPageComponent,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private toastr: ToastrService) { }

  sortData(sort: Sort) {
    this.usersList.forEach((el, index) => {
      const data = el;
      if (!sort.active || sort.direction === '') {
        this.sortedData[index] = data;
        return;
      }
      this.sortedData[index] = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'firstName': return compare(a.firstName, b.firstName, isAsc);
          case 'lastName': return compare(a.lastName, b.lastName, isAsc);
          case 'email': return compare(a.email, b.email, isAsc);
          default: return 0;
        }
      });
    })

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.courseService.getPmCourses(this.user).subscribe(data => {
      this.courses = data;
      this.usersList = new Array(this.courses.length);
      this.sortedData = new Array(this.courses.length);

      this.courses.forEach((course, index) => {
        this.usersList[index] = new Array();
        this.sortedData[index] = new Array();
        this.userService.getWaitUserCourses(course).subscribe(result => {
          this.usersList[index] = this.usersList[index].concat(result);
          console.log(this.usersList[index]);
          this.sortedData[index] = this.usersList[index].slice();
        })
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      width: '560px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSubmit() {
    this.logout();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loginPage.loggedIn = false;
    localStorage.setItem('loggedIn', 'false');
    this.loginPage.alreadyLoggedIn = false;
    this.router.navigate(['/login']);
  }

  yesClick(user: User, course: Course): void {
    this.userService.acceptCourse(user, course).subscribe(data => {
      this.sentUser = data;
      this.courseService.getPmCourses(this.user).subscribe(data => {
        this.courses = data;
        this.usersList = new Array(this.courses.length);
        this.sortedData = new Array(this.courses.length);

        this.courses.forEach((course, index) => {
          this.usersList[index] = new Array();
          this.sortedData[index] = new Array();
          this.userService.getWaitUserCourses(course).subscribe(result => {
            this.usersList[index] = this.usersList[index].concat(result);
            // console.log(this.usersList[index]);
            this.sortedData[index] = this.usersList[index].slice();
          });
        });
      },
        error => {
          this.toastr.error("Failed request", "Fail!", {
            timeOut: 3000
          })
        }
      );
    },
      error => {
        this.toastr.error("Failed request", "Fail!", {
          timeOut: 3000
        })
      },
      () => this.toastr.success("Your request has been sent", "Success!", {
        timeOut: 2000
      }))
  }


  noClick(user: User, course: Course): void {
    this.userService.denyCourse(user, course).subscribe(data => {
      this.sentUser = data;
      this.courseService.getPmCourses(this.user).subscribe(data => {
        this.courses = data;
        this.usersList = new Array(this.courses.length);
        this.sortedData = new Array(this.courses.length);

        this.courses.forEach((course, index) => {
          this.usersList[index] = new Array();
          this.sortedData[index] = new Array();
          this.userService.getWaitUserCourses(course).subscribe(result => {
            this.usersList[index] = this.usersList[index].concat(result);
            // console.log(this.usersList[index]);
            this.sortedData[index] = this.usersList[index].slice();
          });
        });
      },
        error => {
          this.toastr.error("Failed request", "Fail!", {
            timeOut: 3000
          })
        }
      );
    },
      error => {
        this.toastr.error("Failed request", "Fail!", {
          timeOut: 3000
        })
      },
      () => this.toastr.success("Your request has been sent", "Success!", {
        timeOut: 2000
      }))
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

