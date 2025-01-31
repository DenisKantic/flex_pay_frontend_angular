import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerUser(registerData: any): Observable<any> {
    return this.http.post('http://localhost:8080/register', registerData, {
      withCredentials: true
    }).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}