import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserHomeComponent } from './user-home.component';
import { EventService } from '../../../services/eventService/event.service';
import { TicketService } from '../../../services/ticketService/ticket.service';
import { AuthService } from '../../../services/authService/auth.service';
import { Event } from '../../../interfaces/event';
import { Ticket } from '../../../interfaces/ticket';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;
  let eventServiceSpy: jasmine.SpyObj<EventService>;
  let ticketServiceSpy: jasmine.SpyObj<TicketService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const eventSpy = jasmine.createSpyObj('EventService', ['getAllEvents']);
    const ticketSpy = jasmine.createSpyObj('TicketService', ['createTicket']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserId']);

    await TestBed.configureTestingModule({
      declarations: [UserHomeComponent],
      providers: [
        { provide: EventService, useValue: eventSpy },
        { provide: TicketService, useValue: ticketSpy },
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserHomeComponent);
    component = fixture.componentInstance;
    eventServiceSpy = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;
    ticketServiceSpy = TestBed.inject(TicketService) as jasmine.SpyObj<TicketService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEvents on ngOnInit', () => {
    spyOn(component, 'getEvents');
    component.ngOnInit();
    expect(component.getEvents).toHaveBeenCalled();
  });

  it('should fetch events correctly in getEvents', () => {
    const mockEvents: Event[] = [{
      eventId: '1',
      eventName: 'Test Event',
      description: 'Test Description',
      location: 'Test Location',
      eventDate: new Date().toISOString(),
      eventTime: '18:00',
      image: 'test-image.jpg'
    }];
    eventServiceSpy.getAllEvents.and.returnValue(of(mockEvents));

    component.getEvents();
    expect(component.events).toEqual(mockEvents);
    expect(component.filteredEvents).toEqual(mockEvents);
  });

  it('should handle error in getEvents', () => {
    const errorResponse = new Error('Test error');
    eventServiceSpy.getAllEvents.and.returnValue(throwError(errorResponse));

    component.getEvents();
    expect(component.events).toEqual([]);
    expect(component.filteredEvents).toEqual([]);
  });

  it('should filter events correctly in onSearch', () => {
    const mockEvents: Event[] = [
      {
        eventId: '1',
        eventName: 'Test Event',
        description: 'Test Description',
        location: 'Test Location',
        eventDate: new Date().toISOString(),
        eventTime: '18:00',
        image: 'test-image.jpg'
      },
      {
        eventId: '2',
        eventName: 'Another Event',
        description: 'Another Description',
        location: 'Another Location',
        eventDate: new Date().toISOString(),
        eventTime: '19:00',
        image: 'another-image.jpg'
      }
    ];
    component.events = mockEvents;
    component.filteredEvents = mockEvents;

    const mockEvent = { target: { value: 'test' } } as any;
    component.onSearch(mockEvent);
    expect(component.filteredEvents.length).toBe(1);
    expect(component.filteredEvents[0].eventId).toBe('1');
  });

  it('should open and close the form correctly', () => {
    const mockEvent: Event = {
      eventId: '1',
      eventName: 'Test Event',
      description: 'Test Description',
      location: 'Test Location',
      eventDate: new Date().toISOString(),
      eventTime: '18:00',
      image: 'test-image.jpg'
    };
    authServiceSpy.getUserId.and.returnValue('123');

    component.openForm(mockEvent);
    expect(component.selectedEvent).toBe(mockEvent);
    expect(document.body.classList.contains('blur')).toBeTrue();

    component.closeForm();
    expect(component.selectedEvent).toBeNull();
    expect(document.body.classList.contains('blur')).toBeFalse();
  });

  it('should update prices correctly based on ticket type', () => {
    component.ticket = { type: 'couple', numberOfTickets: 2 } as Ticket;
    component.updatePrices();
    expect(component.pricePerType).toBe(200);
    expect(component.totalPrice).toBe(400);

    component.ticket.type = 'single';
    component.ticket.numberOfTickets = 1;
    component.updatePrices();
    expect(component.pricePerType).toBe(100);
    expect(component.totalPrice).toBe(100);
  });

  it('should calculate total price correctly', () => {
    component.ticket = { numberOfTickets: 3 } as Ticket;
    component.pricePerType = 150;
    component.updateTotalPrice();
    expect(component.totalPrice).toBe(450);
  });

  it('should handle successful ticket creation on submit', () => {
    const mockTicket: Ticket = {
      ticketId: '1',
      eventId: '1',
      userId: '123',
      type: 'single',
      numberOfTickets: 1,
      price: 100,
      eventDate: new Date(),
      firstname: 'John',
      lastname: 'Doe',
      userEmail: 'john.doe@example.com',
      email: 'john.doe@example.com',
      eventName: 'Test Event',
      eventLocation: 'Test Location',
      status: 'booked',
      eventImage: 'test-image.jpg',
      location: 'Test Location',
      userImage: 'user-image.jpg'
    };

    ticketServiceSpy.createTicket.and.returnValue(of(mockTicket));
    component.ticket = mockTicket;
    component.onSubmit();
    expect(component.successMessage).toBe('Ticket booked successfully!');
    expect(component.errorMessage).toBe('');
  });

  it('should handle errors during ticket creation on submit', () => {
    const errorResponse = { error: { message: 'User has already booked a ticket for this event' } };
    ticketServiceSpy.createTicket.and.returnValue(throwError(errorResponse));

    component.ticket = { eventId: '1', userId: '123', type: 'single', numberOfTickets: 1 } as Ticket;
    component.onSubmit();
    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('You have already booked a ticket for this event. Please update your existing ticket.');
  });

  it('should handle general errors during ticket creation on submit', () => {
    const errorResponse = new Error('General error');
    ticketServiceSpy.createTicket.and.returnValue(throwError(errorResponse));

    component.ticket = { eventId: '1', userId: '123', type: 'single', numberOfTickets: 1 } as Ticket;
    component.onSubmit();
    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('An error occurred while booking the ticket. Please try again.');
  });
});
