import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';
import { Event } from '../../interfaces/event';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });

    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new event', () => {
    const dummyEvent: Event = {
      eventId: '1',
      eventName: 'Sample Event',
      eventDate: '2024-01-01',
      location: 'Sample Location',
      description: 'Sample Description',
      eventTime: '',
      image: ''
    };
    const dummyResponse = { /* response data */ };

    service.createEvent(dummyEvent).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyEvent);
    req.flush(dummyResponse);
  });

  it('should fetch all events', () => {
    const dummyEvents: Event[] = [
      {
        eventId: '1', eventName: 'Event 1', eventDate: '2024-01-01', location: 'Location 1', description: 'Description 1',
        eventTime: '',
        image: ''
      },
      {
        eventId: '2', eventName: 'Event 2', eventDate: '2024-01-02', location: 'Location 2', description: 'Description 2',
        eventTime: '',
        image: ''
      }
    ];

    service.getAllEvents().subscribe(events => {
      expect(events).toEqual(dummyEvents);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEvents);
  });

  it('should fetch a single event by id', () => {
    const eventId = '1';
    const dummyEvent: Event = {
      eventId: '1', eventName: 'Event 1', eventDate: '2024-01-01', location: 'Location 1', description: 'Description 1',
      eventTime: '',
      image: ''
    };

    service.getEventById(eventId).subscribe(event => {
      expect(event).toEqual(dummyEvent);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${eventId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEvent);
  });

  it('should update an event', () => {
    const eventId = '1';
    const dummyEvent: Partial<Event> = { eventName: 'Updated Event' };
    const dummyResponse = { success: true };

    service.updateEvent(eventId, dummyEvent).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${eventId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyEvent);
    req.flush(dummyResponse);
  });

  it('should delete an event', () => {
    const eventId = '1';
    const dummyResponse = { success: true };

    service.deleteEvent(eventId).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${eventId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
});
