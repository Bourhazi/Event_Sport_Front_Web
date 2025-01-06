import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EvenementService } from '../../services/EvenementService/evenement.service';
import { TypeDeSportService } from '../../services/TypeSportService/type-de-sport.service';
import { LocalisationService } from '../../services/LocalisationService/localisation.service';

@Component({
  selector: 'app-evenement-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evenement-details.component.html',
  styleUrl: './evenement-details.component.css'
})
export class EvenementDetailsComponent implements OnInit {
  evenement: any = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private typesprotService : TypeDeSportService,
    private localisationService : LocalisationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const evenementId = Number(this.route.snapshot.paramMap.get('id'));
    this.chargerDetailsEvenement(evenementId);
  }

 chargerDetailsEvenement(evenementId: number): void {
  this.evenementService.getEvenementDetails(evenementId).subscribe({
    next: (data) => {
      this.evenement = data;

      // Charger les détails du type de sport
      this.typesprotService.getTypeDeSport(data.typeDeSportId).subscribe({
        next: (sport) => this.evenement.typeDeSport = sport,
        error: () => this.evenement.typeDeSport = { nom: 'Non défini' }
      });

      // Charger les détails de la localisation
      this.localisationService.getLocalisationById(data.localisationId).subscribe({
        next: (loc) => this.evenement.localisation = loc,
        error: () => this.evenement.localisation = { adresse: 'Adresse inconnue' }
      });
    },
    error: (err) => {
      console.error('Erreur lors du chargement des détails', err);
      this.errorMessage = 'Impossible de charger les détails de cet événement.';
    }
  });
}


  retourListe(): void {
    this.router.navigate(['/evenements']);
  }
}
