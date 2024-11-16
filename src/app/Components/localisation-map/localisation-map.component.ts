import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { LocalisationService } from '../../services/LocalisationService/localisation.service';

interface Marker {
  id: number;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-localisation-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, FormsModule],
  templateUrl: './localisation-map.component.html',
  styleUrls: ['./localisation-map.component.css']
})
export class LocalisationMapComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 31.6295, lng: -7.9811 }; // Marrakech par défaut
  zoom = 10;
  markers: Marker[] = [];
  errorMessage: string | null = null;
  isEditMode: boolean = false;
  editIndex: number | null = null;

  newLocalisation: any = { id: null, adresse: '', ville: '', pays: '', latitude: 0, longitude: 0 };
  showForm: boolean = false;

  showConfirmationModal: boolean = false;
  selectedLocalisationId: number | null = null;


  constructor(private localisationService: LocalisationService) {}

  ngOnInit(): void {
    this.fetchLocalisations();
  }

  fetchLocalisations(): void {
    this.localisationService.getAllLocalisations().subscribe(
      (data) => {
        if (data.length > 0) {
          this.markers = data.map(loc => ({
            id: loc.id,
            lat: loc.latitude,
            lng: loc.longitude
          }));
          this.center = { lat: this.markers[0].lat, lng: this.markers[0].lng };
        } else {
          this.markers = [];
          this.center = { lat: 31.6295, lng: -7.9811 }; // Marrakech par défaut
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des localisations', error);
        this.errorMessage = "Erreur lors du chargement des localisations.";
      }
    );
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.newLocalisation = {
        id: null,
        adresse: '',
        ville: '',
        pays: '',
        latitude: event.latLng.lat(),
        longitude: event.latLng.lng()
      };
      this.showForm = true;
      this.isEditMode = false;
    }
  }

  addLocalisation(): void {
    if (this.isEditMode && this.newLocalisation.id) {
      this.localisationService.updateLocalisation(this.newLocalisation.id, this.newLocalisation).subscribe(
        () => {
          console.log('Localisation modifiée avec succès');
          this.showForm = false;
          this.fetchLocalisations();
        },
        (error) => {
          console.error('Erreur lors de la modification de la localisation:', error);
        }
      );
    } else {
      this.localisationService.createLocalisation(this.newLocalisation).subscribe(
        () => {
          console.log('Localisation ajoutée avec succès');
          this.showForm = false;
          this.fetchLocalisations();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la localisation:', error);
        }
      );
    }
  }

  editLocalisation(index: number): void {
    const marker = this.markers[index];
    this.localisationService.getLocalisationById(marker.id).subscribe(
      (localisation) => {
        this.newLocalisation = localisation;
        this.showForm = true;
        this.isEditMode = true;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la localisation:', error);
      }
    );
  }


  cancel(): void {
    this.showForm = false;
    this.isEditMode = false;
  }

  openConfirmationModal(localisationId: number): void {
  this.selectedLocalisationId = localisationId;
  this.showConfirmationModal = true;
}

closeConfirmationModal(): void {
  this.showConfirmationModal = false;
  this.selectedLocalisationId = null;
}

confirmDelete(): void {
  if (this.selectedLocalisationId !== null) {
    this.localisationService.deleteLocalisation(this.selectedLocalisationId).subscribe(
      () => {
        console.log('Localisation supprimée avec succès');
        this.showForm = false;
        this.fetchLocalisations();
        this.closeConfirmationModal();
      },
      (error) => {
        console.error('Erreur lors de la suppression de la localisation:', error);
      }
    );
  }
}

}
