import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypeDeSport, TypeDeSportService } from '../../services/TypeSportService/type-de-sport.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sport-details',
  standalone: true,
  templateUrl: './sport-details.component.html',
  imports: [FormsModule, CommonModule,RouterModule],
  styleUrls: ['./sport-details.component.css']
})
export class SportDetailsComponent implements OnInit {
  sport: TypeDeSport | null = null;


  constructor(
    private route: ActivatedRoute,
    private typeDeSportService: TypeDeSportService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSportDetails(Number(id));
    }
  }

  loadSportDetails(id: number): void {
    this.typeDeSportService.getTypeDeSport(id).subscribe(
      (response) => {
        this.sport = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du sport', error);
      }
    );
  }
}
