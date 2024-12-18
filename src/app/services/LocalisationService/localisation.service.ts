import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  private baseUrl = 'http://localhost:8080/api/localisations';

  constructor(private http: HttpClient) {}

  getAllLocalisations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getLocalisationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createLocalisation(localisation: any): Observable<any> {
    return this.http.post(this.baseUrl, localisation);
  }

  updateLocalisation(id: number, localisation: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, localisation);
  }

  deleteLocalisation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
