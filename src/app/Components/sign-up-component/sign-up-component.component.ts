import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { Participant, ParticipantService } from '../../services/ParticipantService/participant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-component',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up-component.component.html',
  styleUrl: './sign-up-component.component.css'
})
export class SignUpComponentComponent {
  signUpForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const newParticipant: Participant = this.signUpForm.value;

      this.participantService.addParticipant(newParticipant).subscribe({
        next: (response) => {
          console.log('Inscription réussie :', response);
          this.successMessage = 'Inscription réussie. Redirection vers la page de connexion...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de l\'inscription', err);
          this.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        },
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }
}
