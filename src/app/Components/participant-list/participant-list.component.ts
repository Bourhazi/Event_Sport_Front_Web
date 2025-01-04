import { Component, OnInit } from '@angular/core';
import { Participant, ParticipantService } from '../../services/ParticipantService/participant.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './participant-list.component.html',
  styleUrl: './participant-list.component.css'
})
export class ParticipantListComponent implements OnInit{
participants: Participant[] = [];
  filteredParticipants: Participant[] = [];
  paginatedParticipants: Participant[] = [];
  message: string | null = null;
  isSuccess: boolean | null = null;

  // Recherche et pagination
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    this.loadParticipants();
    this.displayMessage();
  }

  loadParticipants(): void {
    this.participantService.getParticipants().subscribe((data) => {
      this.participants = data;
      this.filteredParticipants = [...this.participants];
      this.totalItems = this.filteredParticipants.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updatePagination();
    });
  }

  filterParticipants(): void {
    this.filteredParticipants = this.participants.filter((participant) =>
      participant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalItems = this.filteredParticipants.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedParticipants = this.filteredParticipants.slice(startIndex, endIndex);
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

  deleteParticipant(id: number): void {
  this.participantService.deleteParticipant(id).subscribe(
    (response) => {
      console.log(response);
      this.participants = this.participants.filter((p) => p.id !== id);
      this.filterParticipants();
      this.message = response;
      this.isSuccess = true;
    },
    (error) => {
      console.error('Erreur lors de la suppression du participant', error);
      this.message = 'Erreur lors de la suppression du participant';
      this.isSuccess = false;
    }
  );
}

  displayMessage(): void {
    const storedMessage = sessionStorage.getItem('message');
    const storedSuccess = sessionStorage.getItem('success');

    if (storedMessage) {
      this.message = storedMessage;
      this.isSuccess = storedSuccess === 'true';
      // Effacer après l'affichage pour éviter une répétition
      sessionStorage.removeItem('message');
      sessionStorage.removeItem('success');
    }
  }

}
