import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm : FormGroup;
  user : User;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    
   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
      });
  }

  get controls() {
    return this.registerForm.controls;
}

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) { 
      return; 
    }
    
    this.register();
    this.router.navigate(['/login']);
  }
  
  register() {
     let url = 'http://localhost:8080/register?email=' + this.controls.email.value +
               '&firstName=' + this.controls.firstName.value +
               '&lastName=' + this.controls.lastName.value + 
               '&password=' + this.controls.password.value +
               '&confPassword=' + this.controls.cPassword.value;
     this.userService.findAll(url).subscribe(data => {
       this.user = data;
     });
  }

}