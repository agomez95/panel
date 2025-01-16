import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateEditComponent } from './category-create-edit/category-create-edit.component';

export const CATEGORY_ROUTES: Routes = [
    { path: '', component: CategoryListComponent },
    { path: 'create', component: CategoryCreateEditComponent },
    { path: 'edit/:id', component: CategoryCreateEditComponent },
];
