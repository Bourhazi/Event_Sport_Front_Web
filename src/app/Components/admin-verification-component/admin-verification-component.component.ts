import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evenement, EvenementService } from '../../services/EvenementService/evenement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-verification-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-verification-component.component.html',
  styleUrl: './admin-verification-component.component.css'
})
export class AdminVerificationComponentComponent implements OnInit {
  evenements: Evenement[] = [];
  filteredEvenements: Evenement[] = [];
  paginatedEvenements: Evenement[] = [];  // Ajout de cette ligne

  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Filtres
  searchTerm: string = '';
  filterPrix: string = '';
  filterDate: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;

  participantId: number = 3;  // ID fixe pour le moment (test)

  constructor(private evenementService: EvenementService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvenementsNonVerifies();
  }

  loadEvenementsNonVerifies(): void {
    this.evenementService.getEvenementsNonVerifie(this.participantId).subscribe({
      next: (data) => {
        this.evenements = data;
        this.filteredEvenements = [...this.evenements];
        this.totalItems = this.filteredEvenements.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagination();
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des événements non vérifiés.';
        console.error(err);
      }
    });
  }

  verifierEvenement(evenementId: number): void {
    this.evenementService.verifierEvenement(evenementId).subscribe({
      next: (response) => {
        this.successMessage = 'Événement vérifié avec succès.';
        this.evenements = this.evenements.filter(event => event.id !== evenementId);
        this.filterEvenements();  // Refiltrer après suppression
        this.updatePagination();
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la vérification de l\'événement.';
        console.error(err);
      }
    });
  }

  // Filtrage
  filterEvenements(): void {
    const filtered = this.evenements.filter(event => {
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

  // Pagination
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvenements = this.filteredEvenements.slice(startIndex, endIndex);
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
