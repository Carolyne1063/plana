import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserBookingsComponent } from './user-bookings.component';
import { TicketService } from '../../../services/ticketService/ticket.service';
import { AuthService } from '../../../services/authService/auth.service';
import { Ticket } from '../../../interfaces/ticket';

describe('UserBookingsComponent', () => {
  let component: UserBookingsComponent;
  let fixture: ComponentFixture<UserBookingsComponent>;
  let ticketServiceSpy: jasmine.SpyObj<TicketService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const ticketSpy = jasmine.createSpyObj('TicketService', ['getTicketsByUserId', 'deleteTicket', 'updateTicket']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserId']);

    await TestBed.configureTestingModule({
      declarations: [UserBookingsComponent],
      providers: [
        { provide: TicketService, useValue: ticketSpy },
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserBookingsComponent);
    component = fixture.componentInstance;
    ticketServiceSpy = TestBed.inject(TicketService) as jasmine.SpyObj<TicketService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user tickets on initialization', () => {
    const mockTickets: Ticket[] = [
      {
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
      }
    ];
    authServiceSpy.getUserId.and.returnValue('123');
    ticketServiceSpy.getTicketsByUserId.and.returnValue(of(mockTickets));

    component.ngOnInit();
    expect(component.userTickets).toEqual(mockTickets);
  });

  it('should handle error when fetching user tickets', () => {
    const errorResponse = new Error('Test error');
    authServiceSpy.getUserId.and.returnValue('123');
    ticketServiceSpy.getTicketsByUserId.and.returnValue(throwError(errorResponse));

    component.ngOnInit();
    expect(component.userTickets).toEqual([]);
  });

  it('should cancel a ticket successfully', () => {
    const mockTicketId = '1';
    const mockTickets: Ticket[] = [
      {
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
      }
    ];

    ticketServiceSpy.deleteTicket.and.returnValue(of<void>(undefined));
    component.userTickets = mockTickets;

    component.cancelPurchase(mockTicketId);
    expect(component.userTickets.length).toBe(0);
    expect(component.successMessage).toBe('Ticket canceled and deleted successfully!');
  });

  it('should handle error when canceling a ticket', () => {
    const mockTicketId = '1';
    const errorResponse = new Error('Test error');

    ticketServiceSpy.deleteTicket.and.returnValue(throwError(errorResponse));
    component.userTickets = [
      {
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
      }
    ];

    component.cancelPurchase(mockTicketId);
    expect(component.userTickets.length).toBe(1);
  });

  it('should open update form and calculate price correctly', () => {
    const mockTicket: Ticket = {
      ticketId: '1',
      eventId: '1',
      userId: '123',
      type: 'couple',
      numberOfTickets: 2,
      price: 0,
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

    component.openUpdateForm(mockTicket);
    expect(component.selectedTicket).toEqual(mockTicket);
    expect(component.selectedTicket?.price).toBe(200); 
  });

  it('should close update form correctly', () => {
    component.closeUpdateForm();
    expect(component.selectedTicket).toBeNull();
  });

  it('should update ticket and handle success', () => {
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

    ticketServiceSpy.updateTicket.and.returnValue(of<void>(undefined));
    component.selectedTicket = mockTicket;

    component.onUpdateSubmit();
    expect(component.successMessage).toBe('Ticket updated successfully!');
    expect(component.selectedTicket).toBeNull();
  });

  it('should handle error during ticket update', () => {
    const errorResponse = new Error('Test error');
    ticketServiceSpy.updateTicket.and.returnValue(throwError(errorResponse));
    component.selectedTicket = {
      ticketId: '1',
      type: 'single',
      numberOfTickets: 1,
      price: 100
    } as Ticket;

    component.onUpdateSubmit();
    expect(component.successMessage).toBe('');
  });
});
