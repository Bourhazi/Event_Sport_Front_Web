import { Component, OnInit } from '@angular/core';
import { Regle, RegleService } from '../../services/RegleService/regle.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-edit-type',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-edit-type.component.html',
  styleUrl: './create-edit-type.component.css'
})
export class CreateEditTypeComponent implements OnInit{

  regleForm!: FormGroup;
  regles: Regle[] = [];
  filteredRegles: Regle[] = [];
  paginatedRegles: Regle[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  totalPages = 0;

  searchTerm = '';
  isEditMode = false;
  regleToEdit!: Regle;

  constructor(private fb: FormBuilder, private regleService: RegleService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRegles();
  }

  initForm(): void {
    this.regleForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  loadRegles(): void {
    this.regleService.getAllRegles().subscribe((data) => {
      this.regles = data;
      this.filteredRegles = [...this.regles];
      this.totalItems = this.filteredRegles.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updatePagination();
    });
  }

  filterRegles(): void {
    this.filteredRegles = this.regles.filter((regle) =>
      regle.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalItems = this.filteredRegles.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePagination();
  }


  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRegles = this.filteredRegles.slice(startIndex, endIndex);
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
    if (this.isEditMode) {
      this.regleService.updateRegle(this.regleToEdit.id, this.regleForm.value).subscribe(() => {
        this.resetForm();
        this.loadRegles();
      });
    } else {
      this.regleService.createRegle(this.regleForm.value).subscribe(() => {
        this.resetForm();
        this.loadRegles();
      });
    }
  }

  resetForm(): void {
    this.regleForm.reset();
    this.isEditMode = false;
  }

  editRegle(regle: Regle): void {
    this.isEditMode = true;
    this.regleToEdit = regle;
    this.regleForm.patchValue(regle);
  }

  deleteRegle(id: number): void {
    this.regleService.deleteRegle(id).subscribe(() => {
      this.loadRegles();
    });
  }
}
