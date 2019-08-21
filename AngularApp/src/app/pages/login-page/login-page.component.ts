import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { ShareServiceService } from 'src/app/services/share-service.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  
  
  loginForm : FormGroup;
  user : User[];
  submitted = false;
  wrongInput = false;


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private shareUser: ShareServiceService) {
    
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
      });
  }

  get controls() {
    return this.loginForm.controls;
  }
  


  onSubmit() {
    this.submitted = true;   
    if (this.controls.email.value != '' && this.controls.password.value != '') {
      this.login();
    } 
  }
  
  login() {
    let url = 'http://localhost:8080/login?username=' + this.controls.email.value + '&password=' + this.controls.password.value;
    this.userService.findAll(url).subscribe(data => {
      this.user = data;
      if (this.user == null) {
        this.controls.email.setValue('');
        this.controls.password.setValue('');
        this.submitted = false;
        this.wrongInput = true;
        
      } else {
        this.router.navigate(['/user']);
        this.shareUser.getUserData(this.user);
      }
    });
  }
}
