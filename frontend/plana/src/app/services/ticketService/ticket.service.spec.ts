import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';
import { Ticket } from '../../interfaces/ticket';

describe('TicketService', () => {
  let service: TicketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService]
    });

    service = TestBed.inject(TicketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new ticket', () => {
    const dummyTicket: Ticket = {
      ticketId: '1',
      eventId: '101',
      userId: '1001',
      price: 50,
      firstname: 'John',
      lastname: 'Doe',
      userEmail: 'john.doe@example.com',
      email: 'john.doe@example.com',
      type: 'single',
      numberOfTickets: 0,
      status: '',
      eventLocation: '',
      eventName: '',
      eventDate: new Date(), 
      location: '',
      eventImage: '',
      userImage: ''
    };

    service.createTicket(dummyTicket).subscribe(response => {
      expect(response).toEqual(dummyTicket);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyTicket);
    req.flush(dummyTicket);
  });

  it('should fetch all tickets', () => {
    const dummyTickets: Ticket[] = [
      {
        ticketId: '1', eventId: '101', userId: '1001', price: 50, firstname: 'John', lastname: 'Doe', userEmail: 'john.doe@example.com', email: 'john.doe@example.com',
        type: 'single',
        numberOfTickets: 0,
        status: '',
        eventLocation: '',
        eventName: '',
        eventDate: new Date(), 
        location: '',
        eventImage: '',
        userImage: ''
      },
      {
        ticketId: '2', eventId: '102', userId: '1002', price: 60, firstname: 'Jane', lastname: 'Smith', userEmail: 'jane.smith@example.com', email: 'jane.smith@example.com',
        type: 'single',
        numberOfTickets: 0,
        status: '',
        eventLocation: '',
        eventName: '',
        eventDate: new Date(), 
        location: '',
        eventImage: '',
        userImage: ''
      }
    ];

    service.getAllTickets().subscribe(tickets => {
      expect(tickets).toEqual(dummyTickets);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTickets);
  });

  it('should fetch a ticket by id', () => {
    const ticketId = '1';
    const dummyTicket: Ticket = {
      ticketId: '1',
      eventId: '101',
      userId: '1001',
      price: 50,
      firstname: 'John',
      lastname: 'Doe',
      userEmail: 'john.doe@example.com',
      email: 'john.doe@example.com',
      type: 'single',
      numberOfTickets: 0,
      status: '',
      eventLocation: '',
      eventName: '',
      eventDate: new Date(), 
      location: '',
      eventImage: '',
      userImage: ''
    };

    service.getTicketById(ticketId).subscribe(ticket => {
      expect(ticket).toEqual(dummyTicket);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${ticketId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTicket);
  });

  it('should fetch tickets by user id', () => {
    const userId = '1001';
    const dummyTickets: Ticket[] = [
      {
        ticketId: '1', eventId: '101', userId: '1001', price: 50, firstname: 'John', lastname: 'Doe', userEmail: 'john.doe@example.com', email: 'john.doe@example.com',
        type: 'single',
        numberOfTickets: 0,
        status: '',
        eventLocation: '',
        eventName: '',
        eventDate: new Date(), 
        location: '',
        eventImage: '',
        userImage: ''
      },
      {
        ticketId: '2', eventId: '102', userId: '1001', price: 60, firstname: 'John', lastname: 'Doe', userEmail: 'john.doe@example.com', email: 'john.doe@example.com',
        type: 'single',
        numberOfTickets: 0,
        status: '',
        eventLocation: '',
        eventName: '',
        eventDate: new Date(),
        location: '',
        eventImage: '',
        userImage: ''
      }
    ];

    service.getTicketsByUserId(userId).subscribe(tickets => {
      expect(tickets).toEqual(dummyTickets);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTickets);
  });

  it('should fetch tickets by event id', () => {
    const eventId = '101';
    const dummyTickets: Ticket[] = [
      {
        ticketId: '1', eventId: '101', userId: '1001', price: 50, firstname: 'John', lastname: 'Doe', userEmail: 'john.doe@example.com', email: 'john.doe@example.com',
        type: 'single',
        numberOfTickets: 0,
        status: '',
        eventLocation: '',
        eventName: '',
        eventDate: new Date(), 
        location: '',
        eventImage: '',
        userImage: ''
      },
      {
        ticketId: '2', eventId: '101', userId: '1002', price: 60, firstname: 'Jane', lastname: 'Smith', userEmail: 'jane.smith@example.com', email: 'jane.smith@example.com',
        type: 'single',
        numberOfTickets: 0,
        status: '',
        eventLocation: '',
        eventName: '',
        eventDate: new Date(), 
        location: '',
        eventImage: '',
        userImage: ''
      }
    ];

    service.getTicketsByEventId(eventId).subscribe(tickets => {
      expect(tickets).toEqual(dummyTickets);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/event/${eventId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTickets);
  });

  it('should update a ticket', () => {
    const ticketId = '1';
    const dummyTicketUpdate: Partial<Ticket> = { price: 55 };
  
    service.updateTicket(ticketId, dummyTicketUpdate).subscribe(() => {
     
      expect(true).toBeTrue(); 
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/update/${ticketId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({}); 
  });
  
  it('should delete a ticket', () => {
    const ticketId = '1';
  
    service.deleteTicket(ticketId).subscribe(() => {
      
      expect(true).toBeTrue(); 
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/${ticketId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}); 
  });
  

  it('should get ticket summary by event id', () => {
    const eventId = '101';
    const dummySummary = { totalTickets: 100, soldTickets: 50 };

    service.getTicketSummary(eventId).subscribe(summary => {
      expect(summary).toEqual(dummySummary);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/summary/${eventId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySummary);
  });
});
