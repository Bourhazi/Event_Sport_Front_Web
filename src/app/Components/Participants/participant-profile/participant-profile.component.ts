import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Participant, ParticipantService } from '../../../services/ParticipantService/participant.service';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from '../../../services/Authentification/authentification.service';

@Component({
  selector: 'app-participant-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './participant-profile.component.html',
  styleUrl: './participant-profile.component.css'
})
export class ParticipantProfileComponent implements OnInit {
  participantForm: FormGroup;
  participant: Participant | null = null;
  participantId: number | null = null;
  isEditing: boolean = false;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private participantService: ParticipantService,
    private authService: AuthentificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.participantForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.retrieveParticipantId();
    if (this.participantId) {
      this.loadParticipant();
    }
  }

  retrieveParticipantId(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.participantId = parsedUser.id;
    }
  }

  loadParticipant(): void {
    if (this.participantId) {
      this.participantService.getParticipantById(this.participantId).subscribe({
        next: (data) => {
          this.participant = data;
          this.participantForm.patchValue(data);
        },
        error: (err) => console.error('Erreur de chargement du participant', err)
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveParticipant(): void {
    if (this.participantForm.valid && this.participant && this.participantId) {
      this.isLoading = true;
      const updatedParticipant = {
        ...this.participant,
        ...this.participantForm.value
      };

      this.participantService.updateParticipant(this.participantId, updatedParticipant).subscribe({
        next: () => {
          this.isEditing = false;
          this.isLoading = false;

          // Mise à jour du localStorage
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          user.name = updatedParticipant.name;
          localStorage.setItem('user', JSON.stringify(user));

          // Mise à jour du BehaviorSubject pour rafraîchir le Navbar
          this.authService.updateUserInSubject(user);
          this.successMessage = "Profil mis à jour avec succès.";
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du participant', err);
          this.errorMessage = "Échec de la mise à jour du profil. Veuillez réessayer.";
          this.isLoading = false;
        }
      });
    }
  }
}
