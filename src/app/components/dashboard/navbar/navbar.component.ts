import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import axios from 'axios';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    constructor(private _snackBar: MatSnackBar, private router:Router) { }
  
  logOut() {
   
    axios.get('http://localhost:8080/logout', {withCredentials: true})
    .then(response =>{
        this._snackBar.open('Logging out')
        console.log(response)
        this.router.navigate(['/login'])
    })
    .catch(error => {
      this._snackBar.open('Error logging out')
      console.error(error)
    })
  }

}
