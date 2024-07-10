import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const container = document.getElementById('container');
    const signUpBtn = document.getElementById('signUp');
    const signInBtn = document.getElementById('signIn');

    if (signUpBtn && signInBtn && container) {
      signUpBtn.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });

      signInBtn.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      // Handle registration logic
      console.log('Register:', this.registerForm.value);
    } else {
      console.log('Registration form is invalid');
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      // Handle login logic
      console.log('Login:', this.loginForm.value);
    } else {
      console.log('Login form is invalid');
    }
  }
}
