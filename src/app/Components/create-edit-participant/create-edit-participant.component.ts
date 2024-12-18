import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Participant, ParticipantService } from '../../services/ParticipantService/participant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-edit-participant',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './create-edit-participant.component.html',
  styleUrl: './create-edit-participant.component.css'
})
export class CreateEditParticipantComponent implements OnInit {
  participant: Participant = { id: 0, name: '', email: '', telephone: 0, password: '' };
  isEditMode = false;

  constructor(
    private participantService: ParticipantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadParticipant(Number(id));
    }
  }

  loadParticipant(id: number): void {
    this.participantService.getParticipantById(id).subscribe(
      (response) => {
        this.participant = response;
      },
      (error) => {
        console.error('Erreur lors du chargement du participant', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateParticipant();
    } else {
      this.addParticipant();
    }
  }

  addParticipant(): void {
    this.participantService.addParticipant(this.participant).subscribe(
      () => {
        sessionStorage.setItem('message', 'Participant ajouté avec succès');
        sessionStorage.setItem('success', 'true');
        this.router.navigate(['/participants-list']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du participant', error);
        sessionStorage.setItem('message', 'Erreur lors de l\'ajout du participant');
        sessionStorage.setItem('success', 'false');
        this.router.navigate(['/participants-list']);
      }
    );
  }

  updateParticipant(): void {
    this.participantService.updateParticipant(this.participant.id, this.participant).subscribe(
      () => {
        sessionStorage.setItem('message', 'Participant modifié avec succès');
        sessionStorage.setItem('success', 'true');
        this.router.navigate(['/participants-list']);
      },
      (error) => {
        console.error('Erreur lors de la modification du participant', error);
        sessionStorage.setItem('message', 'Erreur lors de la modification du participant');
        sessionStorage.setItem('success', 'false');
        this.router.navigate(['/participants-list']);
      }
    );
  }

}
