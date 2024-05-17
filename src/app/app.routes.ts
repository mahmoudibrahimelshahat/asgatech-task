import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'products',
        pathMatch: 'full'
    },

    {
        title:'Products',
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then((e) => e.ProductsComponent)
    },

    {
        title:'Users',
        path: 'users',
        loadComponent: () => import('./pages/users/users-list.component').then((e) => e.UsersListComponent)
    }

];
