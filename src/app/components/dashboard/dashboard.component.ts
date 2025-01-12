import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { TransferDialogComponent } from './transfer-dialog/transfer-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, MatCardModule,MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  balance: number | null = null; 
  username: string | null = "";
  card_number: number | null = null;
  user_email: string | null = "";
  valid_to: string | null = "";

  constructor(private _snackBar: MatSnackBar, public dialog:MatDialog) {}

  ngOnInit(): void {
    this.fetchBalance(); 
  }

  openTransferDialog(): void {
    const dialogRef = this.dialog.open(TransferDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transferFunds(result); // Call transferFunds with the entered amount
      }
    });
  }

  fetchBalance(): void {
    axios.get('http://localhost:8080/user-info', { withCredentials: true }) 
      .then(response => {
        console.log("test",response.data)
        this.balance = response.data.balance; 
        this.card_number = response.data.card;
        this.username = response.data.username;
        this.user_email = response.data.email
        this.valid_to = this.formatDate(response.data.valid_to)
      })
      .catch(error => {
        this._snackBar.open('Error fetching balance', 'Close', { duration: 2000 });
        console.error('Error fetching balance:', error);
      });
  }

  transferFunds(amount: number): void {
    if (amount <= 0) {
      this._snackBar.open('Please enter a valid amount to transfer', 'Close', { duration: 2000 });
      return;
    }
    
    axios.post('http://localhost:8080/transfer-funds', {
      user_email: this.user_email, // Use the stored user email
      amount: amount
    }, { withCredentials: true })
      .then(response => {
        this._snackBar.open('Transfer successful', 'Close', { duration: 2000 });
        console.log(response.data);
        this.fetchBalance(); // Refresh balance after transfer
      })
      .catch(error => {
        this._snackBar.open('Error transferring funds', 'Close', { duration: 2000 });
        console.error('Error transferring funds:', error);
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString); // Convert the string to a Date object
    const day = String(date.getDate()).padStart(2, '0'); // Get day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (months are 0-based)
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of year

    return `${day}/${month}/${year}`; // Return formatted date as dd/mm/yy
  }
}