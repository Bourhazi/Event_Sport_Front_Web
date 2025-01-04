import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Participant, ParticipantService } from '../../../services/ParticipantService/participant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-profile',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './participant-profile.component.html',
  styleUrl: './participant-profile.component.css'
})
export class ParticipantProfileComponent implements OnInit {
  participantForm: FormGroup;
  participant: Participant | null = null;
  participantId: number = 3;  // ID fixe pour test
  isEditing: boolean = false;

  constructor(
    private participantService: ParticipantService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.participantForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadParticipant();
  }

  loadParticipant(): void {
    this.participantService.getParticipantById(this.participantId).subscribe({
      next: (data) => {
        this.participant = data;
        this.participantForm.patchValue(data);  // Remplir le formulaire
      },
      error: (err) => console.error('Erreur de chargement du participant', err)
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveParticipant(): void {
    if (this.participantForm.valid && this.participant) {
      this.participantService.updateParticipant(this.participantId, this.participantForm.value).subscribe({
        next: () => {
          alert('Profil mis à jour avec succès');
          this.isEditing = false;
          this.router.navigate(['/participants-list']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du participant', err);
        }
      });
    }
  }
}
