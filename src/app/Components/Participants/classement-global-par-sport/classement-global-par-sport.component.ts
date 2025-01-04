import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultatServiceService } from '../../../services/ResultatService/resultat-service.service';

@Component({
  selector: 'app-classement-global-par-sport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classement-global-par-sport.component.html',
  styleUrl: './classement-global-par-sport.component.css'
})
export class ClassementGlobalParSportComponent implements OnInit {

  classements: { nom: string; score: number }[] = [];
  participantId!: number;
  errorMessage: string | null = null;

  constructor(
    private resultatService: ResultatServiceService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du participant depuis localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.participantId = user.id;

    if (this.participantId) {
      this.loadClassement();
    } else {
      this.errorMessage = 'ID du participant introuvable';
    }
  }

  // Charger le classement
  loadClassement(): void {
    this.resultatService.getClassementParParticipant(this.participantId).subscribe({
      next: (data) => {
        // Adapter à la structure correcte de l'API
        this.classements = data.map((resultat: any) => ({
          nom: resultat.evenementNom || 'Evènement Inconnu',
          score: resultat.resultat || '0'
        }));
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement du classement';
        console.error(err);
      }
    });
  }

}
