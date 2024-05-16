import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'users',
        pathMatch: 'full'
    },

    {
        title:'Users',
        path: 'users',
        loadComponent: () => import('./pages/users/users-list.component').then((e) => e.UsersListComponent)
    }

];
