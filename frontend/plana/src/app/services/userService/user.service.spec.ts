import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AuthService } from '../authService/auth.service';
import { User, LoginDetails } from '../../interfaces/users';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['setAuthToken', 'setUserId', 'setUserRole']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: AuthService, useValue: authSpy }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const dummyUser: User = {
      userId: '1',
      firstname: 'John',
      lastname: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'password',
      image: 'image.jpg',
      createdAt: '2024-01-01T00:00:00.000Z'
    };
    const dummyResponse = { /* response data */ };

    service.register(dummyUser).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should login a user', () => {
    const dummyLoginDetails: LoginDetails = { email: 'test@example.com', password: 'password' };
    const dummyResponse = { token: '123456', userId: '1', role: 'user' };

    service.login(dummyLoginDetails).subscribe(response => {
      expect(response).toEqual(dummyResponse);
      expect(authServiceSpy.setAuthToken).toHaveBeenCalledWith('123456');
      expect(authServiceSpy.setUserId).toHaveBeenCalledWith('1');
      expect(authServiceSpy.setUserRole).toHaveBeenCalledWith('user');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should update a user', () => {
    const userId = '1';
    const dummyUser: Partial<User> = { firstname: 'Updated User' };
    const dummyResponse = { success: true };

    service.update(userId, dummyUser).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/update`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyResponse);
  });

  it('should delete a user', () => {
    const userId = '1';
    const dummyResponse = { success: true };

    service.delete(userId).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });

  it('should fetch all users', () => {
    const dummyUsers: User[] = [/* array of users */];

    service.getAllUsers().subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should fetch a user by id', () => {
    const userId = '1';
    const dummyUser: User = {
      userId: '1',
      firstname: 'John',
      lastname: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'password',
      image: 'image.jpg',
      createdAt: '2024-01-01T00:00:00.000Z'
    };

    service.getUserById(userId).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });
});
