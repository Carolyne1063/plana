export interface Ticket {
    ticketId?: string;
    userId: string;
    eventId: string;
    type: 'single' | 'couple' | 'groupOf5';
    numberOfTickets: number;
    price: number;
    status: string;
  }