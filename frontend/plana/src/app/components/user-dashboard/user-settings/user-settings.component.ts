import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
  user = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  
}
