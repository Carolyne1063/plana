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

  onSearch(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase(); // Convert to lowercase for case-insensitive comparison
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
    this.ticketService.createTicket(this.ticket as Ticket).subscribe(
      (response: Ticket) => {
        console.log('Ticket created successfully:', response);
        this.successMessage = 'Ticket booked successfully!';
        this.closeForm();

        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      (error) => {
        console.error('Error creating ticket:', error);
      }
    );
  }
}
