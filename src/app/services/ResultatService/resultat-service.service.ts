import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultatServiceService {

  private apiUrl = 'http://localhost:8080/api/resultats';

  constructor(private http: HttpClient) {}

  ajouterResultatEquipe(resultat: any): Observable<any> {
    const params = new URLSearchParams();
    params.set('equipeId', resultat.equipeId);
    params.set('nombreButs', resultat.nombreButs);
    if (resultat.temps !== undefined) {
      params.set('temps', resultat.temps);
    }

    return this.http.post(`${this.apiUrl}/ajouter/equipe/${resultat.evenementId}?${params.toString()}`, {});
  }

  getClassementParParticipant(participantId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/participant/${participantId}`);
  }

}
