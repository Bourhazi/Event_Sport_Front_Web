import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regle } from '../RegleService/regle.service';

export interface TypeDeSport {
  id: number;
  nom: string;
  nombreEquipesMax: number;
  nombreParticipantsParEquipe: number;
  regles: Regle[];
}

@Injectable({ 
  providedIn: 'root'
})
export class TypeDeSportService {

  private apiUrl = 'http://localhost:8080/typesport';

  constructor(private http: HttpClient) { }

  getTypesDeSport(): Observable<TypeDeSport[]> {
    return this.http.get<TypeDeSport[]>(`${this.apiUrl}/liste`);
  }

  getTypeDeSport(id: number): Observable<TypeDeSport> {
    return this.http.get<TypeDeSport>(`${this.apiUrl}/${id}`);
  }

  addTypeDeSport(typeDeSport: TypeDeSport): Observable<TypeDeSport> {
    return this.http.post<TypeDeSport>(`${this.apiUrl}/creer`, typeDeSport);
  }

  updateTypeDeSport(id: number, typeDeSport: TypeDeSport): Observable<TypeDeSport> {
    return this.http.put<TypeDeSport>(`${this.apiUrl}/mettreajour/${id}`, typeDeSport);
  }
}
