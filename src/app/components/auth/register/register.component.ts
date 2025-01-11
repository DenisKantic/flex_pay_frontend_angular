import axios from 'axios';
import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from "@angular/core";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: 'register.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: 'register.component.css',
  imports: [MatDatepickerModule, FormsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  EmailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', Validators.required) 
  usernameControl = new FormControl('', Validators.required) 
  cardControl = new FormControl('', Validators.required) 
  dateControl = new FormControl('', Validators.required) 


  matcher = new MyErrorStateMatcher();
  hide = signal(true);
  
  constructor(private _snackBar: MatSnackBar, private router:Router) { }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  formatDate(rawDate: string): string {
    const date = new Date(rawDate); // Convert the string to a Date object
    const day = String(date.getDate()).padStart(2, '0'); // Extract day with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Extract month (0-based index)
    const year = date.getFullYear(); // Extract year
    return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
  }
  

  register(){

    let new_date;
  
    const rawDate = this.dateControl.value?.toString(); // Get the date as a string
    if (rawDate) {
      const formattedDate = this.formatDate(rawDate);
      new_date = this.formatDate(rawDate)
      console.log('Formatted Date:', formattedDate);
    } else {
      console.log('No date selected');
    }
  
    console.log('Login button clicked');
  console.log('Email:', this.EmailControl.value);
  console.log('Password:', this.passwordControl.value);
  console.log("date", this.dateControl.value)
    if (this.EmailControl.valid && this.passwordControl.valid
      && this.usernameControl && this.cardControl && this.dateControl
    ){
      const register_data = {
        name: this.usernameControl.value,
        email: this.EmailControl.value,
        password: this.passwordControl.value,
        card_num: this.cardControl.value,
        valid_to: new_date
      }

      axios.post('http://localhost:8080/register', register_data, {withCredentials: true})
      .then(response=>{
        this._snackBar.open('Register successful!', 
          'Close', 
          { duration: 3000 ,
          panelClass: ['success-snackbar']
       }); 
       this.router.navigate(['/login'])
        console.log(response.data)
      })
      .catch(error =>{
        console.error(error)
        this._snackBar.open(error.response.data, 
          'Close', { 
            duration: 3000,
            panelClass: ['error-snackbar'] }); // Success message
      })
    }
  }

}
