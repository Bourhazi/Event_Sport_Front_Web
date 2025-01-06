import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypeDeSportService, TypeDeSport } from '../../services/TypeSportService/type-de-sport.service';
import { Regle, RegleService } from '../../services/RegleService/regle.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-type-sport',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './create-Edit-type-sport.component.html',
  styleUrls: ['./create-Edit-type-sport.component.css'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CreateTypeSportComponent implements OnInit {
  typeDeSport: TypeDeSport = {
    id: 0,
    nom: '',
    nombreEquipesMax: 0,
    nombreParticipantsParEquipe: 0,
    regles: []
  };

  regleCtrl = new FormControl();
  filteredRegles!: Observable<Regle[]>;
  reglesDisponibles: Regle[] = [];
  searchTerm: string = '';
  isEditMode = false;

  constructor(
    private typeDeSportService: TypeDeSportService,
    private regleService: RegleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadReglesDisponibles();  // Charge les règles disponibles au démarrage

    // Initialisation de l'autocomplete
    this.filteredRegles = this.regleCtrl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.description)),
      map(description => (description ? this._filter(description) : this.reglesDisponibles.slice()))
    );

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadTypeDeSport(Number(id));
    }
  }


  // Fonction pour charger les règles disponibles
  loadReglesDisponibles(): void {
    this.regleService.getAllRegles().subscribe(
      (response) => {
        this.reglesDisponibles = response;
        // Mise à jour de l'autocomplete après chargement
        this.filteredRegles = this.regleCtrl.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value?.description)),
          map(description => (description ? this._filter(description) : this.reglesDisponibles.slice()))
        );
      },
      (error) => {
        console.error('Erreur lors du chargement des règles', error);
      }
    );
  }


  // Fonction de filtrage
  private _filter(value: string): Regle[] {
    const filterValue = value.toLowerCase();
    return this.reglesDisponibles.filter((regle) =>
      regle.description.toLowerCase().includes(filterValue)
    );
  }

  // Fonction pour afficher correctement la description
  displayFn(regle: Regle): string {
    return regle && regle.description ? regle.description : '';
  }

  // Sélection de règle depuis l'autocomplete
  selectRegle(event: any): void {
    const selectedRegle = event.option.value;
    if (!this.typeDeSport.regles.some((r) => r.id === selectedRegle.id)) {
      this.typeDeSport.regles.push(selectedRegle);
    }
    this.regleCtrl.setValue('');  // Réinitialiser l'input après sélection
  }

  // Suppression d'une règle existante
  removeRegle(regle: Regle): void {
    const index = this.typeDeSport.regles.indexOf(regle);
    if (index >= 0) {
      this.typeDeSport.regles.splice(index, 1);
    }
  }

  // Ajout manuel de règle via input
  addRegle(event: any): void {
    const value = (event.value || '').trim();
    if (!value) return;

    const matchingRegle = this.reglesDisponibles.find((r) => r.description.toLowerCase() === value.toLowerCase());
    if (matchingRegle && !this.typeDeSport.regles.some((r) => r.id === matchingRegle.id)) {
      this.typeDeSport.regles.push(matchingRegle);
    }

    event.chipInput!.clear();
    this.regleCtrl.setValue('');
  }

  // Charger un type de sport spécifique pour édition
  loadTypeDeSport(id: number): void {
    this.typeDeSportService.getTypeDeSport(id).subscribe(
      (response) => {
        this.typeDeSport = response;
        this.regleCtrl.setValue('');
      },
      (error) => {
        console.error('Erreur lors du chargement du type de sport', error);
      }
    );
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.isEditMode) {
      this.updateTypeDeSport();
    } else {
      this.addTypeDeSport();
    }
  }

  // Ajouter un nouveau type de sport
  addTypeDeSport(): void {
    this.typeDeSportService.addTypeDeSport(this.typeDeSport).subscribe(
      (response) => {
        console.log('Type de sport ajouté avec succès', response);
        sessionStorage.setItem('message', 'Type de sport ajouté avec succès');
        sessionStorage.setItem('success', 'true');
        this.router.navigate(['/sports-list']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du type de sport', error);
        sessionStorage.setItem('message', 'Erreur lors de l\'ajout du type de sport');
        sessionStorage.setItem('success', 'false');
      }
    );
  }

  // Mettre à jour un type de sport existant
  updateTypeDeSport(): void {
    console.log('Envoi de la mise à jour : ', this.typeDeSport);

    this.typeDeSportService.updateTypeDeSport(this.typeDeSport.id, this.typeDeSport).subscribe(
      (response) => {
        console.log('Type de sport mis à jour avec succès', response);
        sessionStorage.setItem('message', 'Type de sport mis à jour avec succès');
        sessionStorage.setItem('success', 'true');
        this.router.navigate(['/sports-list']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du type de sport', error);
        sessionStorage.setItem('message', 'Erreur lors de la mise à jour du type de sport');
        sessionStorage.setItem('success', 'false');
      }
    );
  }
}
