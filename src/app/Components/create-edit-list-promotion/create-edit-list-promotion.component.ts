import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PromotionService, Promotion } from '../../services/PromotionService/promotion.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-edit-list-promotion',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-edit-list-promotion.component.html',
  styleUrl: './create-edit-list-promotion.component.css'
})
export class CreateEditListPromotionComponent implements OnInit {
promotionForm!: FormGroup;
  promotions: Promotion[] = [];
  filteredPromotions: Promotion[] = [];
  paginatedPromotions: Promotion[] = [];
  isEditMode = false;
  selectedPromotionId!: number | null;

  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  totalPages = 0;

  searchTerm = '';

  constructor(private fb: FormBuilder, private promotionService: PromotionService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadPromotions();
  }

  initForm(): void {
    this.promotionForm = this.fb.group({
      code: ['', Validators.required],
      discountPercentage: ['', [Validators.required, Validators.min(1)]],
      validUntil: ['', Validators.required]
    });
  }

  loadPromotions(): void {
    this.promotionService.getAllPromotions().subscribe((data) => {
      this.promotions = data;
      this.filteredPromotions = [...this.promotions];
      this.totalItems = this.filteredPromotions.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updatePagination();
    });
  }

  filterPromotions(): void {
    this.filteredPromotions = this.promotions.filter((promotion) =>
      promotion.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalItems = this.filteredPromotions.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPromotions = this.filteredPromotions.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.selectedPromotionId !== null) {
      this.promotionService.updatePromotion(this.selectedPromotionId, this.promotionForm.value).subscribe(
        (response) => {
          this.loadPromotions();
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour :', error.error); // Affiche l'erreur
        }
      );
    } else {
      this.promotionService.createPromotion(this.promotionForm.value).subscribe(
        (response) => {
          this.loadPromotions();
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de la création :', error.error); // Affiche l'erreur
        }
      );
    }
  }


  editPromotion(promotion: Promotion): void {
    this.isEditMode = true;
    this.selectedPromotionId = promotion.id;
    this.promotionForm.patchValue(promotion);
  }

  deletePromotion(id: number): void {
    this.promotionService.deletePromotion(id).subscribe(() => {
      this.loadPromotions();
    });
  }

  resetForm(): void {
    this.promotionForm.reset();
    this.isEditMode = false;
    this.selectedPromotionId = null;
  }
}
