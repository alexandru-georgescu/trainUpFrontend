import { Component, OnInit } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';
import { Sort } from '@angular/material/sort';



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  // set tm to user 
  // set pm to user

  user : User;
  users : User[];
  sortedData: User[];
  default : User[];
  types : String[];
  enables : boolean[];

  constructor(private loginPage: LoginPageComponent,
    private router: Router,
    private userService : UserService
    ) {
      this.types = ['TM', 'PM', 'USER'];
      this.enables = [false, true];
    }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.usersFindAll().subscribe(users => {
      this.users = users;
      this.sortedData = this.users.slice(1, this.users.length);
      if (this.default == undefined) {
        this.default = this.users; // lista inainte de modificari
      }
    });
    
  }

  sortData(sort: Sort) {
    const data = this.users.slice(1, this.users.length);
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

  resetChanges() {
    this.users = this.default;
    console.log(this.users);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
