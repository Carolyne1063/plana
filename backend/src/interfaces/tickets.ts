export interface Ticket {
    ticketId?: string;
    userId: string;
    eventId: string;
    type: string;
    numberOfTickets: number;
    price: number;
    status: string;
}
