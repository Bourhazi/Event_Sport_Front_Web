import { Component, OnInit } from '@angular/core';
import { Evenement, EvenementService } from '../../services/EvenementService/evenement.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evenement-list-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './evenement-list-component.component.html',
  styleUrl: './evenement-list-component.component.css'
})
export class EvenementListComponentComponent implements OnInit {
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

  constructor(private evenementService: EvenementService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.successMessage = navigation.extras.state['message'];
      this.errorMessage = navigation.extras.state['error'];
    }
  }

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements(): void {
    this.evenementService.getEvenements().subscribe({
      next: (data) => {
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

  deleteEvenement(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.evenementService.supprimerEvenement(id).subscribe({
        next: () => {
          this.successMessage = 'Événement supprimé avec succès';
          this.loadEvenements();
        },
        error: () => (this.errorMessage = 'Erreur lors de la suppression de l\'événement'),
      });
    }
  }

  editEvenement(id: number) {
    this.router.navigate(['/edit-evenements', id]);
  }

  createEvenement() {
    this.router.navigate(['/create-evenements']);
  }

  manageParticipants(id: number): void {
  this.router.navigate([`/evenements/${id}/participants`]);
  }
  
  voirDetails(id: number): void {
  this.router.navigate([`/evenements/${id}/details`]);
  }


}
