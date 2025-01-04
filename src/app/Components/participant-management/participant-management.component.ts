import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EvenementService } from '../../services/EvenementService/evenement.service';
import { ParticipantService, Participant } from '../../services/ParticipantService/participant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-participant-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './participant-management.component.html',
  styleUrl: './participant-management.component.css',
})
export class ParticipantManagementComponent implements OnInit {
  evenementId!: number;
  allParticipants: Participant[] = [];
  participantsInscrits: Participant[] = [];
  selectedParticipants: number[] = [];
  message: string = '';
  errorMessage: string = '';

  constructor(
    private evenementService: EvenementService,
    private participantService: ParticipantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.evenementId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAllData();
  }

loadAllData(): void {
  this.participantService.getParticipants().subscribe({
    next: (allParticipants) => {
      this.allParticipants = allParticipants;  // Charger tous les participants
    },
    error: (err) => {
      console.error('Erreur lors du chargement des participants', err);
      this.errorMessage = 'Erreur lors du chargement des participants.';
    },
  });

  this.evenementService.getEvenementById(this.evenementId).subscribe({
    next: (event) => {
      this.participantsInscrits = event.participants || [];  // Met à jour la liste des inscrits sans modifier allParticipants
    },
    error: (err) => {
      console.error('Erreur lors du chargement de l\'événement', err);
    },
  });
}


  inscrireParticipants(): void {
  if (this.selectedParticipants.length > 0) {
    console.log('Participants sélectionnés:', this.selectedParticipants);

    this.evenementService.inscrirePlusieursParticipants(this.evenementId, this.selectedParticipants).subscribe({
      next: () => {
        this.message = `Participants inscrits avec succès.`;

        // Mettre à jour uniquement la liste des participants inscrits
        this.evenementService.getEvenementById(this.evenementId).subscribe(event => {
          this.participantsInscrits = event.participants || [];
        });
      },
      error: (err) => {
        console.error('Erreur lors de l’inscription des participants', err);

        // Afficher le message d'erreur sans toucher aux participants déjà sélectionnés
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Erreur lors de l’inscription des participants. Certains peuvent déjà être inscrits.';
        }
      },
    });
  } else {
    this.errorMessage = 'Veuillez sélectionner au moins un participant.';
  }
}

isParticipantInscrit(participantId: number): boolean {
  return this.participantsInscrits.some(p => p.id === participantId);
}



}
