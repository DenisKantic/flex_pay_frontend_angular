import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service'; // Import CookieService
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient and HttpHeaders
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-settings',
  imports: [
    NavbarComponent,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  EmailControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient, // Inject HttpClient
  ) {}

  changeEmail(): void {
    if (this.EmailControl.valid) {
      const newEmail = this.EmailControl.value;

      // Setting up headers to include credentials
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

     
      this.http
        .post(
          'http://localhost:8080/change-email',
          { new_email: newEmail },
          { headers, withCredentials: true },
        )
        .subscribe({
          next: (response) => {
            this._snackBar.open('Email changed successfully', 'Close', {
              duration: 2000,
            });
            this.cookieService.delete('jwt');
            this.router.navigate(['/login']);
            console.log(response);
          },
          error: (error) => {
            this._snackBar.open('Error changing email', 'Close', {
              duration: 2000,
            });
            console.error('Error changing email:', error);
          },
        });
    } else {
      this._snackBar.open('Please enter a valid email', 'Close', {
        duration: 2000,
      });
    }
  }
}
