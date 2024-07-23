import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string | null = null;
  private userId: string | null = null;
  private userRole: string | null = null;

  constructor() {}

  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authToken', token); 
  }

  getAuthToken(): string | null {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('authToken');
    }
    return this.authToken;
  }

  setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem('userId', userId); 
  }

  getUserId(): string | null {
    if (!this.userId) {
      this.userId = localStorage.getItem('userId');
    }
    return this.userId;
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  clearAuthData(): void {
    this.authToken = null;
    this.userId = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return this.getAuthToken() !== null;
  }
}
