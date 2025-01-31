import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/token-verify'; 

  constructor(private cookieService: CookieService) {}

  checkTokenValidity(): Promise<boolean> {
    const token = this.cookieService.get('jwt'); // Get the token from cookies

    console.log('JWT TOKEN', token);
    if (!token) {
      false; // No token, user is not logged in
    }

    console.log('BEFORE SENDING JWT', token);
    // Make an API call using Axios to verify the token
    return axios
      .get<{ valid: boolean }>(this.apiUrl, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        return response.status === 200; // Check if the response is successful
      })
      .catch((err) => {
        console.log(err);
        return false; // Return false if there's an error
      });
  }
}
