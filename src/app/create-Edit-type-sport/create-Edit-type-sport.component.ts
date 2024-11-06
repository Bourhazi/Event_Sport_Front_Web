import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TypeDeSportService, TypeDeSport } from '../services/type-de-sport.service';

@Component({
  selector: 'app-create-type-sport',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-Edit-type-sport.component.html',
  styleUrls: ['./create-Edit-type-sport.component.css']
})
export class CreateTypeSportComponent implements OnInit {
  typeDeSport: TypeDeSport = {
    id: 0,
    nom: '',
    nombreEquipesMax: 0,
    nombreParticipantsParEquipe: 0
  };
  isEditMode = false;
  constructor(
    private typeDeSportService: TypeDeSportService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadTypeDeSport(Number(id));
    }
  }

  loadTypeDeSport(id: number): void {
    this.typeDeSportService.getTypeDeSport(id).subscribe(
      (response) => {
        this.typeDeSport = response;
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
