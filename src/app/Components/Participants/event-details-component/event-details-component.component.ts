import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../../../services/EvenementService/evenement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-details-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-details-component.component.html',
  styleUrl: './event-details-component.component.css'
})
export class EventDetailsComponentComponent implements OnInit {
  evenement: any;
  participantId: number | null = null;
  prixApresRemise: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private router: Router  // Ajoutez le service Router
  ) {}

  ngOnInit(): void {
    const evenementId = this.route.snapshot.paramMap.get('id');
    this.participantId = Number(this.route.snapshot.queryParamMap.get('participantId'));

    if (evenementId && this.participantId) {
      this.evenementService
        .obtenirEvenementsParticipesAvecPrixReduit(this.participantId)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.evenement = data.find(e => e.id == evenementId);
            this.prixApresRemise = this.evenement?.prixApresRemise || this.evenement.prix;
          },
          error: (err) => {
            console.error('Erreur lors du chargement des détails de l\'événement', err);
          }
        });
    }
  }

  // Méthode pour revenir à la page précédente
  retour(): void {
    this.router.navigate(['/evenements']);
  }
}
