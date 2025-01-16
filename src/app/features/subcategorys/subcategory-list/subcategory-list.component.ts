import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Subcategory } from '../../../core/models/index.model';
import { SubcategoryService } from '../../../core/services/products/subcategory.service';

@Component({
  selector: 'app-subcategory-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.css'
})
export class SubcategoryListComponent implements OnInit {

  subcategories: Subcategory[] = [];

  constructor(private _subcategoryService: SubcategoryService) {}

  ngOnInit(): void {
    this.loadSubcategories();
  }

  loadSubcategories(): void {
    this._subcategoryService.getSubcategories().subscribe((subcategories) => {
      this.subcategories = subcategories;
    });
  }

  toggleSubcategoryState(subcategory: Subcategory): void {
    const stateSubcategory = {
      id: subcategory.id,
      state: subcategory.state
    };

    if (stateSubcategory.state) {
      this._subcategoryService.deactivateSubcategory(stateSubcategory.id).subscribe(() => {
        this.loadSubcategories();
      });
    }

    this._subcategoryService.activateSubcategory(stateSubcategory.id).subscribe(() => {
      this.loadSubcategories();
    });
  }

  deleteSubcategory(id: number): void {
    this._subcategoryService.deleteSubcategory(id).subscribe(() => {
      this.loadSubcategories();
    });
  }
}
