import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-create-edit',
  standalone: true,
  imports: [],
  templateUrl: './brand-create-edit.component.html',
  styleUrl: './brand-create-edit.component.css'
})
export class BrandCreateEditComponent implements OnInit {
  isEdit = false;
  brandId: number | null = null;

  constructor(public route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.brandId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.brandId; // Si hay un ID, estamos en modo edición
  }

  saveBrand() {
    if (this.isEdit) {
      console.log(`Editando marca con ID: ${this.brandId}`);
    } else {
      console.log('Creando nueva marca');
    }
    this.router.navigate(['/brands']);
  }

}
