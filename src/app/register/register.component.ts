import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null,
    dob: null,
    gender: null,
    documentType: null,
    documentNumber: null,
    province: null,
    city: null,
    phoneNumber: null,
    terms: false
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const {
      username,
      email,
      password,
      dob,
      gender,
      documentType,
      documentNumber,
      province,
      city,
      phoneNumber,
      terms
    } = this.form;

    this.authService.register({
      username,
      email,
      password,
      dob,
      gender,
      documentType,
      documentNumber,
      province,
      city,
      phoneNumber,
      terms
    }).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
