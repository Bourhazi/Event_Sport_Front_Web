import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiUrl = 'http://localhost:8080/auth';
  private user: any = null;

  // BehaviorSubject pour suivre l'état de connexion
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  // Vérification de la présence du token (ou user)
  private hasToken(): boolean {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return !!user;
    }
    return false;  // Si localStorage n'est pas disponible
  }

  // Getter pour écouter les changements d'authentification
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.status === 'success') {
          this.user = response;
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response));  // Stocker côté client uniquement
          }
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    this.user = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getUser(): any {
    if (typeof window !== 'undefined') {
      return this.user || JSON.parse(localStorage.getItem('user') || '{}');
    }
    return this.user || {};
  }

  isAuthenticated(): boolean {
    return !!this.getUser().id;
  }

  getRole(): string {
    return this.getUser().role;
  }

  forgotPassword(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/forgotpassword`, { email });
  }

}
