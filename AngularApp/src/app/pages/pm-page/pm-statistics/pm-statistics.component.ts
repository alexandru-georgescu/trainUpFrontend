import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatDialogRef } from '@angular/material';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-pm-statistics',
  templateUrl: './pm-statistics.component.html',
  styleUrls: ['./pm-statistics.component.css']
})
export class PmStatisticsComponent implements OnInit {

  user: User;
  accepted: number;
  rejected: number;
  coverage: string;

  constructor(
    public dialogRef: MatDialogRef<PmStatisticsComponent>,
    private shareService: ShareService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}