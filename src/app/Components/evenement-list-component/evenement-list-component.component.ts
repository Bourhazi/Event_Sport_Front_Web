import { Component, OnInit } from '@angular/core';
import { Evenement, EvenementService } from '../../services/EvenementService/evenement.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeDeSportService } from '../../services/TypeSportService/type-de-sport.service';
import { LocalisationService } from '../../services/LocalisationService/localisation.service';

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

  typeDeSportNoms: Record<number, string> = {};
  localisationNoms: Record<number, string> = {};


  searchTerm = '';
  filterPrix = '';
  filterDate = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private evenementService: EvenementService,
    private typeDeSportService: TypeDeSportService,
    private localisationService: LocalisationService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.successMessage = navigation.extras.state['message'];
      this.errorMessage = navigation.extras.state['error'];
    }
  }

  ngOnInit(): void {
    this.loadEvenements();
    this.loadTypeDeSports();
    this.loadLocalisations();
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
  loadTypeDeSports(): void {
    this.typeDeSportService.getTypesDeSport().subscribe({
      next: (data) => {
        this.typeDeSportNoms = data.reduce((acc: Record<number, string>, type) => {
          acc[type.id] = type.nom;
          return acc;
        }, {} as Record<number, string>);

      },
      error: (err) => {
        console.error('Erreur lors du chargement des types de sport', err);
      }
    });
  }

  loadLocalisations(): void {
    this.localisationService.getAllLocalisations().subscribe({
      next: (data) => {
        console.log('Localisations reçues:', data);
        this.localisationNoms = data.reduce((acc: Record<number, string>, localisation) => {
          acc[localisation.id] = localisation.adresse;
          return acc;
        }, {} as Record<number, string>);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des localisations', err);
      }
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
