import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  enrollForm : FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private formBuilder: FormBuilder){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.enrollForm = this.formBuilder.group({
      trainingName: ['', Validators.required],
      nrParticipants: ['', Validators.required],
      trainingDay: ['', Validators.required],
      timeInterval: ['', Validators.required],
      participants: ['', Validators.required]
      });
  }

  get controls() {
    return this.enrollForm.controls;
  }

  onSubmit() {
    console.log("submit");

    this.submitted = true;

    if (this.enrollForm.invalid) {
      return;
    } else {
      this.dialogRef.close();
    }
    
  }

}
