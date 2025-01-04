import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role === 'Organisateur') {
      return true;
    } else {
      this.router.navigate(['/login']);  // Redirection vers login si rôle non valide
      return false;
    }
  }

}
