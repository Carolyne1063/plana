import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/eventService/event.service';
import { Event } from '../../../interfaces/event';
import { TicketService } from '../../../services/ticketService/ticket.service';
import { Ticket } from '../../../interfaces/ticket';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  selectedEvent: Event | null = null;
  ticket: Partial<Ticket> = {};
  pricePerType: number = 0;
  totalPrice: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private eventService: EventService,
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getAllEvents().subscribe(
      (data: Event[]) => {
        this.events = data;
        this.filteredEvents = data; // Initialize filtered events
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  onSearch(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      event.eventName.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm)
    );
  }

  openForm(event: Event) {
    this.selectedEvent = event;
    const userId = this.authService.getUserId();

    if (userId !== null) {
      this.ticket = {
        eventId: event.eventId,
        userId: userId,
        type: 'single',
        numberOfTickets: 1
      };
      this.updatePrices();
      const form = document.getElementById("bookingForm");
      if (form) form.style.display = "block";
      document.body.classList.add("blur");
    } else {
      console.error('User ID is null.'); // Handle this case as needed
    }
  }

  closeForm() {
    this.selectedEvent = null;
    const form = document.getElementById("bookingForm");
    if (form) form.style.display = "none";
    document.body.classList.remove("blur");
  }

  updatePrices() {
    switch (this.ticket.type) {
      case 'single':
        this.pricePerType = 100;
        break;
      case 'couple':
        this.pricePerType = 200;
        break;
      case 'groupOf5':
        this.pricePerType = 500;
        break;
      default:
        this.pricePerType = 0;
    }
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    if (this.ticket.numberOfTickets) {
      this.totalPrice = this.pricePerType * this.ticket.numberOfTickets;
    } else {
      this.totalPrice = 0;
    }
  }

  onSubmit() {
    this.ticket.price = this.totalPrice;
    
    // Close the form immediately
    this.closeForm();
    
    this.ticketService.createTicket(this.ticket as Ticket).subscribe(
      (response: Ticket) => {
        console.log('Ticket created successfully:', response);
        this.successMessage = 'Ticket booked successfully!';
        this.errorMessage = '';
        
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      },
      (error) => {
        if (error.error && error.error.message === 'User has already booked a ticket for this event') {
          this.errorMessage = 'You have already booked a ticket for this event. Please update your existing ticket.';
        } else {
          this.errorMessage = 'An error occurred while booking the ticket. Please try again.';
          console.error('Error creating ticket:', error);
        }

        // Set a timer to clear the error message after 2 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }
}
