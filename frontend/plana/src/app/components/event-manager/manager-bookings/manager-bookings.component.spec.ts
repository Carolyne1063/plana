import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManagerBookingsComponent } from './manager-bookings.component';
import { TicketService } from '../../../services/ticketService/ticket.service';

describe('ManagerBookingsComponent', () => {
  let component: ManagerBookingsComponent;
  let fixture: ComponentFixture<ManagerBookingsComponent>;
  let ticketServiceSpy: jasmine.SpyObj<TicketService>;

  beforeEach(async () => {
    const ticketService = jasmine.createSpyObj('TicketService', ['getTickets']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ManagerBookingsComponent],
      providers: [
        { provide: TicketService, useValue: ticketService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerBookingsComponent);
    component = fixture.componentInstance;
    ticketServiceSpy = TestBed.inject(TicketService) as jasmine.SpyObj<TicketService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});
