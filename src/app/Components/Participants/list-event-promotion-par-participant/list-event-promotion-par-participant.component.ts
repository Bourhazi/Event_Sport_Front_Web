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

  participantId: number | null = null;
  selectedEventId: number | null = null;
  codePromo: string = '';
  prixApresRemise: number | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private evenementService: EvenementService, private router: Router) {}

  ngOnInit(): void {
    this.recupererParticipantId();
    this.loadEvenementsParticipant();
  }

  recupererParticipantId(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && user.id) {
      this.participantId = user.id;
      console.log('ID du participant récupéré :', this.participantId);
    } else {
      console.error('Aucun utilisateur trouvé dans le localStorage');
      this.router.navigate(['/login']);
    }
  }

  loadEvenementsParticipant(): void {
    if (this.participantId !== null) {
      this.evenementService.getEvenementsParParticipant(this.participantId).subscribe({
        next: (data) => {
          console.log(data)
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
  }

  ouvrirFormulairePromo(evenementId: number): void {
    this.selectedEventId = evenementId;
    this.codePromo = '';
    this.prixApresRemise = null;
  }

  appliquerPromo(): void {
    if (this.selectedEventId && this.codePromo && this.participantId !== null) {
      this.evenementService.appliquerPromo(this.selectedEventId, this.participantId, this.codePromo).subscribe({
        next: (response) => {
          this.successMessage = 'Promotion appliquée avec succès';

          // Mettre à jour directement le prix après remise dans la liste des événements
          const event = this.evenements.find(e => e.id === this.selectedEventId);
          if (event) {
            event.prixApresRemise = response.prixApresRemise;
          }

          this.prixApresRemise = response.prixApresRemise;
          this.loadEvenementsParticipant();  // Recharger la liste après l'application
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

  voirDetails(evenementId: number): void {
    if (this.participantId) {
      this.router.navigate([`/evenement-details/${evenementId}`], {
        queryParams: { participantId: this.participantId }
      });
    } else {
      console.error("Participant ID non disponible.");
    }
  }

}
