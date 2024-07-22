import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../interfaces/ticket';
import { TicketService } from '../../../services/ticketService/ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-bookings.component.html',
  styleUrl: './manager-bookings.component.css'
})
export class ManagerBookingsComponent {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.getAllTickets();
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        console.log('Fetched tickets:', data); // Log the fetched data
        this.tickets = data;
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }
  }

