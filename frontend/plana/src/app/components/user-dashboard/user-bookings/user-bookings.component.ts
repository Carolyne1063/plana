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
  successMessage: string = ''; 
  selectedTicket: Partial<Ticket> | null = null; 

  private ticketPrices = {
    single: 100.00,   
    couple: 200.00,    
    groupOf5: 500.00   
  };

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
        console.log('Tickets received:', tickets); 
        this.userTickets = tickets.map(ticket => ({
          ...ticket,
          location: ticket.eventLocation || 'Unknown' 
        }));
        console.log('Processed tickets:', this.userTickets); 
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
        this.successMessage = 'Ticket canceled and deleted successfully!'; 
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      },
      (error) => {
        console.error('Error cancelling purchase:', error);
      }
    );
  }

  openUpdateForm(ticket: Ticket): void {
    this.selectedTicket = { ...ticket }; 
    this.updatePrice(); 
  }

  closeUpdateForm(): void {
    this.selectedTicket = null;
  }

  updatePrice(): void {
    if (this.selectedTicket) {
      const pricePerTicket = this.ticketPrices[this.selectedTicket.type || 'single'];
      this.selectedTicket.price = pricePerTicket * (this.selectedTicket.numberOfTickets || 1);
    }
  }
  

  onUpdateSubmit(): void {
    if (this.selectedTicket && this.selectedTicket.ticketId) {
      this.ticketService.updateTicket(this.selectedTicket.ticketId, {
        type: this.selectedTicket.type,
        numberOfTickets: this.selectedTicket.numberOfTickets,
        price: this.selectedTicket.price
      }).subscribe(
        () => {
          this.successMessage = 'Ticket updated successfully!'; 
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
          this.fetchUserTickets(); 
          this.closeUpdateForm(); 
        },
        (error) => {
          console.error('Error updating ticket:', error);
        }
      );
    }
  }
}
