import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-previous-courses',
  templateUrl: './previous-courses.component.html',
  styleUrls: ['./previous-courses.component.css']
})
export class PreviousCoursesComponent implements OnInit {

  user : User;

  constructor(private share : ShareService) {

    this.share.currentMessage.subscribe(data => this.user = JSON.parse(data));
  }

  ngOnInit() {
    
  }

}
