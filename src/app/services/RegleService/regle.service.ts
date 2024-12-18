import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Regle {
  id: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegleService {
  private apiUrl = 'http://localhost:8080/api/regles';

  constructor(private http: HttpClient) {}

  getAllRegles(): Observable<Regle[]> {
    return this.http.get<Regle[]>(this.apiUrl);
  }

  getRegleById(id: number): Observable<Regle> {
    return this.http.get<Regle>(`${this.apiUrl}/${id}`);
  }

  createRegle(regle: Regle): Observable<Regle> {
    return this.http.post<Regle>(this.apiUrl, regle);
  }

  updateRegle(id: number, regle: Regle): Observable<Regle> {
    return this.http.put<Regle>(`${this.apiUrl}/${id}`, regle);
  }

  deleteRegle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
