import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LandingPageComponent } from './landing-page.component';
import { EventService } from '../../services/eventService/event.service';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let eventServiceSpy: jasmine.SpyObj<EventService>;

  beforeEach(async () => {
    const eventService = jasmine.createSpyObj('EventService', ['getAllEvents']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavbarComponent,
        HttpClientTestingModule // Add HttpClientTestingModule for HttpClient dependencies
      ],
      declarations: [LandingPageComponent],
      providers: [
        { provide: EventService, useValue: eventService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    eventServiceSpy = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch events on init', () => {
    const mockEvents: Event[] = [
      {
        eventId: '1', eventName: 'Event 1', eventDate: new Date().toISOString(), location: 'Location 1',
        eventTime: '',
        description: '',
        image: ''
      },
      {
        eventId: '2', eventName: 'Event 2', eventDate: new Date().toISOString(), location: 'Location 2',
        eventTime: '',
        description: '',
        image: ''
      }
    ];

    eventServiceSpy.getAllEvents.and.returnValue(of(mockEvents));

    component.ngOnInit();
    fixture.detectChanges();

    expect(eventServiceSpy.getAllEvents).toHaveBeenCalled();
    expect(component.events).toEqual(mockEvents);
  });

  it('should handle error when fetching events fails', () => {
    spyOn(console, 'error');
    const errorResponse = new Error('Failed to fetch events');
    eventServiceSpy.getAllEvents.and.returnValue(throwError(errorResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(eventServiceSpy.getAllEvents).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error fetching events:', errorResponse);
    expect(component.events).toEqual([]);
  });
});
