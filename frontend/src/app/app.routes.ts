import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { UsersList } from './features/users/users-list/users-list';
import { UsersForm } from './features/users/users-form/users-form';
import { UsersDetails } from './features/users/users-details/users-details';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: Login
    },

    {
        path: 'users',
        component: UsersList
    },

    {
        path: 'users/add',
        component: UsersForm
    },

    {
        path: 'users/:id',
        component: UsersDetails
    }
];