import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.authService.checkTokenValidity();
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
    return true;
  }
}
