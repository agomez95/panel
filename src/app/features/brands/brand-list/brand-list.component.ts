import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent {
  brands = [
    { id: 1, name: 'Adidas' },
    { id: 2, name: 'Nike' },
    { id: 3, name: 'Puma' }
  ];

  constructor(private router: Router) {}

  createBrand() {
    this.router.navigate(['/brands/create']);
  }

  editBrand(id: number) {
    this.router.navigate([`/brands/edit/${id}`]);
  }
}
