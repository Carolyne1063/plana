import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { AuthService } from '../authService/auth.service'; 
import { User, LoginDetails } from '../../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  register(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, user, { headers });
  }
  login(loginDetails: LoginDetails): Observable<{ token: string; userId: string; role: string; }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ token: string; userId: string; role: string; }>(`${this.apiUrl}/login`, loginDetails, { headers })
      .pipe(
        tap((response) => {
          this.authService.setAuthToken(response.token);
          this.authService.setUserId(response.userId);
          this.authService.setUserRole(response.role);
        })
      );
  }

  update(userId: string, user: Partial<User>): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/update`, { userId, ...user }, { headers });
  }

  delete(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  getAllUsers(): Observable<User[]> {  
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  uploadImage(formData: FormData) {
    return this.http.post('https://api.cloudinary.com/v1_1/dh2pi4sor/image/upload', formData);
  }
}
