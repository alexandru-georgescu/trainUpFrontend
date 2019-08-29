import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-current-courses',
  templateUrl: './current-courses.component.html',
  styleUrls: ['./current-courses.component.css']
})
export class CurrentCoursesComponent implements OnInit {

  user : User;
  
  constructor(private share : ShareService) { }

  ngOnInit() {
    this.share.currentMessage.subscribe(data => this.user = JSON.parse(data));
  }

}
