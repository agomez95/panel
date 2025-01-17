import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Brand } from '../../../core/models/index.model';
import { BrandService } from '../../../core/services/products/brand.service';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent implements OnInit {

  brands: Brand[] = [];

  constructor(private _brandService: BrandService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this._brandService.getBrands().subscribe((brands) => {
      this.brands = brands;
    });
  }

  toggleBrandState(brand: Brand): void {
    const stateBrand = {
      id: brand.id,
      state: brand.state
    };

    if (stateBrand.state) {
      this._brandService.deactivateBrand(stateBrand.id).subscribe(() => {
        this.loadBrands(); // Recargar la lista después de actualizar
      });
    }

    this._brandService.activateBrand(stateBrand.id).subscribe(() => {
      this.loadBrands(); // Recargar la lista después de actualizar
    });
  }

  deleteBrand(id: number): void {
    this._brandService.deleteBrand(id).subscribe(() => {
      this.loadBrands(); // Recargar la lista después de eliminar
    });
  }
}
