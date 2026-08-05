import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { UsersList } from './features/users/users-list/users-list';
import { UsersForm } from './features/users/users-form/users-form';
import { UsersDetails } from './features/users/users-details/users-details';
import { DoctorList } from './features/doctor-list/doctor-list';
import { DoctorForm } from './features/doctor-form/doctor-form';
import { DoctorDetails } from './features/doctor-details/doctor-details';
import { authGuard } from './guards/auth.guard';

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
        component: UsersList,
        canActivate: [authGuard]
    },

    {
        path: 'users/add',
        component: UsersForm,
        canActivate: [authGuard]
    },

    {
        path: 'users/:id',
        component: UsersDetails,
        canActivate: [authGuard]
    },

    {
        path: 'doctors',
        component: DoctorList,
        canActivate: [authGuard]
    },

    {
        path: 'doctors/add',
        component: DoctorForm,
        canActivate: [authGuard]
    },

    {
        path: 'doctors/:id',
        component: DoctorDetails,
        canActivate: [authGuard]
    },
];