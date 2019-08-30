import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/pages/tm-page/modal/modal.component';
import { User } from 'src/app/models/user';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-tm-page',
  templateUrl: './tm-page.component.html',
  styleUrls: ['./tm-page.component.css']
})
export class TmPageComponent implements OnInit {

  users: User[];
  sortedData: User[];
  user: User;
  
  constructor(public dialog: MatDialog, private userService: UserService) {}

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        default: return 0;
      }
    });
  }

  ngOnInit() {
    
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getTMUsers(this.user.email).subscribe(data => {
      
      this.users = data,
      this.sortedData = this.users.slice();
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}