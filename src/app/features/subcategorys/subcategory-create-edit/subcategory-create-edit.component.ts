import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateSubcategory, UpdateSubcategory, Subcategory, Category } from '../../../core/models/index.model';
import { SubcategoryService } from '../../../core/services/products/subcategory.service';
import { CategoryService } from '../../../core/services/products/category.service';

@Component({
  selector: 'app-subcategory-create-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './subcategory-create-edit.component.html',
  styleUrl: './subcategory-create-edit.component.css'
})

export class SubcategoryCreateEditComponent implements OnInit{
  categories: Category[] = [];

  subcategory: Subcategory | null = null;
  newSubcategory: CreateSubcategory | null = null;
  isEditMode: boolean = false;
  selectedCategoryId: number | null = null; // Categoría seleccionada

  constructor(
    private _subcategoryService: SubcategoryService,
    private _categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    const subcategoryId = this.route.snapshot.paramMap.get('id'); 
    if (subcategoryId) {
      this.isEditMode = true;
      this.loadSubcategory(Number(subcategoryId));
    } else {
      this.initializeNewSubcategory();
    }
  }

  loadCategories(): void {
    this._categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  loadSubcategory(id: number): void {
    this._subcategoryService.getSubcategoryById(id).subscribe({
      next: (subcategory) => {
        this.subcategory = Array.isArray(subcategory) ? subcategory[0] : subcategory;
        this.selectedCategoryId = Number(this.subcategory?.category_id) // Establecer la categoría seleccionada
      },
      error: (err) => {
        console.error('Error al cargar la subcategoría:', err);
      },
    });
  }

  initializeNewSubcategory(): void {
    this.subcategory = {
      id: 0,
      name: '',
      state: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      category_id: 0,
      category: '',
    };
    this.selectedCategoryId = null; // Sin categoría seleccionada
  }

  onCategoryChange(): void {
    console.log('Categoría seleccionada:', this.selectedCategoryId);
  }

  // saveSubcategory(): void {}
  saveSubcategory(): void {
    if (!this.subcategory) {
      console.error('La categoría no está inicializada.');
      return;
    }

    if (this.isEditMode) {
      
      // Lógica para actualizar una categoría existente
      const id = this.route.snapshot.paramMap.get('id');
      this.subcategory.category_id = Number(this.selectedCategoryId!);

      const updatedSubcategory: UpdateSubcategory = {
        id: Number(id), // Campo obligatorio
        ...(this.subcategory.name && { name: this.subcategory.name }), // Solo se envía si hay cambios
        ...(this.subcategory.category_id && { category_id: Number(this.selectedCategoryId!) }), // Solo
      };
      console.log('Subcategoría actualizada:', updatedSubcategory);
      this._subcategoryService.updateSubcategory(updatedSubcategory.id, updatedSubcategory).subscribe({
        next: () => {
          console.log('Subcategoría actualizada correctamente.');
          alert('Subcategoría actualizada correctamente.');
          this.router.navigate(['/subcategorys']); // Redirige después de guardar
        },
        error: (err) => {
          console.error('Error actualizando la subcategoría:', err);
          alert('Hubo un problema al actualizar la subcategoría.');
        },
      });
    } else {
      // Lógica para crear una nueva categoría
      const newSubcategory: CreateSubcategory = {
        name: this.subcategory.name,
        state: this.subcategory.state,
        category_id: Number(this.selectedCategoryId!)
      };
      
      console.log('Nueva subcategoría:', newSubcategory);
      this._subcategoryService.createSubcategory(newSubcategory).subscribe({
        next: () => {
          console.log('Subcategoría creada correctamente.');
          alert('Subcategoría creada correctamente.');
          this.router.navigate(['/subcategorys']); // Redirige después de guardar
        },
        error: (err) => {
          console.error('Error creando la subcategoría:', err);
          alert('Hubo un problema al crear la subcategoría.');
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/subcategorys']);
  }
}
