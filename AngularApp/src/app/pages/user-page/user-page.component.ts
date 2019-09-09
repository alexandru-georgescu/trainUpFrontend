import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { ShareService } from 'src/app/services/share.service';
import { MatDialog } from '@angular/material';
import { CurrentCoursesComponent } from './current-courses/current-courses.component';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {


  user: User;

  constructor(private router: Router,
    private loginPage: LoginPageComponent,
    private share: ShareService,
    private dialog: MatDialog
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.share.changeMessage(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
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

  onStatistic() {
    const dialogRef = this.dialog.open(CurrentCoursesComponent, {
      width: '560px',
      height: '250px',
    });
  }
}