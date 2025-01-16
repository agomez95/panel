import { Routes } from '@angular/router';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';
import { SubcategoryCreateEditComponent } from './subcategory-create-edit/subcategory-create-edit.component';

export const SUBCATEGORY_ROUTES: Routes = [
    { path: '', component: SubcategoryListComponent },
    { path: 'create', component: SubcategoryCreateEditComponent },
    { path: 'edit/:id', component: SubcategoryCreateEditComponent },
];
