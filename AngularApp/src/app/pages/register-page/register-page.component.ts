import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm : FormGroup;
  user : User[];
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    
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

    if (this.registerForm.invalid || this.controls.password.value != this.controls.cPassword.value) { 
      return; 
    }
    
    console.log('Submit button Works');
    console.log(this.controls.email.value);
    console.log(this.controls.password.value);
    
    this.register();
  }
  
  register() {
     let url = 'http://localhost:8080/register?email=' + this.controls.email.value +
               '&firstName=' + this.controls.firstName.value +
               '&lastName=' + this.controls.lastName.value + 
               '&password=' + this.controls.password.value +
               '&confPassword=' + this.controls.cPassword.value;
     this.userService.findAll(url).subscribe(data => {
       this.user = data;
       console.log(this.user);
     });
  }

}
