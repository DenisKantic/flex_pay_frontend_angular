import axios from 'axios';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from "@angular/core";
import { CookieService } from 'ngx-cookie-service'; // Import CookieService
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
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css',
  imports: [FormsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterModule],

})
export class LoginComponent {
  EmailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', Validators.required) 

  matcher = new MyErrorStateMatcher();
  hide = signal(true);
  
  constructor(private _snackBar: MatSnackBar, private router:Router, private cookieService:CookieService) { }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login(){

    // delete just in case older jwt inside cookies
    this.cookieService.delete('jwt');
    console.log('Login button clicked');
  console.log('Email:', this.EmailControl.value);
  console.log('Password:', this.passwordControl.value);
    if (this.EmailControl.valid && this.passwordControl.valid){
      const login_data = {
        email: this.EmailControl.value,
        password: this.passwordControl.value
      }

      axios.post('http://localhost:8080/login', login_data, {withCredentials: true})
      .then(response=>{
        this._snackBar.open('Login successful!', 
          'Close', 
          { duration: 3000 ,
          panelClass: ['success-snackbar']
       }); 
       this.router.navigate(['/dashboard'])
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
