import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar FormsModule

import { CreateBrand, UpdateBrand, Brand } from '../../../core/models/index.model';
import { BrandService } from '../../../core/services/products/brand.service';

@Component({
  selector: 'app-brand-create-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './brand-create-edit.component.html',
  styleUrl: './brand-create-edit.component.css'
})
export class BrandCreateEditComponent implements OnInit {
  brand: Brand | null = null;
  isEditMode: boolean = false;

  constructor(
    private _brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router // Inyecta el Router para la navegación
  ) {}

  ngOnInit() {
    const brandId = this.route.snapshot.paramMap.get('id'); // Obtén el parámetro `id`
    if (brandId) {
      this.isEditMode = true;
      this.loadBrand(Number(brandId));
    } else {
      this.initializeNewBrand();
    }
  }
  
  loadBrand(id: number): void {
    this._brandService.getBrandById(id).subscribe({
      next: (brand) => {
        this.brand = Array.isArray(brand) ? brand[0] : brand;
      },
      error: (err) => {
        console.error('Error loading brand:', err);
      },
    });
  }

  initializeNewBrand(): void {
    this.brand = {
      id: 0,
      name: '',
      state: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  saveBrand(): void {
    if (!this.brand) {
      console.error('La marca no está inicializada.');
      return;
    }

    if (this.isEditMode) {
      
      // Lógica para actualizar una marca existente
      const id = this.route.snapshot.paramMap.get('id');
      const updateBrand: UpdateBrand = {
        id: Number(id), // Campo obligatorio
        ...(this.brand.name && { name: this.brand.name }), // Solo se envía si hay cambios
      };
      
      this._brandService.updateBrand(updateBrand.id, updateBrand).subscribe({
        next: () => {
          console.log('Marca actualizada correctamente.');
          alert('Marca actualizada correctamente.');
          this.router.navigate(['/brands']); // Redirige después de guardar
        },
        error: (err) => {
          console.error('Error actualizando la marca:', err);
          alert('Hubo un problema al actualizar la marca.');
        },
      });
    } else {
      // Lógica para crear una nueva categoría
      const newBrand: CreateBrand = {
        name: this.brand.name,
        state: this.brand.state,
      };
  
      this._brandService.createBrand(newBrand).subscribe({
        next: () => {
          console.log('Marca creada correctamente.');
          alert('Marca creada correctamente.');
          this.router.navigate(['/brands']); // Redirige después de guardar
        },
        error: (err) => {
          console.error('Error creando la marca:', err);
          alert('Hubo un problema al crear la marca.');
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/brands']);
  }

}
