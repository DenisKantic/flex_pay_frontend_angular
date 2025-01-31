import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Provides the service at the root level
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080'; // Removing @Inject for simplicity

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-info`, { withCredentials: true });
  }

  transferFunds(user_email: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer-funds`, 
      { user_email, amount }, 
      { withCredentials: true }
    );
  }
}