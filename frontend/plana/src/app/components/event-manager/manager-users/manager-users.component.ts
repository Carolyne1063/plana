import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticketService/ticket.service';
import { Ticket } from '../../../interfaces/ticket';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css']
})
export class ManagerUsersComponent implements OnInit {
  events: any[] = [];
  selectedEventId: string | null = null;
  attendees: Ticket[] = [];
  noAttendeesMessage: string = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.getAllTickets();
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe(
      (tickets: Ticket[]) => {
        this.events = this.extractEventsFromTickets(tickets);
        console.log(this.events); // Log events to check data
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }

  extractEventsFromTickets(tickets: Ticket[]): any[] {
    const eventsMap = new Map();
    tickets.forEach(ticket => {
      const eventImage = ticket.eventImage;
      console.log(`Event ID: ${ticket.eventId}, Image URL: ${eventImage}`);
      if (!eventsMap.has(ticket.eventId)) {
        eventsMap.set(ticket.eventId, {
          eventId: ticket.eventId,
          eventName: ticket.eventName,
          location: ticket.location,
          eventDate: ticket.eventDate,
          image: ticket.eventImage
        });
        console.log('image', eventImage );
        
      }
    });
    return Array.from(eventsMap.values());
  }

  onEventClick(eventId: string) {
    this.selectedEventId = eventId;
    this.ticketService.getTicketsByEventId(eventId).subscribe(
      (tickets: Ticket[]) => {
        this.attendees = tickets;
        if (tickets.length === 0) {
          this.noAttendeesMessage = 'No one has booked yet.';
        } else {
          this.noAttendeesMessage = '';
        }
      },
      (error) => {
        console.error('Error fetching attendees:', error);
      }
    );
  }
}
