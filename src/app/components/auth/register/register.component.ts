import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from './register-service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDatepickerModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  EmailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', Validators.required);
  usernameControl = new FormControl('', Validators.required);
  cardControl = new FormControl('', Validators.required);
  dateControl = new FormControl('', Validators.required);

  hide = signal(true);
  matcher = new MyErrorStateMatcher(); // Initialize the matcher

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private registerService: RegisterService
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  formatDate(rawDate: string): string {
    const date = new Date(rawDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  register(): void {
    let new_date;

    const rawDate = this.dateControl.value?.toString();
    if (rawDate) {
      new_date = this.formatDate(rawDate);
      console.log('Formatted Date:', new_date);
    } else {
      console.log('No date selected');
    }

    const registerData = {
      name: this.usernameControl.value,
      email: this.EmailControl.value,
      password: this.passwordControl.value,
      card_num: this.cardControl.value,
      valid_to: new_date
    };

    this.registerService.registerUser(registerData).subscribe(
      (response) => {
        this._snackBar.open('Register successful!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/login']);
        console.log(response);
      },
      (error) => {
        console.error(error);
        this._snackBar.open(error.error, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}