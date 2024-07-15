export interface Ticket {
    ticketId: string;
    eventId: string;
    userId: string;
    type: string;  // E.g., 'Single', 'Couple', 'Group of 5', 'VIP'
    numberOfTickets: number;
    promotionId?: string;
    createdAt: Date;
    updatedAt: Date;
}