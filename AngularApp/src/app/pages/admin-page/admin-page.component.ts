import { Component, OnInit } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course-service.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {


  user: User;
  users: User[];
  sortedDataUser: User[];
  defaultUsers: User[];
  types: String[];
  enables: boolean[];
  leaders: string[];
  selectedUserType : String[];
  selectedUserEnable : boolean[];
  selectedUserLeader : String[];



  courses: Course[];
  sortedDataCourse: Course[];
  defaultCourses: Course[];
  projectManagers : string[];
  domains : string[];
  selectedCoursePm : string[];
  selectedCourseDomain : string[];

  constructor(private loginPage: LoginPageComponent,
    private router: Router,
    private userService: UserService,
    private courseService: CourseService,
    private toastr: ToastrService

  ) {
    this.types = ['TM', 'PMTECH', 'PMSOFT', 'PMPROC', 'USER'];
    this.enables = [false, true];
    this.domains = ['RCA', 'GTB', 'NFR', 'PWCC'];
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.usersFindAll().subscribe(users => {
      this.leaders = users.filter(u => u.type != 'USER').map(u => u.email);
      this.projectManagers = users.filter(u => u.type === 'PMSOFT' || u.type == 'PMTECH' || u.type == 'PMPROC').map(u => u.email);

      this.users = users.slice(1, users.length);
      this.sortedDataUser = this.users;
      this.updateUserData();
      if (this.defaultUsers === undefined) {
        this.defaultUsers = JSON.parse(JSON.stringify(this.users));
      }
    });

    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      this.sortedDataCourse = this.courses;
      this.updateCourseData();
      if (this.defaultCourses === undefined) {
        this.defaultCourses = JSON.parse(JSON.stringify(this.courses));
      }
    });

  }

  sortDataUser(sort: Sort) {
    const data = this.users;
    if (!sort.active || sort.direction === '') {
      this.sortedDataUser = data;
      return;
    }
    this.sortedDataUser = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'enable': return compare(a.enable.valueOf.toString(), b.enable.valueOf.toString(), isAsc);
        case 'leader': return compare(a.leader, b.leader, isAsc);
        default: return 0;
      }
    });
    this.updateUserData();
  }

  updateUserData() {
    this.selectedUserType = this.sortedDataUser.map(u => u.type);
    this.selectedUserEnable = this.sortedDataUser.map(u => u.enable);
    this.selectedUserLeader = this.sortedDataUser.map(u => u.leader);
  }

  sortDataCourse(sort: Sort) {
    const data = this.courses;
    if (!sort.active || sort.direction === '') {
      this.sortedDataCourse = data;
      return;
    }
    this.sortedDataCourse = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'courseName': return compare(a.courseName, b.courseName, isAsc);
        case 'capacity': return compare(a.capacity, b.capacity, isAsc);
        case 'actualCapacity': return compare(a.actualCapacity, b.actualCapacity, isAsc);
        case 'projectManager': return compare(a.projectManager, b.projectManager, isAsc);
        case 'startDate': return compare(a.startDate.toString(), b.startDate.toString(), isAsc);
        case 'endDate': return compare(a.startDate.toString(), b.startDate.toString(), isAsc);
        case 'domain': return compare(a.domain, b.domain, isAsc);
        case 'timeInterval': return compare(a.timeInterval, b.timeInterval, isAsc);
        default: return 0;
      }
    });
    this.updateCourseData();
  }

  updateCourseData() {
    this.selectedCoursePm = this.sortedDataCourse.map(c => c.projectManager);
    this.selectedCourseDomain = this.sortedDataCourse.map(c => c.domain);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loginPage.loggedIn = false;
    localStorage.setItem('loggedIn', 'false');
    this.loginPage.alreadyLoggedIn = false;
    this.router.navigate(['/login']);
  }

  resetChangesUser() {
    this.users = this.defaultUsers;
    this.ngOnInit();
  }

  saveChangesUser() {
    if (confirm("This changes can't be undone. Are you sure?")){
    this.defaultUsers = JSON.parse(JSON.stringify(this.users));
    this.userService.updateUsers(this.users).subscribe(a => {this.ngOnInit()},
    error => {
      this.toastr.error("Failed request", "Fail!", {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      })
    },
    () => this.toastr.success("Data has been saved", "Success!", {
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    }));
  }
    
  }

  resetChangesCourse() {
    this.courses = this.defaultCourses;
    this.ngOnInit();
  }

  saveChangesCourse() {
    if (confirm("This changes can't be undone. Are you sure?")){
    this.defaultCourses = JSON.parse(JSON.stringify(this.courses));
    this.courseService.updateCourses(this.courses).subscribe(a => {this.ngOnInit()},
    error => {
      this.toastr.error("Failed request", "Fail!", {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      })
    },
    () => this.toastr.success("Data has been saved", "Success!", {
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    }));
  }
    
  }

  changeType(index: number, newType: string) {
    this.sortedDataUser[index].type = newType;
    this.users = this.sortedDataUser;
  }

  changeEnable(index: number, newEnable: boolean) {
    this.sortedDataUser[index].enable = newEnable;
    this.users = this.sortedDataUser;
  }

  changeLeader(index: number, newLeader: string) {
    this.sortedDataUser[index].leader = newLeader;
    this.users = this.sortedDataUser;
  }

  changeProjectManager(index: number, newProjectManager: string) {
    this.sortedDataCourse[index].projectManager = newProjectManager;
    this.users = this.sortedDataUser;
  }

  changeDomain(index: number, newDomain: string) {
    this.sortedDataCourse[index].domain = newDomain;
    this.users = this.sortedDataUser;
  }

  deleteUser(user : User) {
    if(confirm("User "+ user.email + " will be deleted. Are you sure?")) {
      this.userService.removeUserById(user.id.toString()).subscribe(a => {this.ngOnInit()},
      error => {
        this.toastr.error("Failed request", "Fail!", {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        })
      },
      () => this.toastr.success("User has been deleted", "Success!", {
        timeOut: 2000,
        positionClass: 'toast-bottom-right'
      }));
    }
  }

  deleteCourse(course : Course) {
    if(confirm("Course "+ course.courseName + " will be deleted. Are you sure?")) {
      this.courseService.removeCourseById(course.id.toString()).subscribe(a => {this.ngOnInit()},
      error => {
        this.toastr.error("Failed request", "Fail!", {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        })
      },
      () => this.toastr.success("Course has been deleted", "Success!", {
        timeOut: 2000,
        positionClass: 'toast-bottom-right'
      }));
    }
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}