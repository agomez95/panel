import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Category } from '../../../core/models/index.model';
import { CategoryService } from '../../../core/services/products/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private _categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this._categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  toggleCategoryState(category: Category): void {
    const stateCategory = {
      id: category.id,
      state: category.state
    };

    if (stateCategory.state) {
      this._categoryService.deactivateCategory(stateCategory.id).subscribe(() => {
        this.loadCategories(); // Recargar la lista después de actualizar
      });
    }

    this._categoryService.activateCategory(stateCategory.id).subscribe(() => {
      this.loadCategories(); // Recargar la lista después de actualizar
    });
  }

  deleteCategory(id: number): void {
    this._categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories(); // Recargar la lista después de eliminar
    });
  }
}
