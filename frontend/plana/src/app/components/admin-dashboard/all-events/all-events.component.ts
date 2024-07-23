import { Component } from '@angular/core';
import { Event } from '../../../interfaces/event';
import { EventService } from '../../../services/eventService/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchTerm: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data: Event[]) => {
        this.events = data;
        this.filteredEvents = data;
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  searchEvents(): void {
    this.filteredEvents = this.events.filter(event =>
      event.eventName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
