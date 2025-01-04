import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Evenement, EvenementService } from '../../../services/EvenementService/evenement.service';

@Component({
  selector: 'app-participant-list-event',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './participant-list-event.component.html',
  styleUrl: './participant-list-event.component.css'
})
export class ParticipantListEventComponent implements OnInit {

  evenements: Evenement[] = [];
  filteredEvenements: Evenement[] = [];
  paginatedEvenements: Evenement[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  searchTerm = '';
  filterPrix = '';
  filterDate = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;
  totalPages = 0;

  participantId: number | null = null;  // Récupération dynamique

  constructor(private evenementService: EvenementService, private router: Router) {}

  ngOnInit(): void {
    this.recupererParticipantId();
    this.loadEvenements();
  }

  // Récupérer l'ID du participant depuis le localStorage
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

  loadEvenements(): void {
    if (this.participantId) {
      this.evenementService.getEvenementsNonComplets(this.participantId).subscribe({
        next: (data) => {
          console.log(data);
          this.evenements = data;
          this.filteredEvenements = [...this.evenements];
          this.totalItems = this.filteredEvenements.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.updatePagination();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement des événements';
          console.error(err);
        },
      });
    } else {
      this.errorMessage = 'Participant non trouvé';
    }
  }

  filterEvenements() {
    const filtered = this.evenements.filter((event) => {
      const matchesName = event.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesPrix = this.filterPrix === '' || event.prix <= Number(this.filterPrix);
      const matchesDate = this.filterDate === '' || event.date === this.filterDate;
      return matchesName && matchesPrix && matchesDate;
    });

    this.filteredEvenements = filtered;
    this.totalItems = filtered.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvenements = this.filteredEvenements.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  inscrireEvenement(evenementId: number): void {
    if (this.participantId) {
      this.evenementService.inscrireParticipant(evenementId, this.participantId).subscribe({
        next: () => {
          this.successMessage = 'Inscription réussie à l\'événement';
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de l\'inscription';
          console.error(err);
        },
      });
    } else {
      this.errorMessage = 'Erreur : participant introuvable.';
    }
  }

  voirDetails(id: number): void {
    this.router.navigate([`/evenements/${id}/details`]);
  }

  createEvenement() {
    this.router.navigate(['/create-participant-evenement']);
  }
}
