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
        title:'Orders',
        path: 'orders',
        loadComponent: () => import('./pages/orders/orders.component').then((e) => e.OrdersComponent)
    },

    {
        title:'Order Details',
        path: 'orders/orders-details/:id',
        loadComponent: () => import('./pages/orders/order-details/order-details.component').then((e) => e.OrderDetailsComponent)
    },

    {
        title:'Users',
        path: 'users',
        loadComponent: () => import('./pages/users/users-list.component').then((e) => e.UsersListComponent)
    }

];
