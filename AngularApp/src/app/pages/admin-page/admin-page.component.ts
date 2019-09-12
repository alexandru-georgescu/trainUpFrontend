import { Component, OnInit } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  // TODO:
  //functie care sterge un user
  // r u sure pt delete user and save changes 

  user: User;
  users: User[];
  sortedData: User[];
  default: User[];
  types: String[];
  enables: boolean[];
  leaders: string[]

  constructor(private loginPage: LoginPageComponent,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService

  ) {
    this.types = ['TM', 'PMTECH', 'PMSOFT', 'PMPROC', 'USER'];
    this.enables = [false, true];
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.usersFindAll().subscribe(users => {
      this.leaders = users.filter(u => u.type != 'USER').map(u => u.email);
      this.users = users.slice(1, users.length);
      this.sortedData = this.users;
      if (this.default === undefined) {
        this.default = JSON.parse(JSON.stringify(this.users));
      }
    });

  }

  sortData(sort: Sort) {
    const data = this.users;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
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
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loginPage.loggedIn = false;
    localStorage.setItem('loggedIn', 'false');
    this.loginPage.alreadyLoggedIn = false;
    this.router.navigate(['/login']);
  }

  resetChanges() {
    this.users = this.default;
    this.ngOnInit();
  }

  saveChanges() {
    if (confirm("This changes can't be undone. Are you sure?")){
    this.default = JSON.parse(JSON.stringify(this.users));
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

  changeType(index: number, newType: string) {
    this.sortedData[index].type = newType;
    this.users = this.sortedData;
  }

  changeEnable(index: number, newEnable: string) {
    let newBoolEnable = newEnable.toLowerCase() == 'true' ? true : false; 
    this.sortedData[index].enable = newBoolEnable;
    this.users = this.sortedData;
  }

  changeLeader(index: number, newLeader: string) {
    this.sortedData[index].leader = newLeader;
    this.users = this.sortedData;
  }

  deleteUser(user : User) {
    //if(confirm("User "+ user.email + " will be deleted. Are you sure?")) {
      console.log("deleted");
    //}
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}