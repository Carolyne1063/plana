import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/userService/user.service';
import { AuthService } from '../../../services/authService/auth.service';
import { User } from '../../../interfaces/users';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manager-settings.component.html',
  styleUrls: ['./manager-settings.component.css']
})
export class ManagerSettingsComponent implements OnInit {
  userForm: FormGroup;
  successMessage: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profile: [''], 
      password: ['', Validators.minLength(6)],
      confirmPassword: ['', Validators.minLength(6)]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.userForm.patchValue({
          fname: user.firstname,
          lname: user.lastname,
          phone: user.phoneNumber,
          email: user.email,
          profile: user.image 
        });
      }, error => {
        console.error('Error loading user data:', error);
      });
    } else {
      console.error('User ID is null or undefined');
    }
  }

  onSubmit() {
    const userId = this.authService.getUserId();
    if (userId) {
      if (this.userForm.valid) {
        const updatedUser: Partial<User> = {
          firstname: this.userForm.value.fname,
          lastname: this.userForm.value.lname,
          phoneNumber: this.userForm.value.phone,
          email: this.userForm.value.email,
          password: this.userForm.value.password,
          image: this.userForm.value.profile 
        };
        this.userService.update(userId, updatedUser).subscribe(() => {
          this.successMessage = 'Your profile has been updated successfully!'; 
          setTimeout(() => this.successMessage = null, 5000); 
        }, error => {
          console.error('Error updating user details:', error);
        });
      } else {
        console.error('Form is invalid');
      }
    } else {
      console.error('User ID is null or undefined');
    }
  }
}
