// import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { User } from 'src/app/models/user';
// import { ShareService } from 'src/app/services/share.service';

// @Component({
//   selector: 'app-modal',
//   templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.css']
// })
// export class ModalComponent implements OnInit {
//   user: User;
//   accepted: number;
//   rejected: number;
//   domain: string;
//   teamPercentage: string;

//   constructor(
//     public dialogRef: MatDialogRef<ModalComponent>,
//     private shareService: ShareService) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   ngOnInit() {
//     this.user = JSON.parse(localStorage.getItem('currentUser'));
//     this.shareService.accepted.subscribe(data => this.accepted = data);
//     this.shareService.rejected.subscribe(data => this.rejected = data);
//     this.shareService.domain.subscribe(data => this.domain = data);
//     this.shareService.teamPercentage.subscribe(data => this.teamPercentage = data + '%');
//   }

// }
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent /*implements OnInit*/ {

  dataSource1: Object;
  dataSource2: Object;

  constructor(public dialogRef: MatDialogRef<ModalComponent>) {
    this.dataSource1 = {
      chart: {
        caption: "Team's enrollment coverage",
        subCaption: "per type of course",
        xAxisName: "Type of course",
        yAxisName: "Participants",
        // numberSuffix: "K",
        theme: "candy"
      },
      // Chart Data
      data: [
        {
          label: "Tech",
          value: "3"
        },
        {
          label: "Soft",
          value: "1"
        },
        {
          label: "Process",
          value: "9"
        },
      ]
    }; // end of this.dataSource1
    
    this.dataSource2 = {
      chart: {
        caption: "Number of enrollments",
        subCaption: "per month",
        xAxisName: "Month",
        yAxisName: "Participants",
        // numberSuffix: "K",
        theme: "candy"
      },
      // Chart Data
      data: [
        {
          label: "JAN",
          value: "3"
        },
        {
          label: "FEB",
          value: "1"
        },
        {
          label: "MAR",
          value: "16"
        },
        {
          label: "APR",
          value: "13"
        },
        {
          label: "MAY",
          value: "21"
        },
        {
          label: "JUN",
          value: "9"
        },
        {
          label: "JUL",
          value: "9"
        },
        {
          label: "AUG",
          value: "8"
        },
        {
          label: "SEP",
          value: "9"
        },
        {
          label: "OCT",
          value: "13"
        },
        {
          label: "NOV",
          value: "15"
        },
        {
          label: "DEC",
          value: "12"
        },
      ]
    }; // end of this.dataSource2
  } // end of constructor

  onNoClick(): void {
    this.dialogRef.close();
  }

  // ngOnInit() {
  //   this.user = JSON.parse(localStorage.getItem('currentUser'));
  //   this.shareService.accepted.subscribe(data => this.accepted = data);
  //   this.shareService.rejected.subscribe(data => this.rejected = data);
  //   this.shareService.domain.subscribe(data => this.domain = data);
  //   this.shareService.teamPercentage.subscribe(data => this.teamPercentage = data + '%');
  // }

}