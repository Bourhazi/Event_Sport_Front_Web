import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipantGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role === 'Participant') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
