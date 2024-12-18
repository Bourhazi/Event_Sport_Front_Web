import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Evenement {
  id?: number;
  nom: string;
  date: string; // Format: 'YYYY-MM-DD'
  prix: number;
  typeDeSportId: number;
  localisationId: number;
}
@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private apiUrl = 'http://localhost:8080/evenements';

  constructor(private http: HttpClient) {}

  // Récupérer tous les événements
  getEvenements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listeSimple`);
  }

  // Créer un nouvel événement
  creerEvenement(evenement: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(`${this.apiUrl}/creer`, evenement);
  }

  // Supprimer un événement
  supprimerEvenement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtenir un événement par ID
  getEvenementById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un événement
  mettreAJourEvenement(id: number, evenement: Evenement): Observable<Evenement> {
    return this.http.put<Evenement>(`${this.apiUrl}/${id}`, evenement);
  }
}
