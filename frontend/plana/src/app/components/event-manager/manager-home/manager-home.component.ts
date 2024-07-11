import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manager-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-home.component.html',
  styleUrl: './manager-home.component.css'
})
export class ManagerHomeComponent {
  showForm = false;
  eventData = {
    eventname: '',
    price: '',
    description: '',
    location: '',
    time: '',
    date: ''
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  createEvent() {
    console.log('Event Created:', this.eventData);
    // Implement event creation logic here
    this.toggleForm();
  } 
}
