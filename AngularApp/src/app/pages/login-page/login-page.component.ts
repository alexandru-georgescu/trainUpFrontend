import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  loginForm : FormGroup;
  user : User[];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
      });
  }

  get controls() {
    return this.loginForm.controls;
}

  onSubmit() {
    console.log('Submit button Works');
    console.log(this.controls.email.value);
    console.log(this.controls.password.value);
    
    this.login();
  }
  
  login() {
    let url = 'http://localhost:8080/login?username=' + this.controls.email.value + '&password=' + this.controls.password.value;
    this.userService.findAll(url).subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }
}
