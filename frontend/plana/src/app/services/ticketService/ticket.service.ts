import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://your-backend-url/api/tickets';

  constructor(private http: HttpClient) { }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/create`, ticket);
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicketById(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${ticketId}`);
  }

  getTicketsByUserId(userId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/user/${userId}`);
  }

  getTicketsByEventId(eventId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/event/${eventId}`);
  }

  updateTicket(ticketId: string, ticket: Partial<Ticket>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${ticketId}`, ticket);
  }

  deleteTicket(ticketId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ticketId}`);
  }

  getTicketSummary(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary/${eventId}`);
  }
}
