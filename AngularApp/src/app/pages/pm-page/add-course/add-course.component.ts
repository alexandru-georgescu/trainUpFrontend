import { Component, OnInit} from '@angular/core';
import { MatDialogRef, ErrorStateMatcher} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course-service.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseForm : FormGroup;
  course : Course;
  user : User;
  submitted = false;
  alreadyRegistered = false;

  constructor(
    public dialogRef: MatDialogRef<AddCourseComponent>,
    private formBuilder: FormBuilder,
    private courseService: CourseService) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.submitted = true;

    if (this.courseForm.invalid) { 
      return; 
    }

    this.dialogRef.close();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    let course = new Course(this.controls.name.value, this.controls.capacity.value, 0, this.controls.startDate.value, this.controls.endDate.value, this.user.email);
    this.courseService.addCourse(course).subscribe(data => {
      this.course = data;
      console.log(this.course);
    });

  }

  get controls() {
    return this.courseForm.controls;
  }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      });
  }

}