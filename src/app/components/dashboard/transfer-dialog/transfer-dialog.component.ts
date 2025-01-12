import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; // For mat-form-field
import { ReactiveFormsModule } from '@angular/forms'; // For form handling
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-transfer-dialog',
  imports: [MatDialogModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, CommonModule, MatInputModule],
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.css']
})
export class TransferDialogComponent {
  amount: number | null = null; // Amount to transfer

  constructor(
    public dialogRef: MatDialogRef<TransferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Receiving data if needed
  ) {}

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without any action
  }

  confirmTransfer(): void {
    this.dialogRef.close(this.amount); // Close dialog and return the amount
  }
}