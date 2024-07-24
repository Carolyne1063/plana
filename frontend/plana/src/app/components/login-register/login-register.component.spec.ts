import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginRegisterComponent } from './login-register.component';
import { UserService } from '../../services/userService/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userService = jasmine.createSpyObj('UserService', ['register', 'login']);
    const router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [LoginRegisterComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms correctly', () => {
    expect(component.registerForm).toBeTruthy();
    expect(component.loginForm).toBeTruthy();
    expect(component.registerForm.controls['firstname'].valid).toBeFalsy();
    expect(component.loginForm.controls['email'].valid).toBeFalsy();
  });

  it('should register user and handle success', () => {
    const mockResponse = { role: 'user', token: 'fake-token', userId: 'user-id' };
    userServiceSpy.register.and.returnValue(of(mockResponse));

    component.registerForm.setValue({
      firstname: 'John',
      lastname: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'password123'
    });

    component.register();
    expect(userServiceSpy.register).toHaveBeenCalledOnceWith(component.registerForm.value);
    expect(component.registerSuccessMessage).toBe('Registration successful!');
    expect(component.registerErrorMessage).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/user-dashboard']);
  });

  it('should handle registration error', () => {
    userServiceSpy.register.and.returnValue(throwError(new Error('Registration failed')));

    component.registerForm.setValue({
      firstname: 'John',
      lastname: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'password123'
    });

    component.register();
    expect(component.registerErrorMessage).toBe('Registration failed. Please try again.');
    expect(component.registerSuccessMessage).toBeNull();
  });

  it('should login user and handle success', () => {
    const mockResponse = { role: 'admin', token: 'fake-token', userId: 'user-id' };
    userServiceSpy.login.and.returnValue(of(mockResponse));

    component.loginForm.setValue({
      email: 'admin@example.com',
      password: 'adminpassword'
    });

    component.login();
    expect(userServiceSpy.login).toHaveBeenCalledOnceWith(component.loginForm.value);
    expect(component.loginSuccessMessage).toBe('Login successful!');
    expect(component.loginErrorMessage).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin-dashboard']);
  });

  it('should handle login error', () => {
    userServiceSpy.login.and.returnValue(throwError(new Error('Login failed')));

    component.loginForm.setValue({
      email: 'admin@example.com',
      password: 'adminpassword'
    });

    component.login();
    expect(component.loginErrorMessage).toBe('Login failed. Please try again.');
    expect(component.loginSuccessMessage).toBeNull();
  });

  it('should switch to register panel on sign-up button click', () => {
    const container = fixture.debugElement.query(By.css('#container')).nativeElement;
    const signUpBtn = fixture.debugElement.query(By.css('#signUp')).nativeElement;

    signUpBtn.click();
    fixture.detectChanges();
    expect(container.classList).toContain('right-panel-active');
  });

  it('should switch to login panel on sign-in button click', () => {
    const container = fixture.debugElement.query(By.css('#container')).nativeElement;
    const signInBtn = fixture.debugElement.query(By.css('#signIn')).nativeElement;

    signInBtn.click();
    fixture.detectChanges();
    expect(container.classList).not.toContain('right-panel-active');
  });
});
