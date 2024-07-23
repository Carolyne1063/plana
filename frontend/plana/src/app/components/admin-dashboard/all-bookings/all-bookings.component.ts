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
  events: any[] = [];  // List of unique events
  selectedEventId: string | null = null;
  summaries: any[] = [];  // Booking summaries for the selected event

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.ticketService.getAllTickets().subscribe(
      (tickets) => {
        // Create a map to hold unique events
        const eventMap = new Map<string, any>();

        // Iterate over tickets and add unique events to the map
        tickets.forEach(ticket => {
          const eventId = ticket.eventId;
          if (!eventMap.has(eventId)) {
            eventMap.set(eventId, {
              id: eventId,
              name: ticket.eventName,
              location: ticket.location,
              date: new Date(ticket.eventDate).toLocaleDateString()  // Format date as needed
            });
          }
        });

        // Convert the map values to an array and assign it to events
        this.events = Array.from(eventMap.values());
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
