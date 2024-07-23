import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EventService } from '../../../services/eventService/event.service'; // Update the path based on your actual location
import { TicketService } from '../../../services/ticketService/ticket.service'; // Update the path based on your actual location
import { Event as AppEvent } from '../../../interfaces/event'; // Update the path based on your actual location
import { Ticket } from '../../../interfaces/ticket'; // Update the path based on your actual location

@Component({
  selector: 'app-manager-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {
  showForm = false;
  eventForm: FormGroup;
  events: AppEvent[] = [];
  filteredEvents: AppEvent[] = [];
  totalBookings = 0;
  totalRevenue = 0; // Property to store total revenue
  isEditing = false;
  editingEventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private ticketService: TicketService
  ) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      location: ['', Validators.required],
      eventTime: ['', [Validators.required, this.timeValidator]],
      eventDate: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllEvents();
    this.getAllTickets(); // Fetch tickets to calculate bookings and revenue
  }
  
  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.isEditing = false;
      this.editingEventId = null;
      this.eventForm.reset();
    }
  }

  timeValidator(control: any) {
    const value = control.value;
    if (!/^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/.test(value)) {
      return { invalidTime: true };
    }
    return null;
  }

  createEvent() {
    if (this.eventForm.valid) {
      const newEvent: AppEvent = this.eventForm.value;
      if (this.isEditing && this.editingEventId) {
        this.eventService.updateEvent(this.editingEventId, newEvent).subscribe(() => {
          console.log('Event Updated:', newEvent);
          this.getAllEvents();
          this.toggleForm();
        }, error => {
          console.error('Error updating event:', error);
        });
      } else {
        this.eventService.createEvent(newEvent).subscribe(() => {
          console.log('Event Created:', newEvent);
          this.getAllEvents();
          this.toggleForm();
        }, error => {
          console.error('Error creating event:', error);
        });
      }
    }
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events; // Initialize filteredEvents
    }, error => {
      console.error('Error fetching events:', error);
    });
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe(tickets => {
      this.totalBookings = tickets.length;

      // Calculate total revenue from ticket prices
      this.totalRevenue = tickets.reduce((sum: number, ticket: Ticket) => sum + ticket.price, 0);

      console.log('Total Bookings:', this.totalBookings); // Log total bookings
      console.log('Total Revenue:', this.totalRevenue); // Log total revenue
    }, error => {
      console.error('Error fetching tickets:', error);
    });
  }

  editEvent(event: AppEvent) {
    this.isEditing = true;
    this.editingEventId = event.eventId || null;
    this.eventForm.patchValue({
      eventName: event.eventName,
      location: event.location,
      eventTime: event.eventTime,
      eventDate: new Date(event.eventDate).toISOString().split('T')[0],
      description: event.description,
      image: event.image || ''
    });
    this.showForm = true;
  }

  deleteEvent(eventId: string | undefined) {
    if (eventId) {
      this.eventService.deleteEvent(eventId).subscribe(() => {
        console.log('Event Deleted:', eventId);
        this.getAllEvents();
      }, error => {
        console.error('Error deleting event:', error);
      });
    }
  }

  onSearchTermChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchTerm = target?.value.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      event.eventName.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm)
    );
    console.log('Search term:', searchTerm);
    console.log('Filtered events:', this.filteredEvents);
  }
}
