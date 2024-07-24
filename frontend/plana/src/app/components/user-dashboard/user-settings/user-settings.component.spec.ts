import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { UserSettingsComponent } from './user-settings.component';
import { AuthService } from '../../../services/authService/auth.service';
import { UserService } from '../../../services/userService/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../../../interfaces/users';


class MockAuthService {
  getUserId() {
    return 'mock-user-id';
  }
}

class MockUserService {
  getUserById(userId: string) {
    return of({
      firstname: 'Mock',
      lastname: 'User',
      phoneNumber: '1234567890',
      email: 'mock@example.com',
      image: 'mock-image-url'
    });
  }

  update(userId: string, userData: Partial<User>) {
    return of(null); 
  }
}

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSettingsComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on initialization', () => {
    component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.userForm.value).toEqual({
      fname: 'Mock',
      lname: 'User',
      phone: '1234567890',
      email: 'mock@example.com',
      profile: 'mock-image-url',
      password: '',
      confirmPassword: ''
    });
  });

  it('should update user data on form submission', () => {
    spyOn(userService, 'update').and.callThrough();
    component.userForm.setValue({
      fname: 'Updated',
      lname: 'User',
      phone: '0987654321',
      email: 'updated@example.com',
      profile: 'updated-image-url',
      password: 'newpassword',
      confirmPassword: 'newpassword'
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(userService.update).toHaveBeenCalledWith('mock-user-id', {
      firstname: 'Updated',
      lastname: 'User',
      phoneNumber: '0987654321',
      email: 'updated@example.com',
      password: 'newpassword',
      image: 'updated-image-url'
    });

    expect(component.successMessage).toBe('Your profile has been updated successfully!');
  });

  it('should display success message and hide it after 5 seconds', (done) => {
    
    component.successMessage = 'Success!';
    fixture.detectChanges();
    
  
    expect(component.successMessage).toBe('Success!');
  
   
    setTimeout(() => {
      fixture.detectChanges();
      expect(component.successMessage).toBeNull(); 
      done();
    }, 5000);
  }, 10000); 
  
});
