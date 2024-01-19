import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  // Define your User interface here
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private isAuthenticatedFlag = false;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post(loginUrl, user).pipe(
      tap((response: any) => {
        if (response && response.user && response.user.id) {
          this.loggedInUser = { id: response.user.id };
          this.isAuthenticatedFlag = true;
          this.saveUserIdToLocalStorage(response.user.id); // Save user ID to localStorage
        }
      })
    );
  }

  logout(): void {
    // Clear authentication state
    this.isAuthenticatedFlag = false;
    // Clear the stored user ID from localStorage
    this.clearUserIdFromLocalStorage();
    // Optionally, perform any other cleanup tasks
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  private loggedInUser: { id: number } | null = null;

  getLoggedInUserId(): number | null {
    return this.loggedInUser?.id || null;
  }

  private saveUserIdToLocalStorage(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  private clearUserIdFromLocalStorage(): void {
    localStorage.removeItem('userId');
  }

  // Optionally, you can implement a method to retrieve the user ID from localStorage
  getSavedUserIdFromLocalStorage(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
}
