import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar FormsModule

import { CreateCategory, UpdateCategory, Category } from '../../../core/models/index.model';
import { CategoryService } from '../../../core/services/products/category.service';

@Component({
  selector: 'app-category-create-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './category-create-edit.component.html',
  styleUrl: './category-create-edit.component.css'
})

export class CategoryCreateEditComponent implements OnInit {
  category: Category | null = null;
  isEditMode: boolean = false;

  constructor(
    private _categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router // Inyecta el Router para la navegación
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id'); // Obtén el parámetro `id`
    if (categoryId) {
      this.isEditMode = true;
      this.loadCategory(Number(categoryId));
    } else {
      this.initializeNewCategory();
    }
  }

  loadCategory(id: number): void {
    this._categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.category = Array.isArray(category) ? category[0] : category;
      },
      error: (err) => {
        console.error('Error loading category:', err);
      },
    });
  }

  initializeNewCategory(): void {
    this.category = {
      id: 0,
      name: '',
      state: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  saveCategory(): void {
    if (!this.category) {
      console.error('La categoría no está inicializada.');
      return;
    }
  
    if (this.isEditMode) {
      
      // Lógica para actualizar una categoría existente
      const id = this.route.snapshot.paramMap.get('id');
      const updatedCategory: UpdateCategory = {
        id: Number(id), // Campo obligatorio
        ...(this.category.name && { name: this.category.name }), // Solo se envía si hay cambios
      };
      
      this._categoryService.updateCategory(updatedCategory.id, updatedCategory).subscribe({
        next: () => {
          console.log('Categoría actualizada correctamente.');
          alert('Categoría actualizada correctamente.');
          this.router.navigate(['/categorys']); // Redirige después de guardar
        },
        error: (err) => {
          console.error('Error actualizando la categoría:', err);
          alert('Hubo un problema al actualizar la categoría.');
        },
      });
    } else {
      // Lógica para crear una nueva categoría
      const newCategory: CreateCategory = {
        name: this.category.name,
        state: this.category.state,
      };
  
      this._categoryService.createCategory(newCategory).subscribe({
        next: () => {
          console.log('Categoría creada correctamente.');
          alert('Categoría creada correctamente.');
          this.router.navigate(['/categorys']); // Redirige después de guardar
        },
        error: (err) => {
          console.error('Error creando la categoría:', err);
          alert('Hubo un problema al crear la categoría.');
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/categorys']); // Redirige al listado de categorías
  }
  
}