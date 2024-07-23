import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../interfaces/ticket';
import { TicketService } from '../../../services/ticketService/ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-bookings.component.html',
  styleUrls: ['./manager-bookings.component.css']
})
export class ManagerBookingsComponent implements OnInit {
  groupedTickets: { eventName: string, tickets: Ticket[] }[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.getAllTickets();
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        console.log('Fetched tickets:', data); 
        this.groupTicketsByEvent(data);
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }

  groupTicketsByEvent(tickets: Ticket[]) {
    
    const ticketMap = new Map<string, Ticket[]>();

    tickets.forEach(ticket => {
      if (!ticketMap.has(ticket.eventName)) {
        ticketMap.set(ticket.eventName, []);
      }
      ticketMap.get(ticket.eventName)?.push(ticket);
    });

    this.groupedTickets = Array.from(ticketMap, ([eventName, tickets]) => ({ eventName, tickets }));
  }
}
