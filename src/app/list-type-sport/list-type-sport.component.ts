import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Add this import
import { TypeDeSportService, TypeDeSport } from '../services/type-de-sport.service';

@Component({
  selector: 'app-list-type-sport',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './list-type-sport.component.html',
  styleUrls: ['./list-type-sport.component.css']
})
export class ListTypeSportComponent implements OnInit {
  sports: TypeDeSport[] = [];
  filteredSports: TypeDeSport[] = [];
  paginatedSports: TypeDeSport[] = [];

  message: string | null = null;
  isSuccess: boolean | null = null;

  searchTerm = '';
  filterCriteria = '';
  filterParticipants = '';

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;
  totalPages = 0;

  constructor(private typeDeSportService: TypeDeSportService , private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.message = navigation.extras.state['message'];
      this.isSuccess = navigation.extras.state['success'];
    }
  }

  ngOnInit(): void {
    this.loadTypesDeSport(); // Load sports from backend when component initializes
    this.checkStoredMessage();
  }

  loadTypesDeSport(): void {
    this.typeDeSportService.getTypesDeSport().subscribe(
      (data) => {
        this.sports = data;
        this.filteredSports = [...this.sports];
        this.totalItems = this.filteredSports.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagination();
      },
      (error) => {
        console.error('Erreur lors de la récupération des types de sport', error);
      }
    );
  }

  checkStoredMessage(): void {
    this.message = sessionStorage.getItem('message');
    const success = sessionStorage.getItem('success');
    if (this.message) {
      this.isSuccess = success === 'true';
      // Clear the message after displaying it once
      sessionStorage.removeItem('message');
      sessionStorage.removeItem('success');
    }
  }
  // Filter sports based on search term, number of teams, and participants
  filterSports() {
    const filtered = this.sports.filter((sport) => {
      const matchesName = sport.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesTeams = this.filterCriteria === '' || parseInt(this.filterCriteria) >= sport.nombreEquipesMax;
      const matchesParticipants = this.filterParticipants === '' || parseInt(this.filterParticipants) >= sport.nombreParticipantsParEquipe;
      return matchesName && matchesTeams && matchesParticipants;
    });

    this.filteredSports = filtered;
    this.totalItems = filtered.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePagination();
  }

  // Update the paginatedSports array based on the current page and items per page
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedSports = this.filteredSports.slice(startIndex, endIndex);
  }

  // Move to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Move to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
