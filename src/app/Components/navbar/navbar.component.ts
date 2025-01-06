import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificationService } from '../../services/Authentification/authentification.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  userRole: string = '';  // Stocke le rôle de l'utilisateur
  userName: string = '';
  private authSubscription!: Subscription;

  // Mettre authService en public pour y accéder dans le template
  constructor(
    public authService: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Écoute les changements d'état de connexion et de rôle
    this.authSubscription = this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.userRole = user?.role || '';  // Récupération du rôle
      this.userName = user?.name || '';
    });
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  isOrganisateur(): boolean {
    return this.userRole === 'Organisateur';
  }

  isParticipant(): boolean {
    return this.userRole === 'Participant';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSelectChange(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement).value;
  if (selectedValue === 'logout') {
    this.logout();
  }
}

}
