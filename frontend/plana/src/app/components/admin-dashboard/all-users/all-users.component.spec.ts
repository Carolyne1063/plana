import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { AllUsersComponent } from './all-users.component';
import { TicketService } from '../../../services/ticketService/ticket.service'; 


const mockTicketService = {
 
};

describe('AllUsersComponent', () => {
  let component: AllUsersComponent;
  let fixture: ComponentFixture<AllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        
      ],
      declarations: [AllUsersComponent],
      providers: [
        { provide: TicketService, useValue: mockTicketService }
       
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
