export interface Ticket {
  ticketId: string;
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  eventId: string;
  type: 'single' | 'couple' | 'groupOf5';
  numberOfTickets: number;
  price: number;
  status: string;
  eventLocation: string; 
  eventName: string;     // Event name     // Event location
  eventDate: Date;   
  location: string;    // Event date
}
