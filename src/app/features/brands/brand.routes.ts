import { Routes } from '@angular/router';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandCreateEditComponent } from './brand-create-edit/brand-create-edit.component';

export const BRAND_ROUTES: Routes = [
    { path: '', component: BrandListComponent},
    { path: 'create', component: BrandCreateEditComponent},
    { path: 'edit/:id', component: BrandCreateEditComponent},
];
