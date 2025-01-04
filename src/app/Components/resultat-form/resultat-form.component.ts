import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvenementService } from '../../services/EvenementService/evenement.service';
import { ResultatServiceService } from '../../services/ResultatService/resultat-service.service';
import { EquipeService } from '../../services/EquipeService/equipe-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-resultat-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,ReactiveFormsModule],
  templateUrl: './resultat-form.component.html',
  styleUrl: './resultat-form.component.css'
})
export class ResultatFormComponent implements OnInit {
  resultatForm!: FormGroup;
  evenements: any[] = [];
  equipes: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private evenementService: EvenementService,
    private equipeService: EquipeService,
    private resultatService: ResultatServiceService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEvenements();
  }

  initForm() {
    this.resultatForm = this.fb.group({
      evenementId: ['', Validators.required],
      equipeId: ['', Validators.required],
      nombreButs: [0, [Validators.required, Validators.min(0)]],
      temps: [0]
    });
  }

  loadEvenements() {
    this.evenementService.getEvenements().subscribe({
      next: (data) => {
        this.evenements = data;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des événements';
      }
    });
  }

  loadEquipes(event: any) {
    const evenementId = event.target.value;
    this.equipeService.getEquipesByEvenement(evenementId).subscribe({
      next: (data) => {
        this.equipes = data;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des équipes';
      }
    });
  }

  ajouterResultat() {
    if (this.resultatForm.valid) {
      const formData = this.resultatForm.value;

      // Conversion explicite en nombre
      formData.evenementId = Number(formData.evenementId);
      formData.equipeId = Number(formData.equipeId);
      formData.nombreButs = Number(formData.nombreButs);
      formData.temps = Number(formData.temps);
      console.log(formData);

      this.resultatService.ajouterResultatEquipe(formData).subscribe({
        next: () => {
          this.successMessage = 'Résultat ajouté avec succès';
          this.resultatForm.reset();
        },
        error: () => {
          this.errorMessage = 'Erreur lors de l\'ajout du résultat';
        }
      });
    }
  }

}
