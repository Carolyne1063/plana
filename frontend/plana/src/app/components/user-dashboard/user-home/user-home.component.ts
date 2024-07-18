import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/eventService/event.service';
import { Event } from '../../../interfaces/event';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getAllEvents().subscribe(
      (data: Event[]) => {
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  openForm() {
    const form = document.getElementById("bookingForm");
    if (form) form.style.display = "block";
    document.body.classList.add("blur");
  }

  closeForm() {
    const form = document.getElementById("bookingForm");
    if (form) form.style.display = "none";
    document.body.classList.remove("blur");
  }
}
