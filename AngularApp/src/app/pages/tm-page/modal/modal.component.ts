import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  user: User;
  accepted: number;
  rejected: number;
  domain: string;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private shareService: ShareService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.shareService.accepted.subscribe(data => this.accepted = data);
    this.shareService.rejected.subscribe(data => this.rejected = data);
    this.shareService.domain.subscribe(data => this.domain = data);
  }

}
