import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ShareServiceService } from 'src/app/services/share-service.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {


  user: User;

  constructor(private shareUser: ShareServiceService) { 
    this.user = shareUser.getUserData();
  }

  ngOnInit() {
  }
}
