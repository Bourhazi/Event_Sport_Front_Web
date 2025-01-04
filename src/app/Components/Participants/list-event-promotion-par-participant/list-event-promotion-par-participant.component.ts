import { Component, OnInit } from '@angular/core';
import { EvenementService, Evenement } from '../../../services/EvenementService/evenement.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-event-promotion-par-participant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-event-promotion-par-participant.component.html',
  styleUrl: './list-event-promotion-par-participant.component.css'
})
export class ListEventPromotionParParticipantComponent implements OnInit {

  evenements: Evenement[] = [];
  paginatedEvenements: Evenement[] = [];
  searchTerm = '';
  filterPrix = '';
  filterDate = '';

  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;
  totalPages = 0;

  participantId: number = 3;  // ID fixe pour l'instant (test)
  selectedEventId: number | null = null;
  codePromo: string = '';
  prixApresRemise: number | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private evenementService: EvenementService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvenementsParticipant();
  }

  loadEvenementsParticipant(): void {
    this.evenementService.getEvenementsParParticipant(this.participantId).subscribe({
      next: (data) => {
        this.evenements = data;
        this.totalItems = this.evenements.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagination();
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des événements';
        console.error(err);
      }
    });
  }

  ouvrirFormulairePromo(evenementId: number): void {
    this.selectedEventId = evenementId;
    this.codePromo = '';  // Réinitialisation du champ promo
    this.prixApresRemise = null;
  }

  appliquerPromo(): void {
    if (this.selectedEventId && this.codePromo) {
      this.evenementService.appliquerPromo(this.selectedEventId, this.participantId, this.codePromo).subscribe({
        next: (response) => {
          this.successMessage = 'Promotion appliquée avec succès';
          this.prixApresRemise = response.prixApresRemise;  // Affichage du prix après remise
          this.loadEvenementsParticipant();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de l\'application de la promotion';
          console.error(err);
        }
      });
    }
  }

  fermerFormulaire(): void {
    this.selectedEventId = null;
    this.codePromo = '';
    this.prixApresRemise = null;
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvenements = this.evenements.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
