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
  selectedEvent: Event | null = null;
  ticket: Partial<Ticket> = {};

  constructor(private eventService: EventService, private ticketService: TicketService, private authService: AuthService) {}

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

  onSubmit() {
    this.ticketService.createTicket(this.ticket as Ticket).subscribe(
      (response: Ticket) => {
        console.log('Ticket created successfully:', response);
        this.closeForm();
      },
      (error) => {
        console.error('Error creating ticket:', error);
      }
    );
  }
}