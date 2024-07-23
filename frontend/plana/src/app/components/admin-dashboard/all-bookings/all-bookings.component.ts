import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticketService/ticket.service'; // Adjust the path if needed
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {
  events: any[] = [];  // List of events
  selectedEventId: string | null = null;
  summaries: any[] = [];  // Booking summaries for the selected event

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    // Replace with your actual method to fetch events
    this.ticketService.getAllTickets().subscribe(
      (events) => {
        this.events = events.map(event => ({
          id: event.eventId,
          name: event.eventName,
          location: event.location,
          date: new Date(event.eventDate).toLocaleDateString()  // Format date as needed
        }));
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  fetchSummary(eventId: string): void {
    this.ticketService.getTicketSummary(eventId).subscribe(
      (summary) => {
        this.summaries = [{
          eventName: summary.eventName,
          location: summary.eventLocation,
          eventDate: new Date(summary.eventDate).toLocaleDateString(),
          totalTicketsSold: summary.totalTicketsSold,
          revenueGenerated: summary.totalRevenue
        }];
        this.selectedEventId = eventId;
      },
      (error) => {
        console.error('Error fetching ticket summary:', error);
      }
    );
  }
  }

