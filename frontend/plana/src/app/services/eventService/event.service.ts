import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Create a new event
  createEvent(event: Event): Observable<any> {
    return this.http.post(`${this.apiUrl}`, event, this.httpOptions);
  }

  // Get all events
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}`);
  }

  // Get a single event by ID
  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  // Update an event by ID
  updateEvent(eventId: string, event: Partial<Event>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${eventId}`, event, this.httpOptions);
  }

  // Delete an event by ID
  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${eventId}`);
  }
}
