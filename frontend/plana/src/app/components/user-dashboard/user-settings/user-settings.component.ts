import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';
import { UserService } from '../../../services/userService/user.service';
import { User } from '../../../interfaces/users';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  userForm: FormGroup;

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
      profile: [''], // Add this line to handle the profile image URL
      password: ['', Validators.minLength(6)],
      confirmPassword: ['', Validators.minLength(6)]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const userId = this.authService.getUserId();
    if (userId) { // Check if userId is not null
      this.userService.getUserById(userId).subscribe(user => {
        this.userForm.patchValue({
          fname: user.firstname,
          lname: user.lastname,
          phone: user.phoneNumber,
          email: user.email,
          profile: user.image // Make sure the profile field is patched with the image URL
        });
      });
    } else {
      console.error('User ID is null');
      // Handle the case where userId is null
    }
  }

  onSubmit() {
    const userId = this.authService.getUserId();
    if (userId) { // Check if userId is not null
      if (this.userForm.valid) {
        const updatedUser: Partial<User> = {
          firstname: this.userForm.value.fname,
          lastname: this.userForm.value.lname,
          phoneNumber: this.userForm.value.phone,
          email: this.userForm.value.email,
          password: this.userForm.value.password,
          image: this.userForm.value.profile // Add this line to include the image URL
        };
        this.userService.update(userId, updatedUser).subscribe(() => {
          // Handle success, e.g., show a success message
        });
      }
    } else {
      console.error('User ID is null');
      // Handle the case where userId is null
    }
  }

}
