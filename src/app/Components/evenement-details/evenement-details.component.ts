import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EvenementService } from '../../services/EvenementService/evenement.service';

@Component({
  selector: 'app-evenement-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evenement-details.component.html',
  styleUrl: './evenement-details.component.css'
})
export class EvenementDetailsComponent implements OnInit {
  evenement: any = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const evenementId = Number(this.route.snapshot.paramMap.get('id'));
    this.chargerDetailsEvenement(evenementId);
  }

  chargerDetailsEvenement(evenementId: number): void {
    this.evenementService.getEvenementDetails(evenementId).subscribe({
      next: (data) => {
        this.evenement = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails', err);
        this.errorMessage = 'Impossible de charger les détails de cet événement.';
      }
    });
  }

  retourListe(): void {
    this.router.navigate(['/evenements']);
  }
}
