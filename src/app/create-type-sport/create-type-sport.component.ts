import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-type-sport',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-type-sport.component.html',
  styleUrl: './create-type-sport.component.css'
})
export class CreateTypeSportComponent {
  typeDeSport = {
    nom: '',
    nombreEquipesMax: 0,
    nombreParticipantsParEquipe: 0
  };

  constructor(private router: Router) {}

  onSubmit() {

    console.log(this.typeDeSport);
    this.router.navigate(['/']);
  }
}
