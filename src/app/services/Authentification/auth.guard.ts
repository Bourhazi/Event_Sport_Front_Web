import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();
    console.log("Vérification utilisateur dans AuthGuard : ", user);

    // Validation stricte : Vérifier que l'utilisateur est bien authentifié
    if (!user || !user.id || !user.role) {
      console.log('Accès non autorisé, redirection vers /login');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
