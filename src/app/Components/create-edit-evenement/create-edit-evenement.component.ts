import { Component, OnInit } from '@angular/core';
import { TypeDeSport, TypeDeSportService } from '../../services/TypeSportService/type-de-sport.service';
import { LocalisationService } from '../../services/LocalisationService/localisation.service';
import { Evenement, EvenementService } from '../../services/EvenementService/evenement.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-edit-evenement',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './create-edit-evenement.component.html',
  styleUrl: './create-edit-evenement.component.css'
})
export class CreateEditEvenementComponent implements OnInit{
  evenement: Evenement = {
    id: 0,
    nom: '',
    date: '',
    prix: 0,
    localisationId: 0,
    typeDeSportId: 0
  };

  isEditMode = false;
  localisations: any[] = [];
  typesDeSport: TypeDeSport[] = [];

  constructor(
    private evenementService: EvenementService,
    private localisationService: LocalisationService,
    private typeDeSportService: TypeDeSportService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLocalisations();
    this.loadTypesDeSport();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadEvenement(Number(id));
    }
  }

  // Charger la liste des localisations
  loadLocalisations(): void {
    this.localisationService.getAllLocalisations().subscribe({
      next: (data) => (this.localisations = data),
      error: (err) => console.error('Erreur de chargement des localisations', err)
    });
  }

  // Charger la liste des types de sport
  loadTypesDeSport(): void {
    this.typeDeSportService.getTypesDeSport().subscribe({
      next: (data) => (this.typesDeSport = data),
      error: (err) => console.error('Erreur de chargement des types de sport', err)
    });
  }

  // Charger un événement existant pour la modification
  loadEvenement(id: number): void {
    this.evenementService.getEvenementById(id).subscribe({
      next: (data) => {this.evenement = data;
        console.log('Données de l\'événement chargé :', this.evenement);
      },
      error: (err) => console.error('Erreur de chargement de l\'événement', err)
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateEvenement();
    } else {
      this.createEvenement();
    }
  }

  createEvenement(): void {
    this.evenementService.creerEvenement(this.evenement).subscribe({
      next: () => {
        console.log('Événement créé avec succès');
        this.router.navigate(['/evenements-list']);
      },
      error: (err) => console.error('Erreur lors de la création de l\'événement', err)
    });
  }

    updateEvenement(): void {
  if (this.evenement.id !== undefined) {
    // Convertir localisationId et typeDeSportId en objets imbriqués
    const evenementPayload = {
      ...this.evenement,
      localisation: { id: this.evenement.localisationId },
      typeDeSport: { id: this.evenement.typeDeSportId },
    };

    console.log('Données envoyées pour la mise à jour :', evenementPayload);
    this.evenementService.mettreAJourEvenement(this.evenement.id, evenementPayload).subscribe({
      next: () => {
        console.log('Événement mis à jour avec succès');
        this.router.navigate(['/evenements-list']);
      },
      error: (err) =>
        console.error('Erreur lors de la mise à jour de l\'événement', err),
    });
  } else {
    console.error("Erreur : l'ID de l'événement est undefined.");
  }
}

}
