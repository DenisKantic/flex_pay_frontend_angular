import axios from 'axios';
import { Component, ChangeDetectionStrategy, signal } from "@angular/core";
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
  imports: [FormsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],

})
export class LoginComponent {
  EmailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', Validators.required) 

  matcher = new MyErrorStateMatcher();
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login(){
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
        alert("SUCCESS")
        console.log(response.data)
      })
      .catch(error =>{
        console.error(error)
        alert("login failed")
      })
    }
  }

}