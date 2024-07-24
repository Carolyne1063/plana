import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { AllUsersComponent } from './all-users.component';
import { TicketService } from '../../../services/ticketService/ticket.service'; // Import the service if needed

// Mock the TicketService if necessary
const mockTicketService = {
  // Define mock methods if required
};

describe('AllUsersComponent', () => {
  let component: AllUsersComponent;
  let fixture: ComponentFixture<AllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Include HttpClientTestingModule
        // Include other necessary modules if any
      ],
      declarations: [AllUsersComponent],
      providers: [
        { provide: TicketService, useValue: mockTicketService } // Provide mock service if needed
        // Provide other services or dependencies if required
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});
