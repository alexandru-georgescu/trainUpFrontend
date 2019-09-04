import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotpasswordForm: FormGroup;
  submitted = false;
  user: User;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.forgotpasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  get controls() {
    return this.forgotpasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.userService.getUser(this.controls.email.value).subscribe(data => {
      this.user = data;
      console.log(data);
    });
    this.userService.resetPassword(this.user).subscribe(data => console.log(data));
  }

}
