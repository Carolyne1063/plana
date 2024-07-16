import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService/user.service';

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
  registerSuccessMessage: string | null = null;
  registerErrorMessage: string | null = null;
  loginSuccessMessage: string | null = null;
  loginErrorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
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
      this.userService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.registerSuccessMessage = 'Registration successful!';
          this.registerErrorMessage = null;
          this.redirectUser(response.role);
        },
        error => {
          console.error('Registration error:', error);
          this.registerErrorMessage = 'Registration failed. Please try again.';
          this.registerSuccessMessage = null;
        }
      );
    } else {
      console.log('Registration form is invalid');
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Login successful:', response);
          this.loginSuccessMessage = 'Login successful!';
          this.loginErrorMessage = null;
          this.redirectUser(response.role);
        },
        error => {
          console.error('Login error:', error);
          this.loginErrorMessage = 'Login failed. Please try again.';
          this.loginSuccessMessage = null;
        }
      );
    } else {
      console.log('Login form is invalid');
    }
  }

  redirectUser(role: string): void {
    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'manager') {
      this.router.navigate(['/manager']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
  }
}
