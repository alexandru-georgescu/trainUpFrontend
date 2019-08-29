import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/pages/tm-page/modal/modal.component';
import { User } from 'src/app/models/user';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

const USERS: User[] = [
  {id: 1, email: 'a.b@trainup.com', firstName: 'a', lastName: 'b', password: 'Alex1234', type: 'basic', courses: []},
  {id: 2, email: 'b.c@trainup.com', firstName: 'b', lastName: 'c', password: 'Alex1234', type: 'basic', courses: []},
];

@Component({
  selector: 'app-tm-page',
  templateUrl: './tm-page.component.html',
  styleUrls: ['./tm-page.component.css']
})
export class TmPageComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  
  displayedColumns: string[] = ['courses', 'firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource(USERS);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '48%',
      height: '85%',
      position: {right: '1%'},
      hasBackdrop: false,
      disableClose: false
    });

  }

}
