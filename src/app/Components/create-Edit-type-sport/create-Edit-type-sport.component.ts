import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypeDeSportService, TypeDeSport } from '../../services/TypeSportService/type-de-sport.service';
import { Regle, RegleService } from '../../services/RegleService/regle.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipGrid, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-type-sport',
  standalone: true,
  imports: [FormsModule, CommonModule ,  ReactiveFormsModule, MatAutocompleteModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  ReactiveFormsModule,
  CommonModule,],
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
  ) {}

  ngOnInit(): void {
     this.loadReglesDisponibles();

  this.filteredRegles = this.regleCtrl.valueChanges.pipe(
    startWith(''),
    map((value) => (typeof value === 'string' ? value : value?.description)),
    map((description) => (description ? this._filter(description) : this.reglesDisponibles.slice()))
  );

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.isEditMode = true;
    this.loadTypeDeSport(Number(id));
  }
  }

  loadReglesDisponibles(): void {
    this.regleService.getAllRegles().subscribe(
      (response) => {
        this.reglesDisponibles = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des règles', error);
      }
    );
  }

   private _filter(value: string): Regle[] {
    const filterValue = value.toLowerCase();
    return this.reglesDisponibles.filter((regle) =>
      regle.description.toLowerCase().includes(filterValue)
    );
  }

  toggleRegleSelection(regle: Regle): void {
    const index = this.typeDeSport.regles.findIndex((r) => r.id === regle.id);
    if (index === -1) {
      this.typeDeSport.regles.push(regle); // Ajouter si non sélectionné
    } else {
      this.typeDeSport.regles.splice(index, 1); // Supprimer si déjà sélectionné
    }
  }


  selectRegle(event: any): void {
    const selectedRegle = event.option.value;
    if (!this.typeDeSport.regles.some((r) => r.id === selectedRegle.id)) {
      this.typeDeSport.regles.push(selectedRegle);
    }
    this.regleCtrl.setValue('');
  }

  removeRegle(regle: Regle): void {
    const index = this.typeDeSport.regles.indexOf(regle);
    if (index >= 0) {
      this.typeDeSport.regles.splice(index, 1);
    }
  }

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


  loadTypeDeSport(id: number): void {
  this.typeDeSportService.getTypeDeSport(id).subscribe(
    (response) => {
      this.typeDeSport = response; // Charge le type existant
      this.regleCtrl.setValue(''); // Reset the form control for rules
    },
    (error) => {
      console.error('Erreur lors du chargement du type de sport', error);
    }
  );
}




  onSubmit(): void {
    if (this.isEditMode) {
      this.updateTypeDeSport();
    } else {
      this.addTypeDeSport();
    }
  }

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
        this.router.navigate(['/sports-list']);
      }
    );
  }

  updateTypeDeSport(): void {
  // Vérifiez l'objet avant envoi
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
        this.router.navigate(['/sports-list']);
      }
    );
  }

}
