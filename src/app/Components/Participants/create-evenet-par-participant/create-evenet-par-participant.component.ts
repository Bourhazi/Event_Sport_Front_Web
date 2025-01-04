import { Component, OnInit } from '@angular/core';
import { TypeDeSport, TypeDeSportService } from '../../../services/TypeSportService/type-de-sport.service';
import { LocalisationService } from '../../../services/LocalisationService/localisation.service';
import { Evenement, EvenementService } from '../../../services/EvenementService/evenement.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-evenet-par-participant',
  standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-evenet-par-participant.component.html',
  styleUrl: './create-evenet-par-participant.component.css'
})
export class CreateEvenetParParticipantComponent implements OnInit {
  evenement: Evenement = {
    nom: '',
    date: '',
    prix: 0,
    localisationId: 0,
    typeDeSportId: 0
  };

  localisations: any[] = [];
  typesDeSport: TypeDeSport[] = [];
  participantId: number = 3;  // ID du participant (exemple fixe pour le moment)

  constructor(
    private evenementService: EvenementService,
    private localisationService: LocalisationService,
    private typeDeSportService: TypeDeSportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLocalisations();
    this.loadTypesDeSport();
  }

  // Charger les localisations
  loadLocalisations(): void {
    this.localisationService.getAllLocalisations().subscribe({
      next: (data) => {
        this.localisations = data;
      },
      error: (err) => console.error('Erreur de chargement des localisations', err)
    });
  }

  // Charger les types de sport
  loadTypesDeSport(): void {
    this.typeDeSportService.getTypesDeSport().subscribe({
      next: (data) => {
        this.typesDeSport = data;
      },
      error: (err) => console.error('Erreur de chargement des types de sport', err)
    });
  }

  // Soumettre le formulaire pour créer un événement
  onSubmit(): void {
    this.evenementService.creerEvenementParParticipant(this.participantId, this.evenement).subscribe({
      next: () => {
        console.log('Événement créé avec succès');
        this.router.navigate(['/participant-evenements']);
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'événement', err);
      }
    });
  }
}
