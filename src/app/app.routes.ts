import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'categorys', // Ruta base del módulo categorías
                loadChildren: () => import('./features/categorys/category.routes').then(m => m.CATEGORY_ROUTES),
            },
            {
                path: 'subcategorys', // Ruta base del módulo subcategorías
                loadChildren: () => import('./features/subcategorys/subcategory.routes').then(m => m.SUBCATEGORY_ROUTES),
            },
            {
                path: 'brands', // Ruta base del módulo marcas
                loadChildren: () => import('./features/brands/brand.routes').then(m => m.BRAND_ROUTES),
            },
            {
                path: 'products', // Ruta base del módulo productos
                loadChildren: () => import('./features/products/product.routes').then(m => m.PRODUCT_ROUTES),
            }
        ],
    },
    { path: '**', redirectTo: '' }, // Redirige a la raíz en caso de rutas inválidas
];
