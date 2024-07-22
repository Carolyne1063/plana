import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticketService/ticket.service';
import { AuthService } from '../../../services/authService/auth.service';
import { Ticket } from '../../../interfaces/ticket';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  userTickets: Ticket[] = [];
  userId: string | null;
  successMessage: string = ''; // Property to store success message

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    if (this.userId) {
      this.fetchUserTickets();
    }
  }

  fetchUserTickets(): void {
    this.ticketService.getTicketsByUserId(this.userId!).subscribe(
      (tickets) => {
        console.log('Tickets received:', tickets); // Log raw tickets
        this.userTickets = tickets.map(ticket => ({
          ...ticket,
          location: ticket.eventLocation || 'Unknown' // Handle missing location
        }));
        console.log('Processed tickets:', this.userTickets); // Log processed tickets
      },
      (error) => {
        console.error('Error fetching user tickets:', error);
      }
    );
  }

  cancelPurchase(ticketId: string): void {
    this.ticketService.deleteTicket(ticketId).subscribe(
      () => {
        this.userTickets = this.userTickets.filter(ticket => ticket.ticketId !== ticketId);
        this.successMessage = 'Ticket canceled and deleted successfully!'; // Set success message
      },
      (error) => {
        console.error('Error cancelling purchase:', error);
      }
    );
  }
}
