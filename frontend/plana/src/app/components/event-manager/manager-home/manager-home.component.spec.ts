import { TestBed } from '@angular/core/testing';
import { ManagerHomeComponent } from './manager-home.component';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../../../services/eventService/event.service';

describe('ManagerHomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ManagerHomeComponent],  
      providers: [EventService]  
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ManagerHomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
