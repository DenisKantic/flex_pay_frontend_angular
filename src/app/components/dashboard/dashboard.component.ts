import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, MatCardModule,MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  balance: number | null = null; 

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchBalance(); 
  }

  fetchBalance(): void {
    axios.get('http://localhost:8080/balance', { withCredentials: true }) 
      .then(response => {
        console.log("test",response.data)
        this.balance = response.data.balance; 
      })
      .catch(error => {
        this._snackBar.open('Error fetching balance', 'Close', { duration: 2000 });
        console.error('Error fetching balance:', error);
      });
  }
}