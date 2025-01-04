import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private apiUrl = 'http://localhost:8080/equipes';

  constructor(private http: HttpClient) { }

  // Récupérer les équipes par événement
  getEquipesByEvenement(evenementId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/evenement/${evenementId}`);
  }
}
