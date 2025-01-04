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
    return this.http.put<Evenement>(`${this.apiUrl}/${id}/modifier`, evenement);
  }

  // Ajouter un participant à une équipe
  ajouterParticipantEquipe(evenementId: number,equipeId: number,participantId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${evenementId}/equipes/${equipeId}/ajouter-participant/${participantId}`,
      {}
    );
  }

  // Regrouper automatiquement les participants
  repartirParticipantsAleatoirement(evenementId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${evenementId}/repartir`, {});
  }

  inscrireParticipant(evenementId: number, participantId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/${evenementId}/inscrire/${participantId}`, {});
}

  // Inscrire plusieurs participants à un événement
  inscrirePlusieursParticipants(evenementId: number, participantIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${evenementId}/inscrireParticipants`, participantIds);
  }

  getEvenementDetails(evenementId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${evenementId}`);
  }

  creerEvenementParParticipant(participantId: number, evenement: Evenement): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/creerParParticipant/${participantId}`,
      evenement
    );
  }

  appliquerPromo(evenementId: number, participantId: number, codePromo: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${evenementId}/appliquerPromotion/${participantId}`,
      null,
      { params: { codePromo } }
    );
  }


  getEvenementsParParticipant(participantId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/participes/${participantId}`);
  }

   getEvenementsNonVerifie(participantId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listeSimpleNonVerified`, {
      params: { participantId }
    });
  }

  getEvenementsNonComplets(participantId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nonCompletsNonParticipes`, {
      params: { participantId }
    });
  }

  // Vérifier un événement spécifique
  verifierEvenement(evenementId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${evenementId}/verify`, {});
  }

}
