import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EvenementService } from '../../services/EvenementService/evenement.service';
import { ParticipantService, Participant } from '../../services/ParticipantService/participant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-participant-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './participant-management.component.html',
  styleUrls: ['./participant-management.component.css'],
})
export class ParticipantManagementComponent implements OnInit {
  evenementId!: number;
  allParticipants: Participant[] = [];
  participantsInscrits: Participant[] = [];
  selectedParticipantId: number | null = null;
  message: string = '';
  errorMessage: string = '';

  constructor(
    private evenementService: EvenementService,
    private participantService: ParticipantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.evenementId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAllParticipants();
    this.loadParticipantsInscrits();
  }

 // Charger tous les participants
loadAllParticipants(): void {
  this.participantService.getParticipants().subscribe({
    next: (participants: any[]) => {
      // Filtrer uniquement les objets de type Participant
      this.allParticipants = participants.filter(p => typeof p === 'object' && p.id);
      console.log('✅ Tous les participants chargés :', this.allParticipants);
    },
    error: (err) => {
      console.error('❌ Erreur lors du chargement des participants', err);
      this.errorMessage = 'Erreur lors du chargement des participants.';
    },
  });
}

// Charger les participants déjà inscrits
loadParticipantsInscrits(): void {
  this.evenementService.getEvenementById(this.evenementId).subscribe({
    next: (event) => {
      if (event && event.participants) {
        const participantsIds: number[] = event.participants.map((p: any) => p.id);
        console.log('🔍 IDs des participants inscrits reçus :', participantsIds);

        const participantsComplets = this.allParticipants.filter(p => participantsIds.includes(p.id));
        const idsIncomplets = participantsIds.filter(id => !participantsComplets.find(p => p.id === id));

        console.log("✅ Participants complets trouvés :", participantsComplets);
        console.log("❓ Participants incomplets (IDs uniquement) :", idsIncomplets);

        if (idsIncomplets.length > 0) {
          forkJoin(
            idsIncomplets.map(id => this.participantService.getParticipantById(id))
          ).subscribe({
            next: (details: Participant[]) => {
              console.log("📦 Détails des participants récupérés :", details);
              this.participantsInscrits = [...participantsComplets, ...details];
              console.log("🟩 Liste complète des participants inscrits :", this.participantsInscrits);
            },
            error: (err) => {
              console.error('❌ Erreur lors du chargement des participants incomplets', err);
            }
          });
        } else {
          this.participantsInscrits = participantsComplets;
        }
      } else {
        console.warn("⚠️ Aucun participant inscrit trouvé pour cet événement.");
        this.participantsInscrits = [];
      }
    },
    error: (err) => {
      console.error('❌ Erreur lors du chargement des participants inscrits', err);
    },
  });
}

// Vérifier si un participant est déjà inscrit
isParticipantAlreadyInscrit(participantId: number | undefined): boolean {
  if (participantId === undefined) {
    console.warn("⚠️ ID de participant non défini !");
    return false;
  }
  return this.participantsInscrits.some(p => p.id === participantId);
}

 inscrireParticipant(): void {
    if (this.selectedParticipantId) {
      console.log("Participant sélectionné pour l'inscription :", this.selectedParticipantId);

      this.evenementService.inscrireParticipant(this.evenementId, this.selectedParticipantId).subscribe({
        next: (response) => {
          console.log("Réponse du serveur après inscription :", response);
          this.message = response.message;
          this.errorMessage = '';
          this.loadParticipantsInscrits();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erreur lors de l’inscription.';
          this.message = '';
        },
      });
    } else {
      console.warn("Aucun participant sélectionné !");
      this.errorMessage = 'Veuillez sélectionner un participant.';
    }
  }

}
