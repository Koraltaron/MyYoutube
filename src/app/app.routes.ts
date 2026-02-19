import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Search } from './pages/search/search';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: "", component: Home
    },
    {
        path: "register", component: Register
    },
    {
        path: "login", component: Login
    },
    {
        path: "search", component: Search, canActivate: [authGuard]
    },
    {
        path: "**", redirectTo: "", pathMatch: "full"
    },
    
];
