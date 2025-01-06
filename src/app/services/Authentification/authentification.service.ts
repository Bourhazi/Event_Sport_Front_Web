import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiUrl = 'http://localhost:8080/auth';
  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage()); // Suivi de l'utilisateur
  user$ = this.userSubject.asObservable(); // Observable pour suivre l'utilisateur et son rôle
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  // Vérification sécurisée de la présence du token dans localStorage (client-side)
  private hasToken(): boolean {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      return !!user;
    }
    return false;
  }

  // Récupérer l'utilisateur depuis le localStorage (avec vérification)
  private getUserFromStorage(): any {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Getter pour observer l'état d'authentification
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Méthode de connexion
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        console.log(response)
        if (response.status === 'success') {
          this.userSubject.next(response);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response));
          }
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  // Déconnexion et suppression des données
  logout(): void {
    this.userSubject.next(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Obtenir l'utilisateur courant
  getUser(): any {
    return this.userSubject.value;
  }

  // Obtenir le rôle de l'utilisateur
  getRole(): string {
    return this.getUser()?.role || '';
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!this.getUser()?.id;
  }

  // Méthode pour mot de passe oublié
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgotpassword`, { email });
  }

   updateUserInSubject(updatedUser: any): void {
    this.userSubject.next(updatedUser);
  }
}
