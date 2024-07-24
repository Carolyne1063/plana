import { TestBed } from '@angular/core/testing';
import { AllEventsComponent } from './all-events.component';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../../../services/eventService/event.service';

describe('AllEventsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AllEventsComponent],  
      providers: [EventService]  
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AllEventsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
