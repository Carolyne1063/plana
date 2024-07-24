import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserSidebarComponent } from './user-sidebar.component';
import { AuthService } from '../../../services/authService/auth.service';
import { UserService } from '../../../services/userService/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';


class MockAuthService {
  getUserId() {
    return 'mock-user-id';
  }
}

class MockUserService {
  getUserById(userId: string) {
    return of({ 
      image: 'mock-image-url', 
      firstname: 'Mock User' 
    });
  }
}

describe('UserSidebarComponent', () => {
  let component: UserSidebarComponent;
  let fixture: ComponentFixture<UserSidebarComponent>;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSidebarComponent], 
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidebarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on initialization', () => {
    component.ngOnInit();
    expect(component.userImage).toBe('mock-image-url');
    expect(component.userName).toBe('Mock User');
  });

  it('should emit selectSection event when onSelectSection is called', () => {
    spyOn(component.selectSection, 'emit');
    const section = 'profile';
    component.onSelectSection(section);
    expect(component.selectSection.emit).toHaveBeenCalledWith(section);
  });
});
